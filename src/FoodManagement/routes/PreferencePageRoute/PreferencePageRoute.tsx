/*global location*/
import React from 'react'
import { observable } from 'mobx'
import { observer, inject } from 'mobx-react'
import { withRouter, RouteComponentProps } from 'react-router-dom' //TODO
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { clearUserSession } from '../../../Common/utils/StorageUtils'
import { PreferencePage } from '../../components/PreferencePage'
import strings from '../../i18n/strings.json'
import { MealInfoStore } from '../../stores/MealInfoStore'
const queryString = require('query-string')

interface PreferencePageRouteProps extends RouteComponentProps {}

interface InjectedProps extends PreferencePageRouteProps {
   mealInfoStore: MealInfoStore
}
@inject('mealInfoStore')
@observer
class PreferencePageRoute extends React.Component<PreferencePageRouteProps> {
   mealType!: string
   selectedDate!: string

   componentDidMount() {
      const parsed = queryString.parse(location.search)
      // this.mealType = match.params.mealType.slice(1)
      this.mealType = parsed.meal_type
      this.selectedDate = parsed.date
      this.doNetworkCalls()
   }

   doNetworkCalls = () => {
      this.getMealInfoStore().onClickEditPreference(
         this.mealType,
         this.selectedDate
      )
   }

   getInjectedProps = (): InjectedProps => this.props as InjectedProps
   getMealInfoStore = () => {
      return this.getInjectedProps().mealInfoStore
   }
   onSaveMealPreference = () => {
      this.getMealInfoStore().selectedMealInfo.onSaveMealPreference(
         this.onSuccess,
         this.onFailure,
         'Save'
      )
   }

   onClickSkipButton = () => {
      this.getMealInfoStore().selectedMealInfo.onClickSkipButton(
         this.onSuccess,
         this.onFailure,
         'Skipped'
      )
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
      const { history } = this.props
      history.replace('/food-management-dashboard')
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

   render() {
      if (this.getMealInfoStore().selectedMealInfo) {
         return (
            <PreferencePage
               selectedMealInfo={
                  this.getMealInfoStore().selectedMealInfo.preferencesInfo
               }
               selectedMealTypeInfoAPIStatus={
                  this.getMealInfoStore().selectedMealInfo
                     .selectedMealTypeInfoAPIStatus
               }
               selectedMealTypeInfoAPIError={
                  this.getMealInfoStore().selectedMealInfo
                     .selectedMealTypeInfoAPIError
               }
               selectedDate={
                  this.getMealInfoStore().selectedMealInfo.selectedDate
               }
               getSelectedPreference={
                  this.getMealInfoStore().selectedMealInfo.getSelectedPreference
               }
               onSaveMealPreference={this.onSaveMealPreference}
               onClickBackButton={this.onClickBackButton}
               doNetworkCalls={this.doNetworkCalls}
               gotoHome={this.gotoHome}
               onClickSignOut={this.onClickSignOut}
               onClickSkipButton={this.onClickSkipButton}
               onChangeDate={
                  this.getMealInfoStore().selectedMealInfo
                     .onChangeDateInPreferenceCard
               }
               isLoadingOnSave={
                  this.getMealInfoStore().selectedMealInfo.isLoadingOnSave
               }
               isLoadingOnSkipped={
                  this.getMealInfoStore().selectedMealInfo.isLoadingOnSkipped
               }
            />
         )
      } else {
         return null
      }
   }
}

export default withRouter(PreferencePageRoute)
