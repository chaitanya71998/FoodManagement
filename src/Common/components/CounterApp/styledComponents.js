import styled from '@emotion/styled'
import tw from 'tailwind.macro'
import { lightBlueGrey, white } from '../../../FoodManagement/themes/Colors'
const Container = styled.div`
   ${tw`flex  items-center justify-center w-full`}
`

const Heading = styled.h1`
   ${tw`mb-6 text-5xl font-bold`}
`

const Group = styled.div`
   ${tw`flex`}
`

const IncrementButton = styled.button`
   ${tw`focus:outline-none rounded`}
   width: 40px;
   height: 40px;
   border: solid 1px ${lightBlueGrey};
   background-color: ${white};
`

const Input = styled('div')`
   ${tw`  border-2 text-center rounded flex justify-center items-center`}
   width: 40px;
   height: 40px;
   border: solid 1px ${lightBlueGrey};
`

const DecrementButton = IncrementButton.withComponent('button')

export { Container, Heading, IncrementButton, Input, DecrementButton, Group }
