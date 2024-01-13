import styled from '@emotion/styled'
import tw from 'tailwind.macro'
import { Steel, White } from '../../../themes/Colors.js'

//${tw`outline-none flex justify-center items-center flex-grow`};
const ButtonWrapper = styled.button`
   width: 100px;
   height: 40px;
   border-radius: 4px;
   border: solid 1px #e4e9f0;
   background-color: red;
   background-color: yellow;
   color: black;
   ${props =>
      props.disabled
         ? { cursor: 'not-allowed', opacity: 0.2 }
         : { cursor: 'pointer' }}
`

const ButtonText = styled.div`
   ${tw``}
   width:100%
`

export { ButtonWrapper, ButtonText }
