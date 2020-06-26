import React from 'react'
import { withRouter, RouteComponentProps } from 'react-router-dom'
import strings from '../../i18n/strings.json'
import {
   Container,
   Image,
   HomeButton,
   WeeklyMenu,
   Profile,
   SignOut
} from './styledComponents'

interface HeaderProps extends RouteComponentProps {
   onClickSignOut: () => void
   gotoHome: () => void
}

class Header extends React.Component<HeaderProps> {
   render() {
      const { onClickSignOut, gotoHome } = this.props
      return (
         <Container>
            <Image
               src='https://cdn.zeplin.io/5d0afc9102b7fa56760995cc/assets/5940bca8-e8f7-4535-8ae0-aff0d7067b3e.svg'
               alt='iBhubs_logo'
            />
            <HomeButton onClick={gotoHome}>{strings.header.home}</HomeButton>
            <WeeklyMenu>{strings.header.weeklyMenu}</WeeklyMenu>
            <Profile>{strings.header.profile}</Profile>
            <SignOut onClick={onClickSignOut}>{strings.header.signOut}</SignOut>
         </Container>
      )
   }
}

export default withRouter(Header)
