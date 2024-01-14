import PageHeading from "@/components/common/PageHeading";
import DashboardRootLayout from "@/components/ApplicationUI/DashboardRootLayout";

export default function AdminDashboardView(){
	return (
		<DashboardRootLayout>
			<div>
				<div className={'p-6 sticky top-0 backdrop-blur'}>
					<PageHeading title={'Admin Dashboard'} />
				</div>
			</div>
		</DashboardRootLayout>
	)
}