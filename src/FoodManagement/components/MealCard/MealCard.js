import React from 'react'
import { Button } from '../../../common/components/Button'
import { inject, observer } from 'mobx-react'
import {
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
from './styledComponents'

import { BrightBlue } from '../../themes/Colors'
import strings from '../../i18n/strings.json'

@inject('onClickEditPreference')
@observer
class MealCard extends React.Component {
   static defaultProps = {
      mealIconForBreakFast: 'https://cdn.zeplin.io/5d0afc9102b7fa56760995cc/assets/ff7ee48c-8f6d-473d-848b-9042fc296211.svg'
   }
   renderMealItems = () => {
      const {  perticularMealInfo } = this.props
      return perticularMealInfo.mealItems.map(item => {
         return <Item key={item.itemId}>{item.itemName}</Item>
      })
   }

   render() {
      const {
         mealIcon,
         mealTimings,
         onClickEditPreference,
         perticularMealInfo
      } = this.props
      return (
         <Container>
            <MenuBar></MenuBar>
            <MealTypeInfo>
               <Icon src={mealIcon} />
               <HeadingAndTime>
                  <MealType>{perticularMealInfo.mealType}</MealType>
                  <Time>{mealTimings}</Time>
               </HeadingAndTime>
               <MealPreference
                  mealPreference={perticularMealInfo.mealPreference}
               >
                  {perticularMealInfo.mealPreference}
               </MealPreference>
            </MealTypeInfo>
            <MealData>{this.renderMealItems()}</MealData>
            <ButtonWrapper>
               <Button
                  backgroundColor={BrightBlue}
                  width='80%'
                  onClick={() =>
                     onClickEditPreference(perticularMealInfo.mealType)
                  }
               >
                  {strings.mealCard.edit}
               </Button>
            </ButtonWrapper>
         </Container>
      )
   }
}

export { MealCard }
/*
<MenuBar>
            </MenuBar>
            <MealTypeInfo>
            <Icon></Icon>
            <HeadingAndTime></HeadingAndTime>
            <MealPreference></MealPreference>
            </MealTypeInfo>
            <MealData>
            </MealData>
            <ButtonWrapper></ButtonWrapper>*/
