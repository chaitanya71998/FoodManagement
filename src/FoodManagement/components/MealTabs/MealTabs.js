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
   ServingSizes
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
                  <CounterApp
                     key={item.mealPreferenceId}
                     onChangeQuantity={item.onChangeQuantity}
                  />
                  <ServingSizes>{item.servingSizeUnit}</ServingSizes>
               </Quantity>
            </Wrapper>
         )
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
               <Tab>{selectedMealInformation[0].mealPreference}</Tab>
               <Tab>{selectedMealInformation[1].mealPreference}</Tab>
               <Tab>{selectedMealInformation[2].mealPreference}</Tab>
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
