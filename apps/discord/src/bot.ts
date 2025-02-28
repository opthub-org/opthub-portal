import { Client, GatewayIntentBits, VoiceState } from 'discord.js'
import { config } from 'dotenv'
import { Timestamp } from 'firebase-admin/firestore'
import { logRef, logsRef } from './models/log'

config()

const DISCORD_TOKEN = process.env.DISCORD_TOKEN

if (DISCORD_TOKEN === undefined) {
  console.error('Discord Token is not set.')
  process.exit(1)
}

// Discord クライアントの作成
const discordClient = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildVoiceStates]
})

// Discordのボイスチャンネル入退室イベント処理
discordClient.on(
  'voiceStateUpdate',
  async (before: VoiceState, after: VoiceState) => {
    console.log('voiceStateUpdate')
    const member = before.member ?? after.member
    if (!member) return

    const userId = member.id

    const beforeChannel = before.channel
    const beforeChannelParent = beforeChannel?.parent

    const afterChannel = after.channel
    const afterChannelParent = afterChannel?.parent

    const id = logsRef.doc().id
    const now = Timestamp.now()

    if (beforeChannel === null && afterChannel === null) return
    else if (beforeChannel !== null && afterChannel === null) {
      await logRef(id).set({
        id,
        userId,
        action: 'leave',
        before: {
          category: beforeChannelParent
            ? {
                id: beforeChannelParent.id,
                name: beforeChannelParent.name
              }
            : undefined,
          channel: {
            id: beforeChannel.id,
            name: beforeChannel.name
          }
        },
        createdAt: now,
        updatedAt: now
      })
      console.log(
        `[LOG] ${userId} leave ${beforeChannelParent?.name} - ${beforeChannel.name}`
      )
      return
    } else if (beforeChannel === null && afterChannel !== null) {
      await logRef(id).set({
        id,
        userId,
        action: 'join',
        after: {
          category: afterChannelParent
            ? {
                id: afterChannelParent.id,
                name: afterChannelParent.name
              }
            : undefined,
          channel: {
            id: afterChannel.id,
            name: afterChannel.name
          }
        },
        createdAt: now,
        updatedAt: now
      })
      console.log(
        `[LOG] ${userId} join ${afterChannelParent?.name} - ${afterChannel.name}`
      )
      return
    } else if (beforeChannel !== null && afterChannel !== null) {
      if (
        beforeChannel.name === afterChannel.name &&
        beforeChannelParent?.name === afterChannelParent?.name
      ) {
        return
      }
      await logRef(id).set({
        id,
        userId,
        action: 'move',
        before: {
          category: beforeChannelParent
            ? {
                id: beforeChannelParent.id,
                name: beforeChannelParent.name
              }
            : undefined,
          channel: {
            id: beforeChannel.id,
            name: beforeChannel.name
          }
        },
        after: {
          category: afterChannelParent
            ? {
                id: afterChannelParent.id,
                name: afterChannelParent.name
              }
            : undefined,
          channel: {
            id: afterChannel.id,
            name: afterChannel.name
          }
        },
        createdAt: now,
        updatedAt: now
      })
      console.log(
        `[LOG] ${userId} move ${beforeChannelParent?.name} - ${beforeChannel.name}  to ${afterChannelParent?.name} - ${afterChannel.name}`
      )
      return
    }
  }
)

// Discord ボットのログイン
discordClient
  .login(DISCORD_TOKEN)
  .then(() => {
    console.log('Discord Bot is running...')
  })
  .catch(console.error)
