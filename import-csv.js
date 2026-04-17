import fs from 'fs'
import { parse } from 'csv-parse'

const stream = fs.createReadStream('./tasks.csv')

const csvParse = parse({
  delimiter: ',',
  skip_empty_lines: true,
  from_line: 2
})

async function run() {
  const lines = stream.pipe(csvParse)

  for await (const line of lines) {
    const [title, description] = line

    await fetch('http://localhost:3333/tasks', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, description })
    })
  }
}

run()