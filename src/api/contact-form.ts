import { WebClient, LogLevel } from '@slack/web-api';

export default async function handler(req, res) {
  const channelId = 'website';

  const client = new WebClient(process.env.SLACK_BOT_SY_TOKEN, {
    logLevel: LogLevel.DEBUG,
  });

  try {
    // Call the chat.postMessage method using the WebClient
    const result = await client.chat.postMessage({
      channel: channelId,
      text: 'Hello world',
    });

    console.log(result);
  } catch (error) {
    console.error(error);
  }

  console.log(`submitted form`, req.body);
  res.status(200).json({ hello: `world` });
}
