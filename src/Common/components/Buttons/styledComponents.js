import styled from '@emotion/styled'
import tw from 'tailwind.macro'
import { css, jsx } from '@emotion/core'

import BaseButton from './BaseButton'

const ButtonWrapper = styled.div`
   ${tw``}
`
const Button = styled(BaseButton)``

const Oval = css`
   border-radius: 10px;
`

const Rectangular = css`
   border-radius: 0px;
`

export { Button, ButtonWrapper, Oval, Rectangular }
