import { MealInfoStore } from './MealInfoStore'
import { MealInfoAPIService } from '../services/MealInfoAPIService'

const mealInfoAPIService = new MealInfoAPIService()
const mealInfoStore = new MealInfoStore(mealInfoAPIService)

export default {
   mealInfoStore
}
