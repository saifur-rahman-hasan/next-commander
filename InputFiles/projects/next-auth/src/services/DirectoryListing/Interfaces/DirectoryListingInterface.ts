export interface DirectoryListingCreateInterface {
	title: string;
	description: string;
	// category: string;
	// location: Location;
	// attributes: Attributes;
	// contact: Contact;
	// social_media: SocialMedia;
	// schedule: Schedule;
	// pricing: Pricing;
	// images: string[];
	// videos: string[];
	// tags: string[];
	// additional_details: Record<string, unknown>; // flexible for any set of properties
	// status: string;
	createdAt?: Date; // or Date if you're handling date objects
	updatedAt?: Date; // or Date if you're handling date objects
}

export interface DirectoryListingReadInterface extends  DirectoryListingCreateInterface {
	_id: string,
	createdAt: Date,
	updatedAt: Date,
	deletedAt?: Date
}

export interface DirectoryListingUpdateInterface {
	title?: string;
	description?: string;
	status?: string;
	updatedAt?: Date
}



interface Location {
	country?: string,
	county?: string;
	city?: string;
	postalCode?: string;
	address: string;
	geo: {
		lat: number;
		lon: number;
	};
}

interface Attributes {
	service?: string;
	star_rating?: number;
	banner?: string;
	about_info?: string;
}

interface Contact {
	email: string;
	phone_number: string;
}

interface SocialMedia {
	facebook?: string;
	twitter?: string;
	instagram?: string;
}

interface OperatingHours {
	day: string;
	open: string;
	close: string;
}

interface Schedule {
	start_date: string; // or Date if you're handling date objects
	end_date: string; // or Date if you're handling date objects
	operating_hours: OperatingHours[];
}

interface Pricing {
	price: number;
	currency: string;
	pricing_model: string;
}
