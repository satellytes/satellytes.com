import { WebClient, LogLevel } from '@slack/web-api';

const TOKEN = process.env.SLACK_BOT_SY_TOKEN;

/**
 * Easily build this block structure via https://app.slack.com/block-kit-builder
 */
const createSlackMessage = ({ name, email, message }) => {
  return [
    {
      type: 'header',
      text: {
        type: 'plain_text',
        text: 'New form submission',
      },
    },
    {
      type: 'section',
      text: {
        type: 'mrkdwn',
        text: 'We have received a new message.',
      },
    },
    {
      type: 'section',
      fields: [
        {
          type: 'mrkdwn',
          text: `*Name*:\n ${name}`,
        },
        {
          type: 'mrkdwn',
          text: `*E-mail*:\n ${email}`,
        },
      ],
    },
    {
      type: 'divider',
    },
    {
      type: 'section',
      fields: [
        {
          type: 'plain_text',
          text: message,
        },
      ],
    },
    {
      type: 'context',
      elements: [
        {
          type: 'mrkdwn',
          text: 'Sent via _Satellytes Contact Form_',
        },
      ],
    },
  ];
};

export default async function handler(req, res) {
  const { name, email, message, ...honey } = req.body;
  console.log('receive form data', { name, email, message }, honey);

  if (honey.firstName || honey.phone) {
    console.log(`honeypot trap filled, aborting (received "${honey}")`);

    // this is probably a bot as our honeypot fields have been filled
    // let's silently ignore that bot
    return res.status(200).json({ ok: true });
  }

  if (req.method !== `POST`) {
    return res.status(500).json({ error: `not allowed` });
  }

  if (!TOKEN) {
    return res.status(500).json({ error: `no slack token given` });
  }

  const channelId = 'website';
  const client = new WebClient(TOKEN, {
    logLevel: LogLevel.DEBUG,
  });

  try {
    const result = await client.chat.postMessage({
      channel: channelId,
      // raw text as the fallback content for notifications.
      text: `${name} (${email}) sent the following message:\n ${message}`,
      blocks: createSlackMessage({ name, email, message }),
      icon_emoji: ':inbox_tray:',
    });

    console.log(result);
  } catch (error) {
    console.error(error);
  }

  return res.status(200).json({ ok: true });
}
