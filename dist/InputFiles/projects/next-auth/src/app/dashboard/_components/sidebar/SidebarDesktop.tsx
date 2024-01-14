import classNames from "@/utils/classNames";
import {DashboardSidebarComponentProps} from "@/app/dashboard/_interfaces/DashboardSidebarInterface";
import BrandLogo from "@/components/common/BrandLogo";
import SidebarNavigationsList from "@/app/dashboard/_components/sidebar/SidebarNavigationsList";

export default function SidebarDesktop({ navigations, sidebarOpen, setSidebarOpen }: DashboardSidebarComponentProps) {
	return (
		<div className="hidden xl:fixed xl:inset-y-0 xl:z-50 xl:flex xl:w-72 xl:flex-col">
			{/* Sidebar component, swap this element with another sidebar if you like */}
			<div className="flex grow flex-col gap-y-5 overflow-y-auto bg-black/10 px-6 ring-1 ring-white/5">
				<div className="flex h-16 shrink-0 items-center">
					<BrandLogo className={`h-8 w-auto`} />
				</div>

				<SidebarNavigationsList navigations={navigations} />
			</div>
		</div>
	)
}