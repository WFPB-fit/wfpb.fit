const genderConstants = {
	male: 5,
	female: -161,
};

const activityScalars = {
	sedentary: 1.2,
	light: 1.375,
	moderate: 1.55,
	heavy: 1.725,
	vHeavy: 1.9
};

export default function calculateHarrisBenedict1990({
	gender,
	age,
	cm,
	kg,
	activityLevel
}) {
	console.log(gender, age, cm, kg, activityLevel)
	if (!gender || !age || !cm || !kg || !activityLevel) return 0;

	let bmr = 10 * kg + 6.25 * cm - 5 * age;

	if (!(gender in genderConstants)) throw `Gender "${gender}" not found`;
	else {
		bmr += genderConstants[gender];
	}

	if (!(activityLevel in activityScalars)) throw `Activity level "${activityLevel}" not found`;
	else {
		bmr *= activityScalars[activityLevel];
	}

	return bmr.toFixed(0);
}
