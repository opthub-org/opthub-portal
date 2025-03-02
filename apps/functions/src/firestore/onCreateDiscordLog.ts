import { accountsRef } from '@/models'
import { sendToSlack } from '@/utils/slack'
import { Account, Admin, DiscordLog } from '@portal/universal_modules/schema'
import { onDocumentCreated } from 'firebase-functions/firestore'

const getMessage = (discordLog: Admin<DiscordLog>, account: Admin<Account>) => {
  switch (discordLog.action) {
    case 'join': {
      return `${account.name}が${discordLog.after.channel.name}に参加しました。`
    }
    case 'leave': {
      let msg = `${account.name}が${discordLog.before.channel.name}から退出しました。`
      if (account.type === 'outsourcing') {
        msg += '\n\n'
        if (account.slack) msg += `<@${account.slack.uid}>\n`
        msg += '本日の進捗を適切なチャンネルで報告してください。\n'
      }
      return msg
    }
    case 'move': {
      return `${account.name}が${discordLog.before.channel.name}から${discordLog.after.channel.name}に移動しました。`
    }
  }
}

export const onCreateDiscordLog = onDocumentCreated(
  {
    document: 'discord_logs/{id}',
    region: 'asia-northeast1',
    memory: '512MiB'
  },
  async (event) => {
    const snapshot = event.data
    if (!snapshot) throw new Error('snapshot is undefined')
    const discordLog = snapshot.data() as Admin<DiscordLog>
    if (discordLog === undefined) throw new Error('discord_log is undefined')
    const accountSnapshot = await accountsRef
      .where('discord', '==', discordLog.userId)
      .get()
    if (accountSnapshot.empty) return
    const account = accountSnapshot.docs[0].data()
    if (account === undefined) throw new Error('account is undefined')
    if (account.slack === undefined) return
    await sendToSlack(getMessage(discordLog, account), account.slack.channel)
  }
)
