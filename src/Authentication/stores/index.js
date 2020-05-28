import { SignInStore } from './SignInStore'
import { SignInService } from '../services/SignInService'

const signInService = new SignInService()
const signInStore = new SignInStore(signInService)

export default {
   signInStore
}
