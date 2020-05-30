import styled from '@emotion/styled'
import tw from 'tailwind.macro'
import { YellowOrange, Jade } from '../../themes/Colors'
import { Typo12JadeInter } from '../../../styleGuide/Typos'

const Wrapper = styled.div `
   ${tw`flex w-3/6`}
`

const ItemNameCategory = styled.div `
   ${tw`flex flex-col w-3/6 m-2`}
`

const ItemName = styled.div `
   ${tw``}
`

const Category = styled.div `
   ${tw``}
`

const Quantity = styled.div `
   ${tw`w-full flex align-baseline items-center`}
`

const ServingSizes = styled.div `
   ${tw``}
`

export { Wrapper, ItemNameCategory, ItemName, Category, Quantity, ServingSizes }
