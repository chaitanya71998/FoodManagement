import styled from '@emotion/styled'
import tw from 'tailwind.macro'
import { Steel, White } from '../../themes/Colors.js'

const ButtonKind = styled.button `
   ${tw`outline-none flex justify-center items-center flex-grow`}
   ${props => ({
      width: props.width,
      height: '40px',
      borderRadius: '4px',
      backgroundColor: props.backgroundColor,
      color: props.color
   })}
`

const ButtonText = styled.div `${tw ``}
width:100%`

export { ButtonKind, ButtonText }
