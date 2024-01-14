import {LoginForm} from "@/app/(website)/auth/login/form";
import BrandLogo from "@/components/common/BrandLogo";
import Link from "next/link";
import BackToHomeLink from "@/components/common/BackToHomeLink";

export default function SignInPage() {
	return (
		<>
			<div className="flex min-h-full flex-1 bg-white">

				<div className="relative hidden w-0 flex-1 lg:block">
					<img
						className="absolute inset-0 h-full w-full object-cover"
						src="https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&q=80&w=2874&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
						alt=""
					/>
				</div>

				<div className="flex flex-1 flex-col justify-center px-4 py-12 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
					<div className="mx-auto w-full max-w-sm lg:w-96">
						<div>
							<BrandLogo />

							<h2 className="mt-8 text-2xl font-bold leading-9 tracking-tight text-gray-900">
								Sign in to your account
							</h2>
							<p className="mt-2 text-sm leading-6 text-gray-500">
								Not a member?{' '}
								<Link
									href={`/auth/register`}
									className="font-semibold text-indigo-600 hover:text-indigo-500">
									Register your Account
								</Link>
							</p>
						</div>

						<div className="mt-10">
							<div>
								<LoginForm />
							</div>
						</div>

						<div className={`mt-10`}>
							<BackToHomeLink />
						</div>
					</div>
				</div>
			</div>
		</>
	)
}
