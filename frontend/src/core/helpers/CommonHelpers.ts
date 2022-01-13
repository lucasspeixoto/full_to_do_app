interface Greeting {
	message: string;
	type: number;
}

export const getGreeting = (): Greeting => {
	const now = new Date();
	if (now.getHours() >= 0 && now.getHours() < 5)
		return {
			message: 'Hora de Dormir',
			type: 0,
		};
	else if (now.getHours() >= 5 && now.getHours() < 12)
		return {
			message: 'Bom dia',
			type: 1,
		};
	else if (now.getHours() >= 12 && now.getHours() < 18)
		return {
			message: 'Boa Tarde',
			type: 2,
		};
	else
		return {
			message: 'Boa Noite',
			type: 3,
		};
};
