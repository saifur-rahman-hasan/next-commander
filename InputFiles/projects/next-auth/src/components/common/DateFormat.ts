export const formatDate = (dateString: string) => {
	const months = [
		"January",
		"February",
		"March",
		"April",
		"May",
		"June",
		"July",
		"August",
		"September",
		"October",
		"November",
		"December",
	];

	const days = [
		"Sunday",
		"Monday",
		"Tuesday",
		"Wednesday",
		"Thursday",
		"Friday",
		"Saturday",
	];

	const dateObject = new Date(dateString);
	const dayName = days[dateObject.getDay()];
	const monthName = months[dateObject.getMonth()];
	const day = dateObject.getDate();
	const year = dateObject.getFullYear();

	return `${dayName}, ${monthName} ${day < 10 ? "0" : ""}${day} ${year}`;
};
