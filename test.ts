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
		const result = func(2);
		return result;
	} catch (e) {
		return e;
	}
};

const levelUp = () => {
	try {
		return wrapper();
	} catch (e) {
		return e;
	}
};
console.log(levelUp());
