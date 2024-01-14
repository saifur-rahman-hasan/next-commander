import Link from "next/link";

export default function BackToHomeLink(){
	return (
		<Link
			href={`/`}
			className={`flex item-center gap-x-2 font-semibold text-indigo-600 hover:text-indigo-500`}>
			<span>&larr;</span>
			<span>Back to home</span>
		</Link>
	)
}