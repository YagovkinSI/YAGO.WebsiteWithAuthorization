import axios, { AxiosError } from "axios";
import { AxiosResponse } from "axios";

export interface RequestParams {
    path: string,
    type: RequestType,
    data?: any
}

export enum RequestType {
    Get, Post
}

interface Response<T> {
    data?: T,
    error?: string,
    success: boolean
}

const axiosRequest = async (requestParams: RequestParams)
    : Promise<AxiosResponse> => {
    switch (requestParams.type) {
        case RequestType.Get:
            return await axios.get(requestParams.path, requestParams.data);
        case RequestType.Post:
            return await axios.post(requestParams.path, requestParams.data);
    }
}

const request = async <T>(requestParams: RequestParams)
    : Promise<Response<T>> => {
    try {
        const response = await axiosRequest(requestParams)
        if (!response.data)
            response.data = undefined;
        return {
            data: response.data,
            error: undefined,
            success: true
        } as Response<T>
    } catch (error) {
        const errorMessage = getErrorMessage(error as AxiosError);
        return {
            data: undefined,
            error: errorMessage,
            success: false
        } as Response<T>
    }
}

const getErrorMessage = (error: AxiosError): string => {
    if (error == undefined)
        return 'Произошла неизвестная ошибка';

    if (error.response == undefined)
        return error.message;

    const dataAsString = error.response.data as string;
    return dataAsString == undefined
        ? error.message
        : dataAsString;
}

export const requestService = { request };