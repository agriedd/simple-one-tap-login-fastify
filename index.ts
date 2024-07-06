import fastifyCookie from '@fastify/cookie'
import Fastify, { FastifyInstance, RouteShorthandOptions } from 'fastify'
import { Server, IncomingMessage, ServerResponse } from 'http'
import cors from '@fastify/cors'
import pug from 'pug'
import fastifyView from "@fastify/view"
import fastifyStatic from "@fastify/static"
import path = require('path')
import { readFileSync } from 'fs'

const server: FastifyInstance = Fastify({})
const cookie = fastifyCookie

server.register(fastifyStatic, {
	root: path.join(__dirname, 'public'),
	prefix: '/public/', // optional: default '/'
	// constraints: { host: 'example.com' } // optional: default {}
})
server.register(fastifyView, {
	engine: {
		pug: require("pug")
	}
})

const allowAccess = [
	"site001",
	"site002",
]
const origins = [
	'http://localhost:3000',
	'http://localhost:4000',
]

const opts: RouteShorthandOptions = {
	schema: {
		response: {
			200: {
				type: 'object',
				properties: {
					email: {
						type: 'string'
					},
				}
			}
		}
	}
}

server.register(fastifyCookie, {
	secret: "my-secret",
	parseOptions: {}
})

server.register(cors, {
	origin: origins
})

server.post('/login', opts, async (request, reply) => {

	const email = (request.body["email"] as string).trim()

	const loggedAccountsStr = request.cookies.loggedAccounts ?? "[]"
	const loggedAccounts = JSON.parse(loggedAccountsStr) as string[]

	// check if the email already in cookie
	const emailExists = loggedAccounts.find(e => e === email)

	if(!emailExists){
		
		// push email if doesn't exists

		loggedAccounts.push(email)

		const cookie = fastifyCookie.serialize('loggedAccounts', JSON.stringify(loggedAccounts), {
			maxAge: 60_000,
		})

		reply.header('Set-Cookie', cookie)
	}

	return { email: request.body["email"] }
})
server.get('/confirm', opts, async (request, reply) => {

	const ui = request.query["ui"] ?? 0

	const loggedAccountsStr = request.cookies.loggedAccounts ?? "[]"
	const loggedAccounts = JSON.parse(loggedAccountsStr) as string[]

	const callback = request.query["callback"] ?? ""

	const accounts: Account[] = loggedAccounts.map((e, i) => {
		return {
			id: i,
			email: e,
			name: e.split("@")[0]
		}
	})

	const account: Account = accounts[ui]

	return reply.view(`/domain/views/confirm.pug`, {
		account,
		callback
	})
})
server.get('/', async (request, reply) => {
	const bufferIndexHtml = readFileSync(__dirname + '/domain/index.html')
	reply.type('text/html').send(bufferIndexHtml)
})

server.get('/embed', async (request, reply) => {
	
	const loggedAccountsStr = request.cookies.loggedAccounts ?? "[]"
	const loggedAccounts = JSON.parse(loggedAccountsStr) as string[]

	const callback = request.query["callback"] ?? ""

	const accounts: Account[] = loggedAccounts.map((e, i) => {
		return {
			id: i,
			email: e,
			name: e.split("@")[0]
		}
	})

	return reply.view(`/domain/views/index.pug`, {
		accounts,
		callback
	})
})

const start = async () => {
	try {
		await server.listen({ port: 3000 })

		const address = server.server.address()
		const port = typeof address === 'string' ? address : address?.port

	} catch (err) {
		server.log.error(err)
		process.exit(1)
	}
}

start()