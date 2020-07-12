import styled from '@emotion/styled'
import tw from 'tailwind.macro'
import { steel, white } from '../../themes/Colors.js'
import { createHmac } from 'crypto'

const InputFiled = styled.input`
   ${tw`outline-none `}
   ${{
      width: '100%',
      height: '40px',
      borderRadius: '2px',
      border: `solid 1px ${steel}`,
      backgroundColor: white
   }}
`
const InputFiledWrapper = styled.div`
   ${tw``}
`

const ErrorMessage = styled.div`
   ${tw``}
   color:red
`

export { InputFiled, InputFiledWrapper, ErrorMessage }
//width: "320px"
