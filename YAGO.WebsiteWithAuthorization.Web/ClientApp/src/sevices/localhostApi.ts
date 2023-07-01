// Необходимо использовать специфичную для React точку входа для импорта createApi
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

// Определите службу, используя базовый URL-адрес и ожидаемые конечные точки (endpoints)
export const localhostApi = createApi({
    reducerPath: 'localhostApi',
    baseQuery: fetchBaseQuery({ baseUrl: '' }),
    endpoints: () => ({})
});
