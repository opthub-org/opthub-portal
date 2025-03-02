import axios from 'axios'

/**
 * Sends a message to a Slack Incoming Webhook.
 * @param message - The message to post to Slack.
 * @param channel - The channel to post the message to.
 * @returns A promise that resolves when the request is complete.
 */
export const sendToSlack = async (message: string, channel: string) => {
  try {
    const payload = {
      text: message, // Message content
      channel, // Channel to send message to,
      username: 'Discord Bot'
    }

    const response = await axios.post(
      'https://hooks.slack.com/services/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',
      payload,
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    )
    if (response.status !== 200) {
      throw new Error(
        `Failed to send message to Slack. Status: ${response.status}, Response: ${response.data}`
      )
    }
    console.log('Message sent to Slack successfully.')
  } catch (error: unknown) {
    console.error('Error sending message to Slack')
  }
}
