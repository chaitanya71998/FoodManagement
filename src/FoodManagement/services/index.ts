import {
   MealPreferenceInfo,
   SelectedPreferenceInfo,
   MealInfoType,
   SelectedPreferenceAsCustomInfo,
   ReviewInfo,
   UpdateReviewInfo
} from '../stores/types'

interface MealInfoService {
   getMealInfoAPI: (date: string) => Promise<Array<MealInfoType>>
   getmealTypeInfoAPI: (
      date: string,
      mealType: string
   ) => Promise<Array<MealPreferenceInfo>>
   setSelectedPreference: (
      selectedPreferenceInfo: SelectedPreferenceInfo
   ) => Promise<{}>
   setSelectedPreferenceAsCustomMeal: (
      selectedPreferenceInfo: SelectedPreferenceAsCustomInfo
   ) => Promise<{}>
   getmealTypeReviewInfoAPI: (
      date: string,
      mealType: string
   ) => Promise<ReviewInfo>
   setReviewInfo: (reviewInfo: UpdateReviewInfo) => Promise<{}>
   setUserMealStatusAPI: (isEaten: string, id: number) => Promise<{}>
}

export default MealInfoService
