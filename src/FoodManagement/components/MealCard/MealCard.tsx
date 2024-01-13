import React from 'react'
import { observable } from 'mobx'
import { observer } from 'mobx-react'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { RiTimer2Line } from 'react-icons/ri'

import {
   getTimeDistanceInWords,
   isTimeBeforeDeadLine
} from '../../../Common/utils/TimeUtils'
import { Button } from '../../../Common/components/Button'
import { brightBlue, white, darkBlueGrey } from '../../themes/Colors'
import strings from '../../i18n/strings.json'
import { MealInfoType } from '../../stores/MealInfoStore/MealInfoStore'
import { MealPreference } from '../../stores/MealInfoStore/models/MealPreference'

import {
   Container,
   MealTypeInfo,
   Icon,
   HeadingAndTime,
   MealType,
   Time,
   MealData,
   Item,
   EditButtonWrapper,
   EditButtonText,
   TimerWrapper,
   AteOrSkippedButtonWrapper,
   ReviewWrapper,
   TimerIcon,
   MealPreferenceName,
   HoverInfo
} from './styledComponents'

type MealCardProps = {
   mealTypeInfo: MealInfoType
   onClickEditPreference: (mealType: string) => void
   selectedDate: String
   onClickReviewButton: Function
   selectedMealTypeInfo: null | MealPreference
   onClickIAteIt: Function
   onClickISkipped: Function
   mealIcon: string
   doNetworkCalls: Function
}

@observer
class MealCard extends React.Component<MealCardProps> {
   @observable isTimeForEating: boolean = false
   @observable timeLeftForEditPreference: null | string = null
   @observable isTimeLeftForEditing: boolean = true
   @observable isDisabledIAteItButton: boolean = true
   @observable isDisabledISkippedButton: boolean = true
   @observable isTimeForReview: boolean = false
   @observable presentTime!: Date
   intervalForShowingEditButton!: NodeJS.Timeout
   intervalForShowingDisabledStates!: NodeJS.Timeout
   intervalForShowingEnablingTheStates!: number //ambiguty for Type

   componentDidMount() {
      this.setTimerForShowingEditButton()
      this.setTimerForShowingDisabledStates()
      this.setTimerForEnablingIAteItAndSkippedButtons()
   }

   componentWillUnmount() {
      clearInterval(this.intervalForShowingEditButton)
      clearInterval(this.intervalForShowingDisabledStates)
      clearInterval(this.intervalForShowingEnablingTheStates)
   }

   getPresentDate = () => {
      this.presentTime = new Date()
   }

   setTimerForShowingEditButton = () => {
      const { mealTypeInfo } = this.props
      this.intervalForShowingEditButton = setInterval(() => {
         this.getPresentDate()
         this.timeLeftForEditPreference = getTimeDistanceInWords(
            mealTypeInfo.mealPreferenceDeadline,
            this.presentTime
         )
         if (
            !isTimeBeforeDeadLine(
               this.presentTime,
               mealTypeInfo.mealPreferenceDeadline
            )
         ) {
            this.isTimeLeftForEditing = false
            clearInterval(this.intervalForShowingEditButton)
         }
      }, 1000)
   }

   setTimerForShowingDisabledStates = () => {
      const { selectedDate, mealTypeInfo } = this.props
      this.intervalForShowingDisabledStates = setInterval(() => {
         this.getPresentDate()
         if (
            !isTimeBeforeDeadLine(
               this.presentTime,
               `${selectedDate} ${mealTypeInfo.mealStarttime}`
            )
         ) {
            this.isTimeForEating = true
            clearInterval(this.intervalForShowingDisabledStates)
         }
      }, 1000)
      // console.log(
      //    'intervalForShowingDisabledStates',
      //    this.intervalForShowingDisabledStates
      // ) //here console is not triggered
   }

   setTimerForEnablingIAteItAndSkippedButtons = () => {
      const { selectedDate, mealTypeInfo } = this.props
      this.intervalForShowingEnablingTheStates = setInterval(() => {
         this.getPresentDate()
         if (
            !isTimeBeforeDeadLine(
               this.presentTime,
               `${selectedDate} ${mealTypeInfo.mealEndtime}`
            )
         ) {
            this.isTimeForEating = false
            this.isTimeForReview = true
            clearInterval(this.intervalForShowingEnablingTheStates)
         }
      })
   }

