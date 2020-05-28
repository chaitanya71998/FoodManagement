import styled from '@emotion/styled'
import tw from 'tailwind.macro'

const Container = styled.div `${tw `flex justify-center flex-col items-center`}`

const HeaderWrapper = styled.div `${tw `w-full`}
height:90px`

const Banner = styled.div `${tw `h-64 w-full`}`

const DateWrapper = styled.div `${tw `w-56`}`

const SelectDate = styled.input `${tw `border border-gray-400 border-solid w-56`}`

const MealCards = styled.div `${tw `flex w-full justify-around m-1`}
`

const SuccessWrapper = styled.div `${tw `w-full`}`

const LoadingWrapper = styled.div `${tw `w-full`}`

export { Container, Banner, DateWrapper, HeaderWrapper, SelectDate, MealCards, SuccessWrapper, LoadingWrapper }
