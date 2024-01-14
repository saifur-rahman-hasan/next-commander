import {
	ChartBarSquareIcon,
	Cog6ToothIcon,
	FolderIcon,
	GlobeAltIcon, HomeIcon,
	SignalIcon,
	UserIcon
} from "@heroicons/react/24/outline";

const navigations = [
	{ name: 'Home', href: '/home', icon: HomeIcon, current: true },
	{ name: 'Dashboard', href: '/dashboard', icon: FolderIcon, current: true },
	{ name: 'Profile', href: '/profile', icon: UserIcon, current: false },
	{ name: 'Activity', href: '/profile', icon: SignalIcon, current: false },
	{ name: 'Domains', href: '#', icon: GlobeAltIcon, current: false },
	{ name: 'Usage', href: '#', icon: ChartBarSquareIcon, current: false },
	{ name: 'Settings', href: '#', icon: Cog6ToothIcon, current: false },
]


const statuses = {
	offline: 'text-gray-500 bg-gray-100/10',
	online: 'text-green-400 bg-green-400/10',
	error: 'text-rose-400 bg-rose-400/10',
}
const environments = {
	Preview: 'text-gray-400 bg-gray-400/10 ring-gray-400/20',
	Production: 'text-indigo-400 bg-indigo-400/10 ring-indigo-400/30',
}
const deployments = [
	{
		id: 1,
		href: '#',
		projectName: 'ios-app',
		teamName: 'Planetaria',
		status: 'offline',
		statusText: 'Initiated 1m 32s ago',
		description: 'Deploys from GitHub',
		environment: 'Preview',
	},
	// More deployments...
]
const activityItems = [
	{
		user: {
			name: 'Michael Foster',
			imageUrl:
				'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
		},
		projectName: 'ios-app',
		commit: '2d89f0c8',
		branch: 'main',
		date: '1h',
		dateTime: '2023-01-23T11:00',
	},
	// More items...
]

export {
	navigations,
	statuses,
	environments,
	deployments,
	activityItems
}