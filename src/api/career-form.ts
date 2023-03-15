import { GatsbyFunctionRequest, GatsbyFunctionResponse } from 'gatsby';
import { LogLevel, WebClient } from '@slack/web-api';

const TOKEN = process.env.SLACK_BOT_SY_TOKEN;

const getFileNameList = (files) =>
  files.reduce((acc, current) => acc + ` - ${current.originalname} \n`, '');

/**
 * Easily build this block structure via https://app.slack.com/block-kit-builder
 */
const createSlackMessage = ({
  first_name,
  last_name,
  email,
  message,
  location,
  available_from,
  salary_expectations,
  jobName,
  files,
}) => {
  return [
    {
      type: 'header',
      text: {
        type: 'plain_text',
        text: `New Application: ${jobName}`,
        emoji: true,
      },
    },
    {
      type: 'section',
      fields: [
        {
          type: 'mrkdwn',
          text: `*First Name*:\n ${first_name}\n`,
        },
        {
          type: 'mrkdwn',
          text: `*Last Name*:\n ${last_name}`,
        },
        {
          type: 'mrkdwn',
          text: `*E-Mail*:\n ${email}`,
        },
        {
          type: 'mrkdwn',
          text: `*Location*:\n ${location}`,
        },
        {
          type: 'mrkdwn',
          text: `*Avaible from*:\n ${available_from}`,
        },
        {
          type: 'mrkdwn',
          text: `*Salary Expectation*:\n ${salary_expectations}`,
        },
      ],
    },
    {
      type: 'divider',
    },
    {
      type: 'section',
      text: {
        type: 'mrkdwn',
        text: `*Cover Letter*:\n ${message}`,
      },
    },
    {
      type: 'divider',
    },
    {
      type: 'section',
      text: {
        type: 'mrkdwn',
        text: `*Files*:\n${getFileNameList(files)}`,
      },
    },
    {
      type: 'context',
      elements: [
        {
          type: 'mrkdwn',
          text: 'Sent via _Satellytes Career Form_',
        },
      ],
    },
  ];
};

export default async function handler(
  req: GatsbyFunctionRequest,
  res: GatsbyFunctionResponse,
) {
  const {
    first_name,
    last_name,
    email,
    message,
    location,
    available_from,
    salary_expectations,
    jobName,
  } = req.body;

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const files = req?.files;

  if (req.method !== `POST`) {
    return res.status(500).json({ error: `not allowed` });
  }

  if (!TOKEN) {
    return res.status(500).json({ error: `no slack token given` });
  }

  const channelId = 'raketenhafte-rekrutierung';

  const client = new WebClient(TOKEN, {
    logLevel: LogLevel.DEBUG,
  });

  try {
    const postMessageResult = await client.chat.postMessage({
      channel: channelId,
      // raw text as the fallback content for notifications.
      text: `${first_name} ${last_name} (${email}) sent the following application for ${jobName}:\n ${message}`,
      blocks: createSlackMessage({
        first_name,
        last_name,
        email,
        message,
        location,
        available_from,
        salary_expectations,
        jobName,
        files,
      }),
      icon_emoji: ':rocket:',
    });
    console.log(postMessageResult);

    for (const file of files) {
      const fileUploadResult = await client.files.upload({
        channels: channelId,
        file: file.buffer,
        filename: file.originalname,
      });
      console.log(fileUploadResult);
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Slack API error' });
  }

  return res.status(200).json({ ok: true });
}
