export default function titleize(string) {
	let arr = string.split(' ');
	arr = arr.map(capitalize);
	return arr.join(' ');
}
function capitalize(string) {
	return string.charAt(0).toUpperCase() + string.slice(1);
}
