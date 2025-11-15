export type SignInRequest = {
    username: string
    password: string
}

export type SignInResponse = {
    token: string
}

export type SignUpRequest = {
    gender: string
    givenName: string
    familyName: string
    email: string
    plainPassword: string
}

export type SignUpResponse = {
    id: string
    gender: string
    givenName: string
    familyName: string
    email: string
}
