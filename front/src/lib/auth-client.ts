import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
  baseURL: "http://127.0.0.1:8787",
	fetchOptions: {
		credentials: "include",
		onError(e) {
			if (e.error.status === 429) {
				console.log("Too many requests");
			}
		},
	},
});

export const {
	signUp,
	signIn,
	signOut,
	useSession,
} = authClient;
