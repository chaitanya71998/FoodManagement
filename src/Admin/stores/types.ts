export interface Items{
    name:string,
   category:string,
   quantity:number,
   measuring_quantity:string
}

export interface HeadCount{
    full_meal_head_count:number,
   half_meal_head_count:number,
   custom_meal_head_count:number,
   skipped_meal_head_count:number
}

export interface Summary{
    total_meal_head_count:number,
   completed_meal_head_count:number
}

export interface SelectedMealTypeheadCount{
    items:Array<Items>,
   head_count:HeadCount,
   summary:Summary
}