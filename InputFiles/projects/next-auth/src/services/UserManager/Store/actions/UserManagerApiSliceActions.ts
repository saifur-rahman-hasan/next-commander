export const newUserCreateApiDefinition = {
	query(params: any) {
		return {
			url: `/users`,
			method: 'POST',
			body: params,
		}
	},

	transformResponse(baseQueryReturnValue: any) {
		return baseQueryReturnValue.data
	},

	invalidatesTags: ['Users'],
}