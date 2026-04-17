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

  // UPDATE
  {
    method: 'PUT',
    path: /^\/tasks\/(?<id>[a-z0-9\-]+)$/,
    handler: async (req, res) => {
      const { id } = req.params

      const task = database.findById(id)

      if (!task) {
        return res.writeHead(404).end('Task não encontrada')
      }

      let body = ''
      for await (const chunk of req) {
        body += chunk
      }

      const { title, description } = JSON.parse(body)

      database.update(id, {
        title,
        description,
        updated_at: new Date()
      })

      return res.writeHead(204).end()
    }
  },

  // DELETE
  {
    method: 'DELETE',
    path: /^\/tasks\/(?<id>[a-z0-9\-]+)$/,
    handler: (req, res) => {
      const { id } = req.params

      const task = database.findById(id)

      if (!task) {
        return res.writeHead(404).end('Task não encontrada')
      }

      database.delete(id)

      return res.writeHead(204).end()
    }
  },

  // COMPLETE
  {
    method: 'PATCH',
    path: /^\/tasks\/(?<id>[a-z0-9\-]+)\/complete$/,
    handler: (req, res) => {
      const { id } = req.params

      const task = database.findById(id)

      if (!task) {
        return res.writeHead(404).end('Task não encontrada')
      }

      task.completed_at = task.completed_at ? null : new Date()
      task.updated_at = new Date()

      return res.writeHead(204).end()
    }
  }
]