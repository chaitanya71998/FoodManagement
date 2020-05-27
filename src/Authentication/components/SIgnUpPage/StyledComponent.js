import styled from '@emotion/styled';
import tw from 'tailwind.macro';
import { iceBlue } from '../../themes/'

const Container = styled.div `${tw ``}
${{
  width: "1440px",
  height: "1024px",
  backgroundColor: iceBlue
}}`

const SignUpContainer = styled.div `${tw ``}`

const Logo = styled.img `${tw ``}`

export { Container, SignUpContainer, Logo }
