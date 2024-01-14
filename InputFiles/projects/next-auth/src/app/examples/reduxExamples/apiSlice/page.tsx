"use client"

import {useGetUsersQuery} from "@/services/UserManager/Store/UserManagerApiSlice";
import Dump from "@/components/utils/Dump";
import {useSession} from "next-auth/react";

export default function CounterPageView(){
	const { isLoading, isFetching, data, error } = useGetUsersQuery(null);
	const session = useSession()

	return (
		<main style={{ maxWidth: 1200, marginInline: "auto", padding: 20 }}>

			<Dump  data={{
				session,
				isLoading,
				isFetching,
				data,
				error
			}} />

			{/*{error ? (*/}
			{/*	<p>Oh no, there was an error</p>*/}
			{/*) : isLoading || isFetching ? (*/}
			{/*	<p>Loading...</p>*/}
			{/*) : data ? (*/}
			{/*	<div*/}
			{/*		style={{*/}
			{/*			display: "grid",*/}
			{/*			gridTemplateColumns: "1fr 1fr 1fr 1fr",*/}
			{/*			gap: 20,*/}
			{/*		}}*/}
			{/*	>*/}
			{/*		{data.map((user) => (*/}
			{/*			<div*/}
			{/*				key={user.id}*/}
			{/*				style={{ border: "1px solid #ccc", textAlign: "center" }}*/}
			{/*			>*/}
			{/*				<img*/}
			{/*					src={`https://robohash.org/${user.id}?set=set2&size=180x180`}*/}
			{/*					alt={user.name}*/}
			{/*					style={{ height: 180, width: 180 }}*/}
			{/*				/>*/}
			{/*				<h3>{user.name}</h3>*/}
			{/*			</div>*/}
			{/*		))}*/}
			{/*	</div>*/}
			{/*) : null}*/}
		</main>
	)
}