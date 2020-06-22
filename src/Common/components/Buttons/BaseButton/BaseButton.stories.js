import React from 'react'
import { action } from '@storybook/addon-actions'
import { withKnobs, text, color } from '@storybook/addon-knobs'

import '../../../../styles/tailwind.css'
import { BaseButton } from './BaseButton.js'

export default {
    component: BaseButton,
    title: 'src/Common/components/BaseButton',
}


export const defaultView = () => <BaseButton />

// export const loadingView = () => <BaseButton getUserSignInAPIStatus ={100} />

// export const knobs = () => (
//     <SignButton
//       buttonName = { text('buttonName', 'Sign in') }
//   />
// )

// knobs.story = {
//     decorators: [withKnobs]
// }
