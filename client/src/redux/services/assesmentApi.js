import {createApi,fetchBaseQuery} from "@reduxjs/toolkit/query/react";


export const apiSlice=createApi({
    reducerPath:"api",
    baseQuery:fetchBaseQuery({
        baseUrl:"http://localhost:3500",
    }),
    endpoints:(builder)=>({
        loginUser: builder.mutation({
            query: ({email,password}) => ({
                url: '/users/login',
                method: 'POST',
                body: {
                    email,
                    password
                }
            }),
        }),
        getStock: builder.query({ query: () => '/products/instock' })
        

        
    })

})



export const {
   useLoginUserMutation,
   useGetStockQuery
} = apiSlice