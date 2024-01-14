// pages/api/register.ts

import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
import { v4 as uuidv4 } from 'uuid';

const prisma = new PrismaClient();

export default async (req: NextApiRequest, res: NextApiResponse) => {
	if (req.method !== 'POST') {
		return res.status(405).end(); // Method not allowed
	}

	try {
		const {
			name,
			email,
			domain,
			ip,
			dsid,
		} = req.body;

		// Generate a unique UUID
		const uuid = uuidv4();

		// Check if the service account already exists by searching for a matching UUID
		const existingServiceAccount = await prisma.serviceAccount.findUnique({
			where: {
				uuid, // Search by UUID instead of name
			},
		});

		if (existingServiceAccount) {
			return res.status(400).json({ message: 'Service account already exists' });
		}

		// Create a new service account with the generated UUID
		const createdServiceAccount = await prisma.serviceAccount.create({
			data: {
				name,
				email,
				domain,
				ip,
				dsid,
				uuid,
			},
		});

		return res.status(201).json(createdServiceAccount);
	} catch (error) {
		console.error('Error registering service account:', error);
		return res.status(500).json({ message: 'Internal server error' });
	} finally {
		await prisma.$disconnect();
	}
};
