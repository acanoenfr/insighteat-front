import { api } from "@/shared/api/http"

import type { SignInRequest, SignInResponse, SignUpRequest, SignUpResponse } from "./types"

export const signIn = (data: SignInRequest) =>
    api.post<SignInResponse>('/auth/sign_in', data)

export const signUp = (data: SignUpRequest) =>
    api.post<SignUpResponse>('/auth/sign_up', data)
