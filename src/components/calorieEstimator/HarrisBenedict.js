const genderConst = {
	male: 5,
	female: -161,
};

const activityScalars = {
    sedentary: 1.2,
    light:1.375,
    moderate:1.55,
    heavy:1.725,
    vHeavy:1.9
};

export default function calculateHarrisBenedict1990(gender = 'male', age = 21, cm = 180, kg = 90, activityLevel = 'sedentary') {
	let bmr = 10 * kg + 6.25 * cm - 5 * age;

	if (!(gender in genderConst)) throw `Gender "${gender}" not found`;
	else {
		bmr += genderConst[gender];
	}

	if (!(activityLevel in activityScalars)) throw `Activity level "${activityLevel}" not found`;
	else {
		bmr *= genderConst[gender];
    }

    return bmr;
}
