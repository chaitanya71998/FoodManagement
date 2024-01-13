import React from 'react'
import { observable } from 'mobx'
import { observer, inject } from 'mobx-react'
import { withRouter, RouteComponentProps } from 'react-router-dom'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { clearUserSession } from '../../../Common/utils/StorageUtils'
import { ReviewPage } from '../../components/ReviewPage'
import strings from '../../i18n/strings.json'
import { MealInfoStore } from '../../stores/MealInfoStore'

interface ParamsProps {
   mealType: string
}

interface ReviewPageRouteProps extends RouteComponentProps<ParamsProps> {}

interface InjectedProps extends ReviewPageRouteProps {
   mealInfoStore: MealInfoStore
}

@inject('mealInfoStore')
@observer
class ReviewPageRoute extends React.Component<ReviewPageRouteProps> {
   @observable status
   mealType!: string
   componentDidMount() {
      const { match } = this.props
      this.mealType = match.params.mealType.slice(1)
      this.doNetworkCalls()
   }

   doNetworkCalls = () => {
      this.getMealInfoStore().clearStore()
      this.getMealInfoStore().onClickReviewButton(this.mealType)
   }

   getInjectedProps = (): InjectedProps => this.props as InjectedProps

   getMealInfoStore = () => {
      return this.getInjectedProps().mealInfoStore
   }
   onSaveMealReview = () => {
      this.getMealInfoStore().selectedMealInfoReview.onSaveMealReview(
         this.onSuccess,
         this.onFailure
      )
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
      const { history } = this.props
      history.replace('/food-management-dashboard')
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
      if (this.getMealInfoStore().selectedMealInfoReview) {
         return (
            <ReviewPage
               selectedMealTypeInfoReview={
                  this.getMealInfoStore().selectedMealInfoReview.mealTypeReview
               }
               selectedMealTypeReviewInfoAPIStatus={
                  this.getMealInfoStore().selectedMealInfoReview
                     .selectedMealTypeReviewInfoAPIStatus
               }
               selectedMealTypeReviewInfoAPIError={
                  this.getMealInfoStore().selectedMealInfoReview
                     .selectedMealTypeReviewInfoAPIError
               }
               onSaveMealReview={this.onSaveMealReview}
               doNetworkCalls={this.doNetworkCalls}
               gotoHome={this.gotoHome}
               onClickSignOut={this.onClickSignOut}
               isLoadingOnDone={
                  this.getMealInfoStore().selectedMealInfoReview.isLoadingOnDone
               }
               onChangeReviewOfMealType={
                  this.getMealInfoStore().selectedMealInfoReview
                     .onChangeReviewOfMealType
               }
            />
         )
      } else {
         return null
      }
   }
}

export default withRouter(ReviewPageRoute)
