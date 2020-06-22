import styled from '@emotion/styled'
import tw from 'tailwind.macro'
import { Steel, White } from '../../../themes/Colors.js'

const ButtonWrapper = styled.button `
   ${tw`outline-none flex justify-center items-center flex-grow`}
   ${props => ({
      width: '100px',
      height: '40px',
      borderRadius: '4px',
      border: 'solid 1px #e4e9f0',
      backgroundColor: "blue",
      color: "black"
   })}
   ${props =>
      props.disabled
         ? { cursor: 'not-allowed', opacity: 0.2 }
         : { cursor: 'pointer' }}
`

const ButtonText = styled.div `
   ${tw``}
   width:100%
`

export { ButtonWrapper, ButtonText }
