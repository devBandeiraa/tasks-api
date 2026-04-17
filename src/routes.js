import { randomUUID } from 'node:crypto'
import { Database } from './database.js'

const database = new Database()

export const routes = [
  // CREATE
  {
    method: 'POST',
    path: /^\/tasks$/,
    handler: async (req, res) => {
      let body = ''

      for await (const chunk of req) {
        body += chunk
      }

      const { title, description } = JSON.parse(body)

      if (!title || !description) {
        return res.writeHead(400).end('Title e Description são obrigatórios')
      }

      const task = {
        id: randomUUID(),
        title,
        description,
        completed_at: null,
        created_at: new Date(),
        updated_at: new Date()
      }

      database.insert(task)

      return res.writeHead(201).end()
    }
  },

  // LIST + FILTER
  {
    method: 'GET',
    path: /^\/tasks(\?search=(?<query>.*))?$/,
    handler: (req, res) => {
      const tasks = database.select(req.query)

      return res
        .writeHead(200, { 'Content-Type': 'application/json' })
        .end(JSON.stringify(tasks))
    }
  },
]