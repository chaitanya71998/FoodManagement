export interface RequestObject{
    username:string,
    password:string
}

export interface AccessToken{
    access_token:string
}

export interface GetAuthResponse{
    accessToken:Array<AccessToken>
}