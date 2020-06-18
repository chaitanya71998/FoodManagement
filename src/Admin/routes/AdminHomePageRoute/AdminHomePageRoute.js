import React from 'react'
import { observer, inject } from 'mobx-react'
import { HeadCountPage } from '../../components/HeadCountPage'
import { clearUserSession } from '../../../Common/utils/StorageUtils'

@inject('headCountStore')
@observer
class AdminHomePageRoute extends React.Component {
   componentDidMount() {
      this.doNetworkCalls()
   }

   doNetworkCalls = () => {
      this.getheadCountStore().clearHeadCountStore()
      this.getheadCountStore().getSelectedMealTypeHeadCount()
   }

   getheadCountStore = () => {
      return this.props.headCountStore
   }

   gotoHome = () => {
      const { history } = this.props
      history.replace('/admin-page')
   }
   onClickSignOut = () => {
      clearUserSession()
      const { history } = this.props
      history.replace({ pathname: '/sign-in-page' })
   }

   render() {
      if (this.getheadCountStore().selectedMealTypeheadCount) {
         return (
            <HeadCountPage
               headCountAPIStatus={
                  this.getheadCountStore().selectedMealTypeheadCount
                     .headCountAPIStatus
               }
               headCountAPIError={
                  this.getheadCountStore().selectedMealTypeheadCount
                     .headCountAPIError
               }
               selectedMealTypeheadCount={
                  this.getheadCountStore().selectedMealTypeheadCount
                     .headCountInfo
               }
               onChangeMealTypeTab={
                  this.getheadCountStore().onChangeMealTypeTab
               }
               onRetry={this.doNetworkCalls}
               onClickSignOut={this.onClickSignOut}
               gotoHome={this.gotoHome}
               onChangeDate={this.getheadCountStore().onChangeDate}
               selectedDate={this.getheadCountStore().selectedDate}
            />
         )
      } else {
         return null
      }
   }
}

export default AdminHomePageRoute
