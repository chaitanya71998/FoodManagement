import React from 'react'
import { action } from '@storybook/addon-actions'
import { withKnobs, text, color } from '@storybook/addon-knobs'

import { Buttons } from '../Buttons'
import { OutLineButton } from '../OutLineButton'

export default {
   component: Buttons,
   title: 'src/Common/components/Buttons'
}

export const defaultView = () => <Buttons buttonType='filled' />

// export const loadingView = () => <BaseButton getUserSignInAPIStatus ={100} />

// export const knobs = () => (
//     <SignButton
//       buttonName = { text('buttonName', 'Sign in') }
//   />
// )

// knobs.story = {
//     decorators: [withKnobs]
// }
