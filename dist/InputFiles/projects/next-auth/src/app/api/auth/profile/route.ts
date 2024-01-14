import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { UserType } from "@prisma/client";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (request: NextRequest, response: NextResponse) => {
	const data = await request.json();
	const session = await getServerSession(authOptions);
	const userId = session?.user?.id;
	try {
		const getUserProfile = await prisma.userProfile.findUnique({
			where: {
				userId: userId as string,
			},
		});
		if (getUserProfile) {
			await prisma.userProfile.update({
				where: {
					userId: userId as string,
				},
				data: {
					first_name: data.first_name,
					last_name: data.last_name,
					userType: UserType.INDIVIDUAL,
				},
			});
			prisma.$disconnect();
		} else {
			await prisma.userProfile.create({
				data: {
					userId: userId as string,
					first_name: data.first_name,
					last_name: data.last_name,
					userType: UserType.INDIVIDUAL,
				},
			});
			prisma.$disconnect();
		}
	} catch (error) {
		console.log(error);
	}
	return NextResponse.json({ message: "Data received", data }, { status: 200 });
};

export const GET = async (request: NextRequest, response: NextResponse) => {
	const session = await getServerSession(authOptions);
	const userId = session?.user?.id;
	const userProfile = await prisma.user.findFirst({
		where: {
			id: userId,
		},
		include: {
			userProfile: true,
			address: true,
			securityAnswer: {
				include: {
					question: true,
				},
			},
		},
	});
	const appendData = {
		title: userProfile?.userProfile[0]?.title,
		first_name: userProfile?.userProfile[0]?.first_name,
		last_name: userProfile?.userProfile[0]?.last_name,
		address_1: userProfile?.address[0]?.address_1,
		address_2: userProfile?.address[0]?.address_2,
		town_city: userProfile?.address[0]?.town_city,
		county: userProfile?.address[0]?.county,
		country: userProfile?.address[0]?.country,
		postcode: userProfile?.address[0]?.postcode,
		dob: userProfile?.userProfile[0]?.dob,
		phone_number: userProfile?.userProfile[0]?.phone_number,
		security_question: userProfile?.securityAnswer[0]?.question?.id,
		security_answer: userProfile?.securityAnswer[0]?.answer,
	};
	prisma.$disconnect();
	if (!userProfile) {
		return NextResponse.json({ message: "No data found" }, { status: 404 });
	} else {
		return NextResponse.json(
			{ message: "Data fetched", appendData },
			{ status: 200 }
		);
	}
};
