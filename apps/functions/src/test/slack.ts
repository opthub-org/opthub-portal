import { sendToSlack } from '@/utils/slack'

const main = async () => {
  await sendToSlack('Hello, Slack!', '#times-mishima')
}

main().catch(console.error)
