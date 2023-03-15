import { FormDataProps } from '../components/pages/career-details/new-career-form/career-form';
import { GatsbyFunctionRequest, GatsbyFunctionResponse } from 'gatsby';
import { LogLevel, WebClient } from '@slack/web-api';
import { FileDropperType } from '../components/forms/file-dropper/file-dropper';

const TOKEN = process.env.SLACK_BOT_SY_TOKEN;

interface CareerFormData extends FormDataProps {
  jobName: string;
}

const getFileNameList = (files: FileDropperType[]) =>
  files.reduce((acc, current) => acc + ` - ${current.file.name} \n`, '');

/**
 * Easily build this block structure via https://app.slack.com/block-kit-builder
 */
const createSlackMessage = ({
  first_name,
  last_name,
  email,
  documents,
  message,
  location,
  available_from,
  salary_expectations,
  jobName,
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
        text: `*Files*:\n ${getFileNameList(documents)}`,
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
    documents,
    message,
    location,
    available_from,
    salary_expectations,
    jobName,
  } = req.body;

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
    const result = client.chat.postMessage({
      channel: channelId,
      // raw text as the fallback content for notifications.
      text: `${first_name} (${email}) sent the following message:\n ${message}`,
      blocks: createSlackMessage({
        first_name,
        last_name,
        email,
        documents,
        message,
        location,
        available_from,
        salary_expectations,
        jobName,
      }),
      icon_emoji: ':inbox_tray:',
    });

    // await client.files.upload({
    //   // channels can be a list of one to many strings
    //   channels: channelId,
    //   initial_comment: "Here's my file :smile:",
    //   // Include your filename in a ReadStream here
    //   file: createReadStream(path.join(__dirname, 'cool.png')),
    // });

    console.log(result);
  } catch (error) {
    console.error(error);
  }

  return res.status(200).json({ ok: true });
}
