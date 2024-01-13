import React from 'react'
import { observer, inject } from 'mobx-react'
import {History} from 'history'

import { clearUserSession } from '../../../Common/utils/StorageUtils'
import { HeadCountPage } from '../../components/HeadCountPage'
import { HeadCountStore } from "../../stores/HeadCountStore"

interface AdminHomePageRouteProps{
   history:History
}
interface InjectedProps extends AdminHomePageRouteProps{
   headCountStore:HeadCountStore,
   
}

@inject('headCountStore')
@observer
class AdminHomePageRoute extends React.Component <AdminHomePageRouteProps>{
   componentDidMount() {
      this.doNetworkCalls()
   }

   doNetworkCalls = () => {
      this.getheadCountStore().clearHeadCountStore()
      this.getheadCountStore().getSelectedMealTypeHeadCount()
   }

   getInjectedProps =():InjectedProps=>this.props as InjectedProps

   getheadCountStore = () => {
      return this.getInjectedProps().headCountStore
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
