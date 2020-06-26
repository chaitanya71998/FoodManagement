import {RequestObject,GetAuthResponse} from '../stores/types'


interface AuthService{
    getUserSignInAPI:(requestObject:RequestObject)=>Promise<Array<GetAuthResponse>>
}

export default AuthService