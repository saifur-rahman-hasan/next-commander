// types

import {
	businessProfileFormSchema,
	userProfileRegistrationFormSchema,
	userRegistrationFormSchema,
} from "@/schema/FormSchema";
import { VariantProps } from "class-variance-authority";
import React from "react";
import { z } from "zod";

type ImageArray = {
	file: {
		name: string;
		size: number;
		type: string;
	};
	url: string;
	base64: string;
};

type FileNameType = {
	file: {
		name: string;
	};
	base64?: string;
};

type Navigation = {
	name: string;
	href: string;
	icon?: any;
};

type PackageFeatureFormType = {
	name: string;
};

type PackageFormType = {
	name: string;
	price: string;
	description: string;
	packageFeatureIds: PackageFeatureFormType[];
	color: string;
	text_color: string;
	bottom_text: string;
};

type Options = {
	value: string;
	label: string;
};

// Path: components/Form/Dashboard/PackageForm/PackageForm.tsx

type PackageFeature = {
	id: string;
	name: string;
};

type PackageFormType = {
	name: string;
	price: string;
	description: string;
	packageFeatureIds: PackageFeatureFormType[];
	color: string;
	text_color: string;
	bottom_text: string;
};

// Path: components/Form/Dashboard/PackageForm/PackageUpdateForm.tsx

type PackageFeature = {
	id: string;
	name: string;
};

type PackageId = {
	name: string;
	description: string;
	price: string;
	packageFeatureIds: PackageFeature[];
	color: string;
	text_color: string;
	bottom_text: string;
};

// Path: (search)/(authorized)/role/page.tsx
// Path: (search)/(unauthorized)/register/page.tsx

type RegistrationLinksType = {
	linkHref: string;
	type: string;
	ribbon?: string;
	userType: string;
};

// Path: components/Common/ProfileFormField/ProfileFormField.tsx

