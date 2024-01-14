// hooks/useAuth.ts
import { useEffect, useState } from "react";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import useSWR from "swr";
import axios from "@/lib/axios";
import useAuth from "@/hooks/useAuth";
import {useDispatch} from "react-redux";
import {setAuthUserData, UserManagerSliceDataInterface} from "@/services/UserManager/Store/UserManagerSlice";
import {useAppSelector} from "@/app/Redux/ReduxStoreHooks";

// interface UseAuthReturn {
// 	user: any;
// }

const useUserManagerStore = () => {
	const {user: authUser} = useAuth()

	const dispatch = useDispatch()
	const userManagerSliceData: UserManagerSliceDataInterface = useAppSelector((state: any) => state.userManagerSlice)

	useEffect(() => {
		if(authUser?.id){
			dispatch(setAuthUserData({
				authUser: authUser
			}))
		}
	}, [authUser])

	useEffect(() => {
		console.log(`userManagerSliceData`)
		console.log(userManagerSliceData)
	}, [userManagerSliceData])

	// console.log(`userManagerSliceData`, userManagerSliceData)

	const isAdmin = userManagerSliceData.authorization.roles.includes('ADMIN_USER')
	const isIndividualUser = userManagerSliceData.authorization.roles.includes('USER')
	const isBusinessUser = userManagerSliceData.authorization.roles.includes('BUSINESS_USER')

	return { userManagerSliceData, isAdmin };
};

export default useUserManagerStore;
