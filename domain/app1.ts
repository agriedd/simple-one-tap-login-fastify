import Fastify, { FastifyInstance, RouteShorthandOptions } from 'fastify'
import { Server, IncomingMessage, ServerResponse } from 'http'
import * as fs from 'fs'

const server: FastifyInstance = Fastify({})

const opts: RouteShorthandOptions = {
  schema: {
    response: {
      200: {
        type: 'object',
        properties: {
          pong: {
            type: 'string'
          }
        }
      }
    }
  }
}

server.get('/ping', opts, async (request, reply) => {
  
  const bufferIndexHtml = fs.readFileSync(__dirname + '/app1.html')
  reply.type('text/html').send(bufferIndexHtml)

  // return { pong: 'it worked!' }
})

const start = async () => {
  try {

    await server.listen({ port: 4000 })

    const address = server.server.address()
    const port = typeof address === 'string' ? address : address?.port

  } catch (err) {
    server.log.error(err)
    process.exit(1)
  }
}

start()