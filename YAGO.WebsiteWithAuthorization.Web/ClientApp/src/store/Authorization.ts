import { localhostApi } from "../services/localhostApi";

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

        login: builder.mutation<AuthorizationData, { userName: string, password: string }>({
            query: ({ userName, password }) => ({
                url: `Authorization/login`,
                method: 'POST',
                body: { userName, password },
            }),
            invalidatesTags: ['Authorization'],
        }),

        register: builder.mutation<AuthorizationData, { userName: string, password: string, passwordConfirm: string }>({
            query: ({ userName, password, passwordConfirm }) => ({
                url: `Authorization/register`,
                method: 'POST',
                body: { userName, password, passwordConfirm },
            }),
            invalidatesTags: ['Authorization'],
        }),

        logout: builder.mutation<AuthorizationData, void>({
            query: () => ({
                url: `Authorization/logout`,
                method: 'POST'
            }),
            invalidatesTags: ['Authorization'],
        }),

    })
})

export const { useGetCurrentUserQuery, useLoginMutation, useRegisterMutation, useLogoutMutation } = extendedApiSlice;

