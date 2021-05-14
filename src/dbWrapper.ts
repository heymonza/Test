import { verbose } from 'sqlite3'

const sqlite3 = verbose()
const db = new sqlite3.Database('./dev.db')

export async function sqlGetAll (query: string): Promise<any[]> {
  return await new Promise((resolve, reject) => {
    db.all(query, (err, rows) => {
      console.log('rows', query, rows)
      if (err) { console.log(err); reject(err) }
      resolve(rows || [])
    })
  })
}

export async function sqlGet (query: string): Promise<any> {
  return await new Promise((resolve, reject) => {
    db.get(query, (err, row) => {
      if (err) { console.log(err); reject(err) }
      resolve(row)
    })
  })
}
