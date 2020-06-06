import React from 'react'
import { observable } from 'mobx'
import { observer } from 'mobx-react'
import 'semantic-ui-css/semantic.min.css'
import { Tab } from 'semantic-ui-react'
import { CounterApp } from '../../../Common/components/CounterApp'
import {
   Wrapper,
   ItemName,
   Category,
   Quantity,
   ItemNameCategory,
   ServingSizes,
   CounterWrapper,
   Container
} from './styledComponents'

const color = 'blue'
@observer
class MealTabs extends React.Component {
   @observable tabIndex = 0
   panes = []

   renderPreferenceDetails = mealInfo => {
      if (
         mealInfo.mealPreference === 'FullMeal' ||
         mealInfo.mealPreference === 'HalfMeal'
      ) {
         return this.renderFullOrHalfMealDetails(mealInfo)
      } else {
         return this.renderCustomDetails(mealInfo)
      }
   }
   renderFullOrHalfMealDetails = mealInfo => {
      return mealInfo.mealItems.map(item => {
         return (
            <Wrapper key={item.mealPreferenceId}>
               <ItemNameCategory>
                  <ItemName>{item.itemName}</ItemName>
                  <Category>{item.category}</Category>
               </ItemNameCategory>
               <Quantity>
                  {item.quantity}
                  {item.servingSizeUnit}
               </Quantity>
            </Wrapper>
         )
      })
   }

   renderCustomDetails = mealInfo => {
      return mealInfo.mealItems.map(item => {
         return (
            <Wrapper key={item.mealPreferenceId}>
               <ItemNameCategory>
                  <ItemName>{item.itemName}</ItemName>
                  <Category>{item.category}</Category>
               </ItemNameCategory>
               <Quantity>
                  <CounterWrapper>
                     <CounterApp
                        key={item.mealPreferenceId}
                        onChangeQuantity={item.onChangeQuantity}
                     />
                  </CounterWrapper>
                  <ServingSizes>{item.servingSizeUnit}</ServingSizes>
               </Quantity>
            </Wrapper>
         )
      })
   }

   renderTabs = () => {
      const { selectedMealInformation } = this.props
      this.panes = []
      selectedMealInformation.forEach(mealInfo => {
         let eachPreference = {
            menuItem: mealInfo.mealPreference,
            render: () => (
               <Tab.Pane attached={false}>
                  {this.renderPreferenceDetails(mealInfo)}
               </Tab.Pane>
            )
         }
         this.panes.push(eachPreference)
      })
   }

   onTabChange = (event, data) => {
      const { getSelectedPreference, selectedMealInformation } = this.props
      getSelectedPreference(
         selectedMealInformation[data.activeIndex].mealPreference
      )
   }

   render() {
      return (
         <Container>
            {this.renderTabs()}
            <Tab
               menu={{ color, pointing: false }}
               panes={this.panes}
               onTabChange={this.onTabChange}
            />
         </Container>
      )
   }
}

export default MealTabs