type ProfileInputFieldProps = {
	label: string;
	name:
		| keyof z.infer<typeof userProfileRegistrationFormSchema>
		| keyof z.infer<typeof businessProfileFormSchema>;
	options?: Array<Options>;
	type?: string;
	register?: any;
	control?: any;
	errors: any;
	fieldType?: string;
	setError?: any;
	companyLogo?: string;
	setCompanyLogo?: any;
	atrisk?: boolean;
	onInput?: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

// Path: app/(search)/contact/page.tsx

type BannerProperty = {
	backgroundImageUrl: string;
};

// Path: components/EmailTemplates/UserEmailTemplates/ResetPasswordEmail.tsx

type ResetPasswordEmailProps = {
	userFirstname?: string;
	verificationLink?: string;
};

// Path: components/EmailTemplates/UserEmailTemplates/UserVerificationEmail.tsx

type UserVerificationEmailProps = {
	userFirstname?: string;
	verificationLink?: string;
};

// Path: components/Form/Dashboard/PackageForm/PackageForm.tsx
// Path: components/Listings/Dashboard/Package/PackageList.tsx

type PackageFeatureProps = {
	id?: string;
	name: string;
};

type PackageProps = {
	name: string;
	description: string;
	id: string;
	packageFeature: PackageFeatureProps[];
	price: string;
	color?: boolean;
	text_color?: boolean;
};

// Path: components/Listings/Dashboard/Package/PackageFeature/PackageFeatureList.tsx

type PackageFeature = {
	id: string;
	name: string;
};

// Path: components/Form/Dashboard/PackageForm/PackageFeatureForm/PackageFeatureForm.tsx

type PackageFeatureFormType = {
	name: string;
};

// Path: components/Form/PasswordForm/PasswordResetDoneForm.tsx

type PasswordResetDoneFormProps = {
	token: string;
};

// Path: components/Helpers/CustomToast.tsx

type CustomToastProps = {
	message: string;
	id: string;
};

// Path: components/Pages/Dashboard/DashboardContent.tsx

type HeroCardProps = {
	icon: string;
	title: string;
	value: string;
	bg_color: string;
};

type ChartCardProps = {
	title: string;
	subtitle: string;
	chartId: string;
	data: {
		label: string;
		name: string;
		value: number;
	}[];
};

// Path: components/Pages/Dashboard/DashboardMenu.tsx

type DashboardMenuProps = {
	setSidebarOpen: (arg0: boolean) => void;
	userNavigation: Navigation[];
};

// Path: components/Pages/Dashboard/DesktopSideBar.tsx

type DesktopSideBarProps = {
	navigation: Navigation[];
};

// Path: components/Pages/Dashboard/MobileSideBar.tsx

type MobileSideBarProps = {
	sidebarOpen: boolean;
	setSidebarOpen: (arg0: boolean) => void;
	navigation: Navigation[];
};

// Path: components/Pages/Home/Advertise.tsx

type AdvertiseItem = {
	source: string;
	alter: string;
	imageWidth: number;
	imageHeight: number;
};

// Path: components/ThemeBuilder/Banner/BusinessBanner.tsx
// Path: components/ThemeBuilder/Banner/UserBanner.tsx

type UserAndBusinessBannerProps = {
	name: string;
	register: any;
	errors: any;
	isSubmitting: boolean;
	handleTokenChange: (token: string | null) => void;
	resetToken: () => void;
};

// Path: components/ThemeBuilder/Footer/Footer.tsx

type SocialItem = {
	name: string;
	href: string;
	icon: (props: React.SVGProps<SVGSVGElement>) => ReactElement;
};

// Path: components/ThemeBuilder/Header/Header.tsx

type ImageItem = {
	path: string;
	imageWidth: number;
	imageHeight: number;
	hrefLink?: string;
};

// Path: components/ThemeBuilder/Header/MobileNavbar.tsx
// Path: components/ThemeBuilder/Header/Navbar.tsx

type NavbarProps = {
	menuNavigation: {
		main: Navigation[];
	};
	mobileMenu: boolean;
	toggleMobileMenu: () => void;
};

// Path: components/UI/Button.tsx

interface ButtonProps
	extends React.ButtonHTMLAttributes<HTMLButtonElement>,
		VariantProps<typeof buttonVariants> {
	asChild?: boolean;
}

// Path: components/UI/Input.tsx

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

// Path: components/UI/Textarea.tsx

interface TextareaProps
	extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

// Path: components/Common/PackageFormField/PackageFormField.tsx

type CommonPackageFormProps = {
	label: string;
	name: string;
	placeholder?: string;
	type?: string;
	errors: any;
	register?: any;
	control?: any;
};

// Path: components/Form/Dashboard/PackageFeatureForm/PackageFeatureForm.tsx

type Country = Options & {
	name: {
		common: string;
	};
};

// Path: components/Common/RegistrationFromField/FormField.tsx

type FormFieldProps = {
	label: string;
	name:
		| keyof z.infer<typeof userRegistrationFormSchema>
		| keyof z.infer<typeof businessProfileFormSchema>;
	placeholder?: string;
	options?: Array<Options>;
	type?: string;
	companyLogo?: string;
	setCompanyLogo?: any;
	control?: any;
	errors: any;
	setError?: any;
	clearErrors?: any;
	register?: any;
	atrisk?: boolean;
	fieldType?: string;
	onInput?: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

// Path: components/EmailTemplates/AdminEmailTemplates/AdminContactUsEmail.tsx

type contactedData = {
	name: string;
	email: string;
	phone_number: string;
	message: string;
	file: string | null;
};

type ContactUsEmailProps = {
	contactedData: contactedData;
};

// Path: components/Listings/Dashboard/UserManagement/UserManagementList.tsx

type BusinessUserPackageList = {
	name: string;
};

type BusinessProfileList = {
	phone_number: string;
	BusinessUserPackage: BusinessUserPackageList[];
};

type UserProfileList = {
	phone_number: string;
};

type UserList = {
	id: string;
	name: string;
	email: string;
	BusinessProfile: BusinessProfileList[];
	UserProfile: UserProfileList[];
	role: string;
	verified: boolean;
	created_at: string;
	updated_at: string;
};

// Path: components/UI/Select.tsx

type OptionProps = {
	name: string;
};

type OptionListProps = {
	title: string;
	key: number;
	value: string;
	index: number;
};

type SelectInputProps = {
	name: string;
};

// Path: components/Common/UserEditPopupFormField/EditFormField.tsx

type EditFormFieldProps = {
	label: string;
	name: string;
	fieldType?: string;
	control?: any;
	register?: any;
	setError?: any;
	clearErrors?: any;
	errors?: any;
};

// Path: components/Listings/Dashboard/UserManagement/UserManagementList.tsx

type FormData = {
	id: string;
	name: string;
	email: string;
	password: string;
	verificationStatus: string;
	role: string;
};

// Path: app/api/auth/users/[id]/route.ts

type BackendUserData = {
	verified: boolean;
	role: string;
	password?: string;
};
