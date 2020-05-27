import styled from '@emotion/styled';
import tw from 'tailwind.macro';
import { Steel, White } from '../../themes/Colors.js'

const ButtonKind = styled.button `${tw `outline-none`}
${props=>({width: props.width,
  height: "40px",
  borderRadius: "4px",
  backgroundColor:props.backgroundColor,
  color:props.color
})}`

export {
  ButtonKind
}
