import React from 'react'
import { observable } from 'mobx'
import { observer } from 'mobx-react'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs'
import 'react-tabs/style/react-tabs.css'
import { CounterApp } from '../../../common/components/CounterApp'
import {
   Wrapper,
   ItemName,
   Category,
   Quantity,
   ItemNameCategory,
   ServingSizes,
   CounterWrapper
}
from './styledComponents'

@observer
class MealTabs extends React.Component {
   @observable tabIndex = 0

   renderPreferenceDetails = mealPreference => {
      return mealPreference.mealItems.map(item => {
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

   renderCustomDetails = mealPreference => {
      return mealPreference.mealItems.map(item => {
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
      return selectedMealInformation.map(mealInfo => {
         return <Tab style={{color:"rgba(0, 0, 0, 0.55)"}}>{mealInfo.mealPreference}</Tab>
      })
   }


   render() {
      const { selectedMealInformation, getSelectedPreference } = this.props
      return (
         <Tabs
            selectedIndex={this.tabIndex}
            onSelect={tabIndex => {
               this.tabIndex = tabIndex
               getSelectedPreference(
                  selectedMealInformation[this.tabIndex].mealPreference
               )
            }}
         >
            <TabList>
            {this.renderTabs()}
            </TabList>

            <TabPanel>
               {this.renderPreferenceDetails(selectedMealInformation[0])}
            </TabPanel>
            <TabPanel>
               {this.renderPreferenceDetails(selectedMealInformation[1])}
            </TabPanel>
            <TabPanel>
               {this.renderCustomDetails(selectedMealInformation[2])}
            </TabPanel>
         </Tabs>
      )
   }
}

export default MealTabs
