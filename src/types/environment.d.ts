declare global {
	namespace NodeJS {
		interface ProcessEnv {
			DOMAIN: string;
			JWT_SECRET: string;
			TEST_DB_URL: string;
		}
	}
}

export {};