   onClickIAteIt = () => {
      let userStatus = 'False'
      const { mealTypeInfo, onClickIAteIt } = this.props
      this.isTimeForReview = true
      if (!mealTypeInfo.isEaten) {
         userStatus = 'True'
      }
      onClickIAteIt(
         mealTypeInfo.mealId,
         userStatus,
         this.onSuccess,
         this.onFailure
      )
   }

   onClickISkipped = () => {
      const { onClickISkipped, mealTypeInfo } = this.props
      this.isTimeForReview = true
      onClickISkipped(mealTypeInfo.mealType, this.onSuccess, this.onFailure)
   }

   onSuccess = () => {
      const { doNetworkCalls } = this.props
      this.handelToast('success')
      doNetworkCalls()
   }

   onFailure = () => {
      this.handelToast('failure')
   }
   handelToast = message => {
      let messageInfo: null | string = null
      if (message == 'failure') {
         messageInfo = strings.foodManagementDashBoard.somethingWentWrong
         toast.warn(messageInfo, {
            position: toast.POSITION.BOTTOM_CENTER,
            hideProgressBar: true,
            closeButton: false
         })
      } else {
         messageInfo = strings.foodManagementDashBoard.yourResponseIsCaptured
         toast.success(messageInfo, {
            position: toast.POSITION.BOTTOM_CENTER,
            hideProgressBar: true,
            closeButton: false
         })
      }
   }

   renderMealItems = () => {
      const { mealTypeInfo } = this.props
      return mealTypeInfo.mealItems.map(item => {
         return <Item key={item.mealItemId}>{item.itemName}</Item>
      })
   }

   render() {
      const {
         mealIcon,
         onClickEditPreference,
         mealTypeInfo,
         onClickReviewButton,
         selectedMealTypeInfo
      } = this.props
      return (
         <Container>
            <MealTypeInfo>
               <Icon src={mealIcon} />
               <HeadingAndTime>
                  <MealType>{mealTypeInfo.mealType}</MealType>
                  <Time>
                     {mealTypeInfo.mealStarttime}-{mealTypeInfo.mealEndtime}
                  </Time>
               </HeadingAndTime>
               <MealPreferenceName mealPreference={mealTypeInfo.mealPreference}>
                  {mealTypeInfo.mealPreference}
               </MealPreferenceName>
            </MealTypeInfo>
            <MealData>{this.renderMealItems()}</MealData>
            {!this.isTimeForReview ? (
               this.isTimeLeftForEditing ? (
                  <EditButtonWrapper>
                     <Button
                        backgroundColor={brightBlue}
                        width='80%'
                        onClick={() =>
                           onClickEditPreference(mealTypeInfo.mealType)
                        }
                        getAPIStatus={
                           selectedMealTypeInfo
                              ? selectedMealTypeInfo.selectedMealTypeInfoAPIStatus
                              : 0
                        } //TODO GET STATUS
                     >
                        <EditButtonText data-testid='Edit'>
                           {strings.mealCard.edit}
                           <TimerWrapper>
                              <TimerIcon>
                                 <RiTimer2Line />
                              </TimerIcon>
                              {this.timeLeftForEditPreference}
                              {strings.mealCard.left}
                           </TimerWrapper>
                        </EditButtonText>
                     </Button>
                  </EditButtonWrapper>
               ) : (
                  <AteOrSkippedButtonWrapper>
                     <Button
                        backgroundColor={brightBlue}
                        width='40%'
                        disabled={
                           !(
                              this.isTimeForEating &&
                              mealTypeInfo.mealPreference !== 'Skipped'
                           )
                        }
                        onClick={this.onClickIAteIt}
                     >
                        {strings.mealCard.iAteIt}
                     </Button>
                     <Button
                        backgroundColor={white}
                        width='40%'
                        disabled={!this.isTimeForEating}
                        color={darkBlueGrey}
                        onClick={this.onClickISkipped}
                     >
                        {strings.mealCard.iSkipped}
                     </Button>
                  </AteOrSkippedButtonWrapper>
               )
            ) : (
               <ReviewWrapper>
                  <Button
                     backgroundColor={white}
                     width='40%'
                     color={darkBlueGrey}
                     onClick={() => onClickReviewButton(mealTypeInfo.mealType)}
                  >
                     {strings.mealCard.review}
                  </Button>
               </ReviewWrapper>
            )}
         </Container>
      )
   }
}

export { MealCard }
