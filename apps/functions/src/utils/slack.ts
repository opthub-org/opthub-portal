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
    console.log('Error sending message to Slack')
    console.error(error)
  }
}
