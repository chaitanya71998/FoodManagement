import React from 'react'
import { observer } from 'mobx-react'
import { withRouter } from 'react-router-dom'
import { MealTabs } from '../MealTabs'
import { Button } from '../../../common/components/Button'
import { SetDate } from '../../../common/components/SetDate'
import strings from '../../i18n/strings.json'
import { white, darkBlueGrey } from '../../themes/Colors'
import {
   Container,
   Header,
   Heading,
   SkipButtonWrapper,
   TabsWrapper,
   DateWrapper,
   Footer,
   BackButtonWrapper,
   SaveButtonWrapper,
   TabsAndDateWrapper,
   Image
}
from './styledComponents'

@observer
class PreferenceCard extends React.Component {
   constructor(props) {
      super(props)
      const { match } = this.props
      this.mealType = match.params.mealType.slice(1)
   }
   render() {
      const {
         selectedMealInfo,
         selectedDate,
         onChangeDate,
         getSelectedPreference,
         onSaveMealPreference,
         onClickBackButton,
      } = this.props
      const selectedMealInformation = [...selectedMealInfo]
      if (selectedMealInformation.length != 0) {
         return (
            <Container>
               <Header>
                  <Heading>{this.mealType}</Heading>
                  <SkipButtonWrapper>
                     <Button
                        backgroundColor={white}
                        color={darkBlueGrey}
                        width='100%'
                     >
                        {strings.preferenceCard.skipMeal}
                     </Button>
                  </SkipButtonWrapper>
               </Header>
               <TabsAndDateWrapper>
                  <TabsWrapper>
                     <MealTabs
                        selectedMealInformation={selectedMealInformation}
                        getSelectedPreference={getSelectedPreference}
                     />
                  </TabsWrapper>
                  <DateWrapper>
                     <SetDate selectedDate={selectedDate} onChangeDate={onChangeDate} />
                     <Image src='https://cdn.zeplin.io/5d0afc9102b7fa56760995cc/assets/90cfd3e2-22b8-44bc-be42-4d62a7a0a7c3.png' />
                  </DateWrapper>
               </TabsAndDateWrapper>
               <Footer>
                  <BackButtonWrapper>
                     <Button
                        backgroundColor={white}
                        color={darkBlueGrey}
                        width='100%'
                        onClick={onClickBackButton}
                     >
                        {strings.preferenceCard.back}
                     </Button>
                  </BackButtonWrapper>
                  <SaveButtonWrapper>
                     <Button width='100%' onClick={onSaveMealPreference}>
                        {strings.preferenceCard.save}
                     </Button>
                  </SaveButtonWrapper>
               </Footer>
            </Container>
         )
      }
      else {
         return null
      }
   }
}

export default withRouter(PreferenceCard)
