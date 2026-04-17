import http from 'node:http'
import { routes } from './routes.js'

const server = http.createServer(async (req, res) => {
    const route = routes.find(route => {
        return route.method === req.method && route.path.test(req.url)
    })

    if (route){
        const routeParams = req.url.match(route.path)

        const { query, ...params } = routeParams?.groups ?? {}

        req.params = params
        req.query = query

        await route.handler(req, res)
        return
    }

    return res.writeHead(404).end('Not Found')
})

server.listen(3333)