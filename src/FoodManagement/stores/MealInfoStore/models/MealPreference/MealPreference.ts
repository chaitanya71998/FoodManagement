import { observable, action } from 'mobx'
import { bindPromiseWithOnSuccess } from '@ib/mobx-promise'
import {
   API_INITIAL,
   API_FETCHING,
   API_SUCCESS,
   API_FAILED,APIStatus
} from '@ib/api-constants'

import { MealInfoAPIService } from "../../../../services/MealInfoAPIService"
import { ItemInfo } from '../ItemInfo'
import ArrayType from "@storybook/addon-knobs/dist/components/types/Array"
import MealInfoService from '../../../../services'
import { PreferenceMealItems,SelectedPreferenceAsCustomInfo } from '../../../types'

type PreferenceInfo={
   mealPreference:string,
   mealItems:Array<ItemInfo>
}

type Item={
   item_id: number,
   quantity:number,
   serving_size_unit:string

}
type SelectedPreferenceInfo={
   meal_type:string,
   meal_preference:string,
   date:string,
   meal_Items:Array<Item>
   
}

class MealPreference {
   @observable preferencesInfo:Array<PreferenceInfo> = []
   @observable selectedPreference!:string
   @observable selectedMealTypeInfoAPIStatus!:APIStatus
   @observable selectedMealTypeAPIInfoError!:null | Error
   @observable updatedPreferenceAPIStatus!:APIStatus
   @observable updatedPreferenceAPIError!:null | Error
   @observable updatedCustomMealAPIStatus!:APIStatus
   @observable updatedCustomMealAPIError!:null | Error
   @observable mealType:string
   @observable isLoadingOnSave:boolean = false
   @observable isLoadingOnSkipped:boolean = false
   mealInfoAPIService:MealInfoService
   selectedDate:string
   constructor(mealInfoAPIService:MealInfoService, selectedDate:string, mealType:string) {
      this.mealInfoAPIService = mealInfoAPIService
      this.selectedDate = selectedDate
      this.mealType = mealType
      this.init()
   }

   init() {
      this.selectedMealTypeInfoAPIStatus = API_INITIAL
      this.selectedMealTypeAPIInfoError = null
      this.updatedPreferenceAPIStatus = API_INITIAL
      this.updatedPreferenceAPIError = null
      this.updatedCustomMealAPIStatus = API_INITIAL
      this.updatedCustomMealAPIError = null
      this.selectedPreference = 'FullMeal'
   }

   @action.bound
   getSelectedMealTypeInfo() {
      this.clearPreferencesInfo()
      const mealTypeInfoAPI = this.mealInfoAPIService.getmealTypeInfoAPI(
         this.selectedDate,
         this.mealType
      )
      return bindPromiseWithOnSuccess(mealTypeInfoAPI)
         .to(
            this.setSelectedMealTypeInfoAPIStatus,
            this.setSelectedMealTypeInfoAPIResponse
         )
         .catch(this.setSelectedMealTypeAPIInfoError)
   }

   @action.bound
   onChangeDateInPreferenceCard(date) {
      this.selectedDate = date
      this.getSelectedMealTypeInfo()
   }

   @action.bound
   setSelectedMealTypeInfoAPIStatus(status:APIStatus) {
      this.selectedMealTypeInfoAPIStatus = status
   }

   @action.bound
   setSelectedMealTypeAPIInfoError(error:Error) {
      this.selectedMealTypeAPIInfoError = error
   }

   @action.bound
   setSelectedMealTypeInfoAPIResponse(response) {
      this.clearPreferencesInfo()
      response.map(preference => {
         let mealItems:Array<ItemInfo> = []
         preference.meal_items.map(item => {
            const itemInfo = new ItemInfo(item)
            mealItems.push(itemInfo)
         })
         const preferenceInfo:PreferenceInfo= {
            mealPreference: preference.meal_preference,
            mealItems: [...mealItems]
         }
         this.preferencesInfo.push(preferenceInfo)
      })
   }

   @action.bound
   getSelectedPreference(preference) {
      this.selectedPreference = preference
   }

