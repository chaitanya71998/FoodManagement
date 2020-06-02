import styled from '@emotion/styled'
import tw from 'tailwind.macro'
import { Typo12JadeInter, Typo18SteelHKGrotesk, Typo12CoolGreyHKGrotesk, Typo14SteelHKGrotesk } from '../../../styleGuide/Typos'

const Wrapper = styled.div `
   ${tw`flex`}
   width:100%;

`

const ItemNameCategory = styled(Typo12CoolGreyHKGrotesk)
`
   ${tw`flex flex-col w-3/6 m-2`}

`

const ItemName = styled(Typo18SteelHKGrotesk)
`
   ${tw``}
`

const Category = styled.div `
   ${tw``}
`

const Quantity = styled(Typo14SteelHKGrotesk)
`
   ${tw`w-full flex justify-start items-center`}
  
`

const ServingSizes = styled.div `
   ${tw``}
`
const CounterWrapper = styled.div `${tw ``}`

export { Wrapper, ItemNameCategory, ItemName, Category, Quantity, ServingSizes, CounterWrapper }
