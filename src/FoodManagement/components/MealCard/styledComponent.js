import styled from '@emotion/styled'
import tw from 'tailwind.macro'
import { YellowOrange, Jade } from '../../themes/Colors'
import { Typo12JadeInter } from '../../../styleGuide/Typos'

const Container = styled.div `${tw `w-4/12 m-2`}
height:330px;
border:1px solid blue`

const MenuBar = styled.div `${tw ``}`

const MealTypeInfo = styled.div `${tw `flex`}`

const Icon = styled.img `${tw `border border-solid border-gray-400 p-2 m-1`}` //todo square

const HeadingAndTime = styled.div `${tw `flex flex-col m-2`}`

const MealPreference = styled(Typo12JadeInter)
`${tw `ml-auto h-10 flex justify-center items-center p-1`}
${props=>(props.mealPreference==="Custom")?
({color:YellowOrange,border:`1px solid ${YellowOrange}`}):({color:Jade,border:`
1px solid ${ Jade }
`})}
` //don't save

const MealData = styled.div `${tw `flex flex-col flex-wrap`}
height:180px`

const Item = styled.div `${tw `m-3`}`

const ButtonWrapper = styled.div `${tw `flex justify-center`}`

const MealType = styled.div `${tw ``}`

const Time = styled.div `${tw ``}`

export {
    Container,
    MenuBar,
    MealTypeInfo,
    Icon,
    HeadingAndTime,
    MealType,
    Time,
    MealPreference,
    MealData,
    Item,
    ButtonWrapper
}
