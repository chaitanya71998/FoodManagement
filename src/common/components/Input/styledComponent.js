import styled from '@emotion/styled';
import tw from 'tailwind.macro';
import { Steel, White } from '../../themes/Colors.js'

const InputFiled = styled.input `${tw `outline-none w-full`}
${{
  height: "40px",
  borderRadius: "2px",
  border: `solid 1px ${Steel}`,
  backgroundColor:White}}`

export {
  InputFiled
}
//width: "320px"
