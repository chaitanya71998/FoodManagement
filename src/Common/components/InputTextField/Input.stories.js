import React from 'react'
import { action } from '@storybook/addon-actions'
import { withKnobs, text, color } from '@storybook/addon-knobs'

import { InputTextField } from './InputTextField'

export default {
   component: InputTextField,
   title: 'src/Common/components/Input'
}

export const defaultView = () => <InputTextField />

export const knobs = () => (
   <InputTextField
      value={text('value', 'Sign in')}
      placeholder={text('Placeholder', 'enter')}
      onChange={action('onChange')}
   />
)

knobs.story = {
   decorators: [withKnobs]
}
