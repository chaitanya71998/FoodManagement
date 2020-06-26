export interface MealItems {
   meal_item_id: number
   item_name: string
}

export interface MealInfoType {
   meal_id: number
   meal_type: string
   meal_items: Array<MealItems>
   meal_preference: string
   meal_preference_deadline: string
   meal_starttime: string
   meal_endtime: string
   is_eaten: boolean
}

export interface PreferenceMealItems {
   meal_item_id: number
   item_name: string
   serving_size_unit: string
   category: string
   quantity: number
}

export interface MealPreferenceInfo {
   meal_preference: string
   meal_items: Array<PreferenceMealItems>
}

export interface ReviewItems {
   meal_item_id: number
   item_name: string
   quality: number
   taste: number
}

export interface ReviewInfo {
   meal_id: number
   meal_review: string
   meal_items: Array<ReviewItems>
}

export interface SelectedPreferenceItems {
   item_id: number
   quantity: number
   serving_size_unit: string
}

export interface SelectedPreferenceInfo {
   meal_type: string
   meal_preference: string
   date: string
}

export interface SelectedPreferenceAsCustomInfo {
   meal_type: string
   meal_items: Array<SelectedPreferenceItems>
   date: string
}

export interface UpdateReviewItemInfo {
   meal_item_id: number
   quality: number
   taste: number
}

export interface UpdateReviewInfo {
   meal_id: number
   meal_review: string
   meal_items_rating: Array<UpdateReviewItemInfo>
}
