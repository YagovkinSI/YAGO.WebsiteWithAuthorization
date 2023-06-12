export interface RequestParams {
    path: string
}

interface Response<T> {
    data?: T,
    error?: string,
    success: boolean
}

const request = async (path: string): Promise<Response<any>> => {
    const data = await fetch(path)
        .then(response => response.json() as Promise<any>);
    return {
        data,
        success: true
    } as Response<any>;
}

export const requestService = { request };