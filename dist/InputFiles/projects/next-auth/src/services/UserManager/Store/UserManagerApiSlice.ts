import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

type User = {
  id: number;
  name: string;
  email: number;
};

export const UserManagerApiSlice: any = createApi({
  reducerPath: "UserManagerApiSlice",
  refetchOnFocus: true,
  refetchOnReconnect: true,

  tagTypes: ["Users", "Authorzation", "Roles", "Permissions"],

  baseQuery: fetchBaseQuery({
    baseUrl: "/api/userManager",
  }),
  endpoints: (builder) => ({
    checkAuthUser: builder.query<User[], null>({
      query: () => "/checkAuth",
    }),

    getUsers: builder.query({
      query(params) {
        return {
          url: `/users`,
          method: "GET",
        };
      },

      providesTags: ["Users"],
    }),

    getUserById: builder.query({
      query: (params) => `/users/${params}`,
    }),

    createNewUser: builder.mutation({
      query(params) {
        return {
          url: `/users`,
          method: "POST",
          body: params,
        };
      },

      transformResponse(baseQueryReturnValue: any, meta, arg) {
        return baseQueryReturnValue.data;
      },

      invalidatesTags: ["Users"],
    }),

    updateUser: builder.mutation({
      query(params) {
        const { id } = params;

        return {
          url: `/users/${id}`,
          method: "PUT",
          body: params,
        };
      },

      transformResponse(baseQueryReturnValue: any, meta, arg) {
        return baseQueryReturnValue.data;
      },

      invalidatesTags: ["Users"],
    }),

    deleteUser: builder.mutation({
      query(params) {
        return {
          url: `/users/${params}`,
          method: "DELETE",
        };
      },

      transformResponse(baseQueryReturnValue: any, meta, arg) {
        return baseQueryReturnValue.data;
      },

      invalidatesTags: ["Users"],
    }),
  }),
});

export const {
  useGetUsersQuery,
  useGetUserByIdQuery,
  useCreateNewUserMutation,
  useUpdateUserMutation,
  useDeleteUserMutation,
} = UserManagerApiSlice;
