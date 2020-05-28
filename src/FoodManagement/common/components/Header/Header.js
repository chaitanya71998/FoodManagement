import React from 'react'
import { withRouter } from "react-router-dom";
import {
   Container,
   Image,
   HomeButton,
   WeeklyMenu,
   Profile,
   SignOut
}
from './styledComponent'
import { clearUserSession } from '../../../../Authentication/utils/StorageUtils'
import strings from '../../i18n/strings.json'
class Header extends React.Component {
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
         <Container>
            <Image
               src='https://cdn.zeplin.io/5d0afc9102b7fa56760995cc/assets/5940bca8-e8f7-4535-8ae0-aff0d7067b3e.svg'
               alt='iBhubs_logo'
            />
            <HomeButton onClick={this.gotoHome}>{strings.header.home}</HomeButton>
            <WeeklyMenu>{strings.header.weeklyMenu}</WeeklyMenu>
            <Profile>{strings.header.profile}</Profile>
            <SignOut onClick={this.onClickSignOut}>{strings.header.signOut}</SignOut>
         </Container>
      )
   }
}

export default withRouter(Header)
