export const authorizationApiDefinition = {
  query(params: any) {
    return {
      url: `/authorization`,
      method: "POST",
      body: params,
    };
  },

  transformResponse(baseQueryReturnValue: any) {
    return baseQueryReturnValue.data;
  },

  invalidatesTags: ["Authorzation"],
};
