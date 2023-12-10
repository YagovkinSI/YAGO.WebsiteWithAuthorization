import { localhostApi } from "../shared/localhostApi";

export interface AuthorizationState {
    data: AuthorizationData,
    isLoading: boolean,
    isChecked: boolean,
    error: string
}

export interface AuthorizationData {
    isAuthorized: boolean
    user: AuthorizationUser | undefined
}

export interface AuthorizationUser {
    id: string
    name: string
    registration: string
    lastActivity: string
}

const defaultAuthorizationData: AuthorizationData = {
    isAuthorized: false,
    user: undefined
}

export const defaultAuthorizationState: AuthorizationState = {
    data: defaultAuthorizationData,
    isLoading: false,
    isChecked: false,
    error: ''
}

const extendedApiSlice = localhostApi.injectEndpoints({
    endpoints: builder => ({

        getCurrentUser: builder.query<AuthorizationData, void>({
            query: () => `Authorization/getCurrentUser`,
            providesTags: ['Authorization'],
        }),
    })
})

export const { useGetCurrentUserQuery } = extendedApiSlice;

