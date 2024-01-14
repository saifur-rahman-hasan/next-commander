export function throwIf(condition: any, error: any) {
	if (condition) {
		throw new Error(error);
	}

	return false;
}
