import React, { Component } from 'react'
import { observable } from 'mobx'
import { observer } from 'mobx-react'
import LoadingWrapperWithFailure from '../../../Common/components/LoadingWrapperWithFailure'
import NoDataView from '../../../Common/components/NoDataView'
import { SetDate } from '../../../Common/components/SetDate'
import { Header } from '../../common/components/Header'
import 'semantic-ui-css/semantic.min.css'
import { Tab } from 'semantic-ui-react'

import {
   Container,
   HeadCountWrapper,
   TabWrapper,
   DateWrapper,
   ItemsAndQuantityWrapper,
   Headings,
   Items,
   Quantity,
   ItemName,
   ItemQuantity,
   LoadingWrapper,
   ItemsWrapper,
   Measurement,
   ItemMeasurement,
   MealInfo,
   Meal,
   Count,
   CountInfoWrapper,
   Heading,
   HeaderWrapper,
   Summary,
   TotalHeadCount,
   CompletedMealHeadCount
} from './styeldComponents'
import strings from '../../i18n/strings.json'

const color = 'blue'

@observer
class HeadCountPage extends Component {
   constructor(props) {
      super(props)
      this.mealInfoTitle = ['Breakfast', 'Lunch', 'Dinner']
   }

   renderMealInfo = () => {
      const { selectedMealTypeheadCount } = this.props
      return (
         <ItemsAndQuantityWrapper>
            <Headings>
               <Items>{strings.headCountpage.items}</Items>
               <Quantity>{strings.headCountpage.quantity}</Quantity>
            </Headings>
            {this.renderItems()}
         </ItemsAndQuantityWrapper>
      )
   }
   renderItems = () => {
      const { selectedMealTypeheadCount } = this.props
      console.log(selectedMealTypeheadCount, 'count')
      return selectedMealTypeheadCount.items.map((item, index) => {
         return (
            <ItemsWrapper>
               <ItemName>{item.name}</ItemName>
               <ItemMeasurement>
                  <ItemQuantity>{item.quantity}</ItemQuantity>
                  <Measurement>{item.measuring_quantity}</Measurement>
               </ItemMeasurement>
            </ItemsWrapper>
         )
      })
   }

   onTabChange = (event, data) => {
      const { onChangeMealTypeTab } = this.props
      onChangeMealTypeTab(this.mealInfoTitle[data.activeIndex])
   }

   renderTabs = () => {
      this.panes = []
      this.mealInfoTitle.forEach(title => {
         let mealType = {
            menuItem: title,
            render: () => (
               <Tab.Pane attached={false}>{this.renderMealInfo()}</Tab.Pane>
            )
         }
         this.panes.push(mealType)
      })
   }

   renderMealHeadCountInfo = () => {
      const { onChangeDate, selectedDate } = this.props
      return (
         <Container>
            {this.renderTabs()}
            <HeadCountWrapper>
               <TabWrapper>
                  <Tab
                     menu={{ color, pointing: false }}
                     panes={this.panes}
                     onTabChange={this.onTabChange}
                  />
               </TabWrapper>
               <DateWrapper>
                  <SetDate
                     onChangeDate={onChangeDate}
                     selectedDate={selectedDate}
                  />
               </DateWrapper>
            </HeadCountWrapper>
            {this.renderHeadCountInfo()}
            {this.renderSummaryInfo()}
         </Container>
      )
   }

   renderSummaryInfo = () => {
      const { selectedMealTypeheadCount } = this.props
      return (
         <React.Fragment>
            <Summary>Summary</Summary>
            <TotalHeadCount>
               {selectedMealTypeheadCount.summary.total_meal_head_count}
            </TotalHeadCount>
            <CompletedMealHeadCount>
               {selectedMealTypeheadCount.summary.completed_meal_head_count}
            </CompletedMealHeadCount>
         </React.Fragment>
      )
   }

   renderHeadCountInfo = () => {
      return (
         <CountInfoWrapper>
            <Heading>HeadCount</Heading>
            {this.renderPreferenceBaseInfo()}
         </CountInfoWrapper>
      )
   }

   renderPreferenceBaseInfo = () => {
      const { selectedMealTypeheadCount } = this.props
      return (
         <React.Fragment>
            <MealInfo>
               <Meal>{strings.headCountpage.fullMealHeadCount}</Meal>
               <Count>
                  {selectedMealTypeheadCount.head_count.full_meal_head_count}
               </Count>
            </MealInfo>
            <MealInfo>
               <Meal>{strings.headCountpage.halfMealHeadCount}</Meal>
               <Count>
                  {selectedMealTypeheadCount.head_count.half_meal_head_count}
               </Count>
            </MealInfo>
            <MealInfo>
               <Meal>{strings.headCountpage.customMealHeadCount}</Meal>
               <Count>
                  {selectedMealTypeheadCount.head_count.custom_meal_head_count}
               </Count>
            </MealInfo>
            <MealInfo>
               <Meal>{strings.headCountpage.skipMealHeadCount}</Meal>
               <Count>
                  {selectedMealTypeheadCount.head_count.skipped_meal_head_count}
               </Count>
            </MealInfo>
         </React.Fragment>
      )
   }

   render() {
      const {
         headCountAPIError,
         headCountAPIStatus,
         onRetry,
         gotoHome,
         onClickSignOut
      } = this.props
      return (
         <LoadingWrapper>
            <HeaderWrapper>
               <Header gotoHome={gotoHome} onClickSignOut={onClickSignOut} />
            </HeaderWrapper>
            <LoadingWrapperWithFailure
               apiStatus={headCountAPIStatus}
               apiError={headCountAPIError}
               onRetryClick={onRetry}
               renderSuccessUI={this.renderMealHeadCountInfo}
            />
         </LoadingWrapper>
      )
   }
}

export { HeadCountPage }
