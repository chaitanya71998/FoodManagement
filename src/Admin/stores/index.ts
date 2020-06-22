import { HeadCountStore } from './HeadCountStore'
import { MealInfoAPIService } from '../services/MealInfoAPIService'
const mealInfoAPIService = new MealInfoAPIService()
const headCountStore = new HeadCountStore(mealInfoAPIService)

export default {
   headCountStore
}
