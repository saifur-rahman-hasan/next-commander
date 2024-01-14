import RedirectIfNotAuthenticated from "@/app/(website)/auth/_components/RedirectIfNotAuthenticated";

export default function DashboardLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const isAdminUser = true;
	const isBusinessUser = false;
	const isUser = false;

	return (
		<RedirectIfNotAuthenticated>
			{isAdminUser && <>{children}</>}
		</RedirectIfNotAuthenticated>
	);
}
