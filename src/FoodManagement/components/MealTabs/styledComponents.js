import styled from '@emotion/styled'
import tw from 'tailwind.macro'
import {
   Typo12JadeInter,
   Typo18SteelHKGrotesk,
   Typo12CoolGreyHKGrotesk,
   Typo14SteelHKGrotesk
} from '../../../styleGuide/Typos'

const Wrapper = styled.div`
   ${tw`flex m-2`}
   width:100%;
`

const ItemNameCategory = styled(Typo12CoolGreyHKGrotesk)`
   ${tw`flex flex-col w-3/6 m-2`}
`

const ItemName = styled(Typo18SteelHKGrotesk)`
   ${tw``}
`

const Category = styled.div`
   ${tw``}
`

const Quantity = styled(Typo14SteelHKGrotesk)`
   ${tw`w-full flex justify-start items-center`}
`

const ServingSizes = styled.div`
   ${tw``}
`
const CounterWrapper = styled.div`
   ${tw``}
`

const Container = styled.div`
   ${tw`flex flex-col flex-wrap`}
   width:100%;
`

export {
   Wrapper,
   ItemNameCategory,
   ItemName,
   Category,
   Quantity,
   ServingSizes,
   CounterWrapper,
   Container
}
