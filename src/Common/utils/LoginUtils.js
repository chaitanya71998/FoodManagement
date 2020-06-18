import { getAccessToken } from './StorageUtils'
export function isLoginned() {
    if (getAccessToken() != undefined || getAccessToken() != null) {
        return true
    }
    else {
        return false
    }
}
