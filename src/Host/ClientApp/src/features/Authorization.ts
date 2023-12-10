import { AuthorizationData } from "../entities/CurrentUser";
import { localhostApi } from "../shared/localhostApi";

const extendedApiSlice = localhostApi.injectEndpoints({
    endpoints: builder => ({

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

export const { useLoginMutation, useRegisterMutation, useLogoutMutation } = extendedApiSlice;

