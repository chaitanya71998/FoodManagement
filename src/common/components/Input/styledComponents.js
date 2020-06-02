import styled from '@emotion/styled'
import tw from 'tailwind.macro'
import { steel, white } from '../../themes/Colors.js'

const InputFiled = styled.input `
   ${tw`outline-none `}
   ${{
      width: '100%',
      height: '40px',
      borderRadius: '2px',
      border: `solid 1px ${steel}`,
      backgroundColor: white
   }}
`

export { InputFiled }
//width: "320px"
