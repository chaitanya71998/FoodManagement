// import React from 'react'
// import { observable } from 'mobx'
// import { observer, inject } from 'mobx-react'
// import { withRouter, Redirect } from 'react-router-dom'
// import { clearUserSession } from '../../../Authentication/utils/StorageUtils'
// import { FoodManagementDashBoard } from '../../components/FoodManagementDashBoard'

// @inject('mealInfoStore')
// @observer
// class FoodManagementDashBoardRoute extends React.Component {
//    componentDidMount() {
//       this.doNetworkCalls()
//    }

//    doNetworkCalls = () => {
//       this.getMealInfoStore().clearStore()
//       this.getMealInfoStore().getMealInfoAsPerDate()
//    }

//    getMealInfoStore = () => {
//       return this.props.mealInfoStore
//    }
//    onClickEditPreference = mealType => {
//       this.getMealInfoStore().getmealPreferenceInfo(mealType)
//       //const mealInfo = this.getMealInfoStore().mealInfo
//       //mealInfo[0].getmealPreferenceInfo(mealType)
//       const { history } = this.props
//       history.push({ pathname: `/food-management-dashboard/:${mealType}` })
//    }

//    gotoHome = () => {
//       const { history } = this.props
//       history.replace('/food-management-dashboard')
//    }
//    onClickSignOut = () => {
//       clearUserSession()
//       const { history } = this.props
//       history.replace({ pathname: '/sign-in-page' })
//    }

//    render() {
//       return (
//          <FoodManagementDashBoard
//             onClickEditPreference={this.onClickEditPreference}
//             mealInformation={this.getMealInfoStore().mealInfo}
//             getMealInfoAPIStatus={this.getMealInfoStore().getMealInfoAPIStatus}
//             getMealInfoAPIError={this.getMealInfoStore().getMealInfoAPIError}
//             date={this.getMealInfoStore().date}
//             onChangeDate={this.getMealInfoStore().onChangeDateInDashBoard}
//             gotoHome={this.gotoHome}
//             onClickSignOut={this.onClickSignOut}
//          />
//       )
//    }
// }

// export default withRouter(FoodManagementDashBoardRoute)



import React from 'react'
import { observable } from 'mobx'
import { observer, inject } from 'mobx-react'
import { withRouter, Redirect } from 'react-router-dom'
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
   onClickEditPreference = (mealType) => {
      this.getMealInfoStore().onClickEditPreference(mealType)
      const { history } = this.props
      history.push({ pathname: `/food-management-dashboard/:${mealType}` })
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
         />
      )
      // console.log(this.getMealInfoStore().mealInfo)
      // return (
      //    <div>hi</div>
      // )
   }
}

export default withRouter(FoodManagementDashBoardRoute)
