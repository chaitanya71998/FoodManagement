import React from 'react'
import { observable } from 'mobx'
import { observer, inject } from 'mobx-react'
import { withRouter, Redirect } from 'react-router-dom'
import { getAccessToken } from '../../utils/StorageUtils'
//import { SignInPage } from '../../components/SignInPage';
import { FoodManagementDashBoard } from '../../components/FoodManagementDashBoard'

@inject('mealInfoStore')
@observer
class FoodManagementDashBoardRoute extends React.Component {
    componentDidMount() {
        this.doNetworkCalls()
    }

    doNetworkCalls = () => {
        this.getMealInfoStore().getMealInfoAsPerDate()
    }

    getMealInfoStore = () => {
        return this.props.mealInfoStore
    }
    onClickEditPreference = () => {
        this.getMealInfoStore().getPreferencePageInfo()
        const { history } = this.props
        history.replace('/')

    }

    render() {
        return (
            <FoodManagementDashBoard
            onClickEditPreference={this.onClickEditPreference}
            mealInformation={this.getMealInfoStore().mealInfo}
            getMealInfoAPIStatus={this.getMealInfoStore().getMealInfoAPIStatus}
            getMealInfoAPIError={this.getMealInfoStore().getMealInfoAPIError}
            
            
            />
        )
    }
}

export default withRouter(FoodManagementDashBoardRoute)
