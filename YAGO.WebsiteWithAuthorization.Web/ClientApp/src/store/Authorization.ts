import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { AppDispatch, useAppSelector } from ".";
import { RequestType, requestService, RequestParams } from "../services/RequestService";

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

const request = requestService.createThunk('authorization');

export const authorizationSlice = createSlice({
    name: 'authorization',
    initialState: defaultAuthorizationState,
    reducers: {
        resetError(state) {
            state.error = ''
        }
    },
    extraReducers: {
        [request.fulfilled.type]: (state, action: PayloadAction<AuthorizationData>) => {
            state.data = action.payload
            state.isChecked = true,
                state.isLoading = false,
                state.error = ''
        },
        [request.pending.type]: (state) => {
            state.isChecked = true,
                state.isLoading = true,
                state.error = ''
        },
        [request.rejected.type]: (state, action: PayloadAction<string>) => {
            state.isChecked = true,
                state.isLoading = false,
                state.error = action.payload
        }
    }
});

const getCurrentUser = async (dispatch: AppDispatch) => {
    const state = useAppSelector(state => state.authorizationReducer);
    if (state.isChecked)
        return;

    const requestParams: RequestParams = {
        path: 'Authorization/getCurrentUser',
        type: RequestType.Get,
        data: {}
    }
    dispatch(request(requestParams));
}

const register = async (dispatch: AppDispatch,
    userName: string, password: string, passwordConfirm: string) => {

    const requestParams: RequestParams = {
        path: 'Authorization/register',
        type: RequestType.Post,
        data: { userName, password, passwordConfirm }
    }
    await dispatch(request(requestParams));
}

const login = async (dispatch: AppDispatch, userName: string, password: string) => {
    const requestParams: RequestParams = {
        path: 'Authorization/login',
        type: RequestType.Post,
        data: { userName, password }
    }
    await dispatch(request(requestParams));
}

const logout = async (dispatch: AppDispatch) => {
    const requestParams: RequestParams = {
        path: 'Authorization/logout',
        type: RequestType.Post,
        data: {}
    }
    await dispatch(request(requestParams));
}

export const authorizationActionCreators = { register, login, logout, getCurrentUser };
export const resetError = authorizationSlice.actions.resetError;

