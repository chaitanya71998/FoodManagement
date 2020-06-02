import React from 'react'
import { observable } from 'mobx'
import { inject, observer } from 'mobx-react'
import { Button } from '../../../common/components/Button'
import { SetTimer } from '../../../common/components/SetTimer'
import eachHourOfInterval from 'date-fns/eachHourOfInterval'
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
   EditButtonWrapper,
   EditButtonText,
   TimerWrapper,
   AteOrSkippedButtonWrapper
}
from './styledComponents'

import { brightBlue } from '../../themes/Colors'
import strings from '../../i18n/strings.json'

import isBefore from 'date-fns/isBefore'
//var moment = require('moment');
//import differenceInHours from 'date-fns/difference_in_hours'

@observer
class MealCard extends React.Component {
   @observable isTimeForEating = false
   @observable timeLeftForEditPreference = null
   @observable isTimeLeftForEditing = false
   @observable isDisabledIAteItButton = true
   @observable isDisabledISkippedButton = true
   @observable intervals = []
   constructor(props) {
      super(props)
      //this.ZoneDifference = moment.duration("05:30:00")
      // let result = differenceInHours(
      //    new Date(2014, 6, 2, 19, 0),
      //    new Date(2014, 6, 2, 6, 50)
      // )
      // console.log("result", result)

   }
   static defaultProps = {
      mealIconForBreakFast: 'https://cdn.zeplin.io/5d0afc9102b7fa56760995cc/assets/ff7ee48c-8f6d-473d-848b-9042fc296211.svg'
   }
   componentDidMount() {
      const { mealTypeInfo } = this.props
      this.deadLine = mealTypeInfo.mealPreferenceDeadline
      console.log("deadLineDate", new Date(this.deadLine) + '   ' + new Date());
      console.log('time diffrence+=======')
      console.log(new Date(this.deadLine) - new Date())
      //this.setTimerForShowingEditButton()

      //this.setTimerForShowingDisabledStates()
      //this.setTimerForEnablingIAteItAndSkippedButtons()
   }


   componentWillUnmount() {
      //clearInterval(this.intervalForShowingEditButton);
   }

   // setTimerForShowingEditButton = () => {
   //    const { mealTypeInfo } = this.props
   //    this.intervalForShowingEditButton = setInterval(() => {
   //       this.currentDateAndTime = moment().format('YYYY-MM-DD HH:mm:ss')
   //       this.deadLineForEditing = moment(mealTypeInfo.mealPreferenceDeadline)
   //       this.deadLineinMilliSecondsFormate = moment(mealTypeInfo.mealPreferenceDeadline, 'YYYY-MM-DD HH:mm:ss').valueOf()
   //       this.currentTimeInMilliSecondsFormate = moment(this.currentDateAndTime, 'YYYY-MM-DD HH:mm:ss').valueOf()
   //       this.isTimeLeftForEditing = this.deadLineinMilliSecondsFormate > this.currentTimeInMilliSecondsFormate
   //       this.deadLineForEditing.subtract(this.ZoneDifference);
   //       this.timeLeftForEditPreference = moment(this.deadLineForEditing.diff(this.currentDateAndTime)).format("HH:mm:ss");
   //       if (!this.isTimeLeftForEditing) {
   //          this.timeLeftForEditPreference = '00:00:00'
   //          clearInterval(this.intervalForShowingEditButton);
   //       }
   //    }, 1000);
   // }

   // setTimerForShowingDisabledStates = () => {
   //    console.log("called")
   //    const { selectedDate, mealTypeInfo } = this.props
   //    this.intervalForShowingDisabledStates = setInterval(() => {
   //       this.currentDateAndTime = moment(new Date()).format('YYYY-MM-DD HH:mm:ss')
   //       this.mealstartTime = moment(`${selectedDate} ${mealTypeInfo.mealStarttime}`)
   //       this.mealstartTimeinMilliSecondsFormate = moment(this.mealstartTime, 'YYYY-MM-DD HH:mm:ss').valueOf()
   //       this.currentTimeInMilliSecondsFormate = moment(this.currentDateAndTime, 'YYYY-MM-DD HH:mm:ss').valueOf()
   //       this.isTimeForEating = this.mealstartTimeinMilliSecondsFormate - this.currentTimeInMilliSecondsFormate
   //       console.log("isTimeForEating", this.isTimeForEating)
   //       // if (this.isTimeForEating) {
   //       //    console.log("intervals", this.intervals.length)
   //       //    this.intervals.forEach(clearInterval);

   //       // }
   //    }, 1000)


   // }

   renderMealItems = () => {
      const { mealTypeInfo } = this.props
      return mealTypeInfo.mealItems.map(item => {
         return <Item key={item.itemId}>{item.itemName}</Item>
      })
   }

   render() {
      console.log("time", this.timeDifferenceInMilliSeconds)
      console.log("timeLeftIn render", this.timeLeftForEditPreference)
      const {
         mealIcon,
         mealTimings,
         onClickEditPreference,
         mealTypeInfo,
         timeLeftForEditPreference
      } = this.props
      return (
         <Container>
            <MenuBar></MenuBar>
            <MealTypeInfo>
               <Icon src={mealIcon} />
               <HeadingAndTime>
                  <MealType>{mealTypeInfo.mealType}</MealType>
                  <Time>{mealTypeInfo.mealStarttime}-{mealTypeInfo.mealEndtime}</Time>
               </HeadingAndTime>
               <MealPreference
                  mealPreference={mealTypeInfo.mealPreference}
               >
                  {mealTypeInfo.mealPreference}
               </MealPreference>
            </MealTypeInfo>
            <MealData>{this.renderMealItems()}</MealData>
            {(true)?
               <EditButtonWrapper>
               <Button
                  backgroundColor={brightBlue}
                  width='80%'
                  onClick={()=>onClickEditPreference(mealTypeInfo.mealType)}
               >
                 <EditButtonText>
                 {strings.mealCard.edit} 
                 <TimerWrapper>{this.timeLeftForEditPreference}</TimerWrapper>
                 </EditButtonText>
               </Button>
            </EditButtonWrapper>
            :<AteOrSkippedButtonWrapper>
            <Button
            backgroundColor={brightBlue}
            width="40%"
            disabled={(!this.isTimeForEating&&mealTypeInfo.mealPreference!=="Skipped")}
            >I Ate it</Button>
            <Button 
            backgroundColor={brightBlue}
            width="40%"
            disabled={!this.isTimeForEating}
            >I skipped</Button>
            </AteOrSkippedButtonWrapper>}
            
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
//this.timeLeftForEditPreference!='00:00:00'
