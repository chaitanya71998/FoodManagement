import { AuthStore } from './AuthStore'
import { AuthServices } from '../services/AuthServices'

const authServices = new AuthServices()
const authStore = new AuthStore(authServices)

export default {
   authStore
}
