import React from 'react'
import { observable } from 'mobx'
import { observer, inject } from 'mobx-react'
import { withRouter, Redirect } from 'react-router-dom'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { clearUserSession } from '../../../Authentication/utils/StorageUtils'
import { PreferencePage } from '../../components/PreferencePage'
import strings from '../../i18n/strings.json'

@inject('mealInfoStore')
@observer
class PreferencePageRoute extends React.Component {
   @observable status
   componentDidMount() {
      const { match } = this.props
      this.mealType = match.params.mealType.slice(1)
   }

   doNetworkCalls = () => {
      this.getMealInfoStore().clearStore()
      this.getMealInfoStore().getmealPreferenceInfo(this.mealType)
   }

   getMealInfoStore = () => {
      return this.props.mealInfoStore
   }
   onSaveMealPreference = () => {
      this.getMealInfoStore().onSaveMealPreference(
         this.onSuccess,
         this.onFailure
      )
      //this.handleToast()
      const { history } = this.props
      history.replace('/food-management-dashboard')
   }

   onClickBackButton = () => {
      const { history } = this.props
      history.goBack()
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

   onSuccess = () => {
      this.handelToast('success')
   }

   onFailure = () => {
      this.handelToast('failure')
   }
   handelToast = message => {
      let messageInfo = null
      if (message == 'failure') {
         messageInfo = strings.foodManagementDashBoard.somethingWentWrong
      } else {
         messageInfo = strings.foodManagementDashBoard.yourResponseIsCaptured
      }
      toast.success(messageInfo, {
         position: toast.POSITION.BOTTOM_CENTER,
         hideProgressBar: true,
         closeButton: false
      })
   }

   render() {
      return (
         <PreferencePage
            selectedMealInfo={this.getMealInfoStore().selectedMealInfo}
            getmealPreferenceInfoAPIStatus={
               this.getMealInfoStore().getmealPreferenceInfoAPIStatus
            }
            getmealPreferenceInfoAPIError={
               this.getMealInfoStore().getmealPreferenceInfoAPIError
            }
            date={this.getMealInfoStore().date}
            onChangeDate={this.getMealInfoStore().onChangeDateInPreferenceCard}
            getSelectedPreference={
               this.getMealInfoStore().getSelectedPreference
            }
            onSaveMealPreference={this.onSaveMealPreference}
            onClickBackButton={this.onClickBackButton}
            doNetworkCalls={this.doNetworkCalls}
            gotoHome={this.gotoHome}
            onClickSignOut={this.onClickSignOut}
         />
      )
   }
}

export default withRouter(PreferencePageRoute)
