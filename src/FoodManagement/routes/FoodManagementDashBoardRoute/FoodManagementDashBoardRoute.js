import React from 'react'
import { observer, inject } from 'mobx-react'
import { withRouter } from 'react-router-dom'
import { clearUserSession } from '../../../Common/utils/StorageUtils'
import { FoodManagementDashBoard } from '../../components/FoodManagementDashBoard'

@inject('mealInfoStore')
@observer
class FoodManagementDashBoardRoute extends React.Component {
   componentDidMount() {
      this.doNetworkCalls()
   }

   doNetworkCalls = () => {
      this.getMealInfoStore().clearStore()
      this.getMealInfoStore().getMealInfoAsPerDate()
   }

   componentWillUnmount() {
      this.getMealInfoStore().clearStore()
      // this.getMealInfoStore().isDateChanges()
   }

   getMealInfoStore = () => {
      return this.props.mealInfoStore
   }
   onClickEditPreference = mealType => {
      const { history } = this.props
      const selectedDate = this.getMealInfoStore().selectedDate
      // history.push({ pathname: `/food-management-dashboard/${mealType}` })
      // console.log("history", history)
      history.push({
         pathname: `/set-meal-preference`,
         search: `?date=${selectedDate}&meal_type=${mealType}`
      })
   }

   onClickReviewButton = mealType => {
      const { history } = this.props
      history.push({
         pathname: `/food-management-dashboard/review/:${mealType}`
      })
   }

   gotoHome = () => {
      const { history } = this.props
      history.replace('/food-management-dashboard')
   }
   onClickSignOut = () => {
      clearUserSession()
      const { history } = this.props
      history.replace({ pathname: '/sign-in-page' })
   }

   render() {
      return (
         <FoodManagementDashBoard
            onClickEditPreference={this.onClickEditPreference}
            mealInformation={this.getMealInfoStore().mealInfo}
            mealInfoAPIStatus={this.getMealInfoStore().mealInfoAPIStatus}
            mealInfoAPIError={this.getMealInfoStore().mealInfoAPIError}
            selectedDate={this.getMealInfoStore().selectedDate}
            onChangeDate={this.getMealInfoStore().onChangeDateInDashBoard}
            gotoHome={this.gotoHome}
            onClickSignOut={this.onClickSignOut}
            timeLeftForEditPreference={this.timeLeftForEditPreference}
            onClickReviewButton={this.onClickReviewButton}
            onClickIAteIt={this.getMealInfoStore().onClickIAteIt}
            onClickISkipped={this.getMealInfoStore().onClickISkipped}
            doNetworkCalls={this.doNetworkCalls}
         />
      )

   }
}

export default withRouter(FoodManagementDashBoardRoute)
