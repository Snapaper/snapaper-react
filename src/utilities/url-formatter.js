export const formatSubjectNameURL = (input) => {
	// Convert the input string to lowercase
	let result = input.toLowerCase();

	// Remove special characters
	result = result.replace("amp;", "");

	// Replace spaces with hyphens
	result = result.replace(/\s+/g, "-");

	// Find content inside parentheses and replace spaces within them
	result = result.replace(
		/\(([^)]+)\)/g,
		(match, p1) => `(${p1.replace(/\s+/g, "-")})`
	);

	// Convert back "as" to "AS" in the right context
	result = result.replace(/as-level/g, "AS-level");
  result = result.replace(/a-level/g, "A-level");

	return result;
};
