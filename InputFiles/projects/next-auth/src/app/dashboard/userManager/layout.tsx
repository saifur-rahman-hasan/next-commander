import RedirectIfNotAuthenticated from "@/app/(website)/auth/_components/RedirectIfNotAuthenticated";

export default function DashboardLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<RedirectIfNotAuthenticated>
			{<>{children}</>}
		</RedirectIfNotAuthenticated>
	);
}