   @action.bound
   onSaveMealPreference(onSuccess, onFailure, button) {
      let mealItemsInfo:Array<ItemInfo> = []
      this.preferencesInfo.forEach(preference => {
         if (preference.mealPreference === 'Custom') {
            mealItemsInfo = [...preference.mealItems]
         }
      })

      if (
         this.selectedPreference === 'FullMeal' ||
         this.selectedPreference === 'HalfMeal' ||
         this.selectedPreference === 'Skipped'
      ) {
         let selectedPreferenceInfo={
           meal_type: this.mealType,
         meal_preference:this.selectedPreference,
         date: this.selectedDate
         }
         this.setSelectedPreference(
            selectedPreferenceInfo,
            onSuccess,
            onFailure,
            button
         )
      } else {
         let selectedPreferenceAsCustomInfo:SelectedPreferenceAsCustomInfo={
            meal_type : this.mealType,
            meal_items:[],
            date:this.selectedDate

         }
         
         mealItemsInfo.forEach(itemInfo => {
            let item:Item = {
               item_id: itemInfo.mealItemId,
               quantity: itemInfo.quantity,
               serving_size_unit: itemInfo.servingSizeUnit
            }
            selectedPreferenceAsCustomInfo.meal_items.push(item)
         })
         this.setSelectedPreferenceAsCustomMeal(
            selectedPreferenceAsCustomInfo,
            onSuccess,
            onFailure,
            button
         )
      }
   }

   @action.bound
   onClickSkipButton(onSuccess, onFailure, button) {
      this.selectedPreference = 'Skipped'
      this.onSaveMealPreference(onSuccess, onFailure, button)
   }

   @action.bound
   setSelectedPreference(selectedPreferenceInfo, onSuccess, onFailure, button) {
      const setSelectedPreference = this.mealInfoAPIService.setSelectedPreference(
         selectedPreferenceInfo
      )
      return bindPromiseWithOnSuccess(setSelectedPreference)
         .to(
            status => {
               this.setUpdatedPreferenceAPIStatus(status)
               if (status === API_FETCHING) {
                  if (button === 'Skipped') {
                     this.isLoadingOnSkipped = true
                  } else {
                     this.isLoadingOnSave = true
                  }
               }
            },
            () => {
               this.setUpdatedPreferenceAPIResponse()
               onSuccess()
            }
         )
         .catch(error => {
            this.setUpdatedPreferenceAPIError(error)
            onFailure()
         })
   }

   @action.bound
   setUpdatedPreferenceAPIStatus(status) {
      this.updatedPreferenceAPIStatus = status
   }

   @action.bound
   setUpdatedPreferenceAPIResponse() {
      this.isLoadingOnSave = false
      this.isLoadingOnSkipped = false
   }

   @action.bound
   setUpdatedPreferenceAPIError(error) {
      this.updatedPreferenceAPIError = error
      this.isLoadingOnSave = false
      this.isLoadingOnSkipped = false
   }

   @action.bound
   setSelectedPreferenceAsCustomMeal(
      selectedPreferenceInfo,
      onSuccess,
      onFailure,
      button
   ) {
      const setSelectedPreference = this.mealInfoAPIService.setSelectedPreferenceAsCustomMeal(
         selectedPreferenceInfo
      )
      return bindPromiseWithOnSuccess(setSelectedPreference)
         .to(
            status => {
               this.setUpdatedCustomMealAPIStatus(status)
               if (status === API_FETCHING) {
                  if (button === 'Skipped') {
                     this.isLoadingOnSkipped = true
                  } else {
                     this.isLoadingOnSave = true
                  }
               }
            },
            ()=> {
               this.setUpdatedCustomMealAPIResponse()
               onSuccess()
            }
         )
         .catch(error => {
            this.setUpdatedCustomMealAPIError(error)
            onFailure()
         })
   }

   @action.bound
   setUpdatedCustomMealAPIStatus(status) {
      this.updatedCustomMealAPIStatus = status
   }

   @action.bound
   setUpdatedCustomMealAPIResponse() {
      this.isLoadingOnSave = false
      this.isLoadingOnSkipped = false
   }

   @action.bound
   setUpdatedCustomMealAPIError(error) {
      this.updatedCustomMealAPIError = error
      this.isLoadingOnSave = false
      this.isLoadingOnSkipped = false
   }

   @action.bound
   clearPreferencesInfo() {
      this.preferencesInfo = []
   }

   @action.bound
   clearMealPreferenceInfoModel() {
      this.init()
   }
}
export { MealPreference }
