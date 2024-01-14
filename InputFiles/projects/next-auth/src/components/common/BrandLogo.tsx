interface BrandLogoPropsInterface {
	className?: string
}

export default function BrandLogo({ className }: BrandLogoPropsInterface){
	return (
		<img
			className={className || "h-10 w-auto"}
			src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
			alt="Your Company"
		/>
	)
}