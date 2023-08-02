import { lucia } from 'lucia';
import { prisma } from "@lucia-auth/adapter-prisma";
import { sveltekit } from 'lucia/middleware';
import { dev } from '$app/environment';
import { PrismaClient } from '@prisma/client'

const db = new PrismaClient()

export const auth = lucia({
	adapter: prisma(db, {
		user: 'user',
		session: 'session',
		key: 'key'
	}),
	middleware: sveltekit(),
	env: dev ? 'DEV' : 'PROD',
	getUserAttributes: (data) => {
		return {
			username: data.username
		};
	}
});

export type Auth = typeof auth;
