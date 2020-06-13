import React from 'react'
import { observer, inject } from 'mobx-react'
import { withRouter } from 'react-router-dom'
import { clearUserSession } from '../../../Authentication/utils/StorageUtils'
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

   getMealInfoStore = () => {
      return this.props.mealInfoStore
   }
   onClickEditPreference = mealType => {
      const date = '13-04-2018'
      const { history } = this.props
      history.push({ pathname: `/food-management-dashboard/:${mealType}` })
      // history.push({ pathname: `/set-meal-preference?date=${date}&meal_type=${mealType}
      //  ` })
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
