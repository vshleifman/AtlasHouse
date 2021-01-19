class MyError extends Error {
	constructor(msg?: string) {
		super(msg || 'hi');
	}
}

const test1 = new MyError();

const func = (a: number) => {
	if (a === 1) {
		return 'ok';
	} else {
		throw test1;
	}
};

const wrapper = () => {
	try {
		// const result = func(2);
		// return result;
		throw new Error('baranka');
	} catch (e: unknown) {
		return e as Error;
	}
};

const levelUp = () => {
	throw new Error('banak');
	// try {
	// 	console.log(wrapper());
	// } catch (e) {
	// 	console.log('caught');
	// }
};
console.log(levelUp());
throw new Error('13');
