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
from './styledComponent'

import { BrightBlue } from '../../themes/Colors'
import strings from '../../i18n/strings.json'

@inject('onClickEditPreference')
@observer
class MealCard extends React.Component {
    static defaultProps = {
        mealIcon: "https://cdn.zeplin.io/5d0afc9102b7fa56760995cc/assets/ff7ee48c-8f6d-473d-848b-9042fc296211.svg",
        mealType: "Breakfast",
        mealTimings: "7:00-10:00",
        mealItems: [
            { meal_item_id: 0, meal_item: "puri", serving_size_unit: "peice" },
            { meal_item_id: 1, meal_item: "puri", serving_size_unit: "peice" },
            { meal_item_id: 2, meal_item: "puri", serving_size_unit: "peice" },
            { meal_item_id: 3, meal_item: "puri", serving_size_unit: "peice" },
            { meal_item_id: 4, meal_item: "puri", serving_size_unit: "peice" }

        ],
        mealPreference: "FullMeal"

    }
    renderMealItems = () => {
        const { mealItems, perticularMealInfo } = this.props
        console.log("item", perticularMealInfo.mealItems)
        return (perticularMealInfo.mealItems.map(item => {
                //<Item>{item.item_name}</Item>
                return <Item>{item.item_name}</Item>
            })

        )
        return "puri"
    }

    render() {
        //console.log("data", perticularMealInfo)
        const {
            mealIcon,
            mealType,
            mealTimings,
            mealItems,
            mealPreference,
            onClickEditPreference,
            perticularMealInfo
        } = this.props
        return (
            <Container>
            <MenuBar>
            </MenuBar>
            <MealTypeInfo>
            <Icon src={mealIcon}/>
            <HeadingAndTime>
            <MealType>{perticularMealInfo.mealType}</MealType>
            <Time>{mealTimings}</Time>
            </HeadingAndTime>
            <MealPreference mealPreference={perticularMealInfo.mealPreference}>{perticularMealInfo.mealPreference}</MealPreference>
            </MealTypeInfo>
            <MealData>
            {this.renderMealItems()}
            </MealData>
            <ButtonWrapper>
            <Button backgroundColor={BrightBlue} width="80%" onClick={onClickEditPreference}>{strings.mealCard.edit}</Button>
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
