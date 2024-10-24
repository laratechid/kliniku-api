export interface GoogleAuthCallback {
    code: string,
    scope: string,
    authuser: string,
    prompt: string,
}

export interface GoogleAuthUserInfo {
    id: string,
    email: string,
    verified_email: string,
    name: string,
    given_name: string,
    family_name: string,
    picture: string
}