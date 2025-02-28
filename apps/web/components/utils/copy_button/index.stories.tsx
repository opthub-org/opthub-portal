import { withLocale } from '@/.storybook/decorator'
import type { Meta } from '@storybook/react'
import { CopyButton } from '.'
import { Cases } from './cases'

//👇 This default export determines where your story goes in the story list
const meta: Meta<typeof CopyButton> = {
  component: CopyButton,
  parameters: {
    nextjs: {
      appDirectory: true
    }
  }
}

export default meta

export const JADefault = withLocale('ja', Cases.Default)
export const ENDefault = withLocale('en', Cases.Default)
