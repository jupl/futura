import micro from 'micro'
import * as next from 'next'
import {createHandler} from './app/handler'

const app = next({
  dev: process.env.NODE_ENV !== 'production',
  dir: __dirname,
})
let prepare: Promise<void> | undefined
const handler = setupHandler()

export default handler // tslint:disable-line:no-default-export

// Start server automatically in development
if(process.env.NODE_ENV !== 'production') {
  startServer() // tslint:disable-line:no-floating-promises
}

async function setupHandler() {
  if(prepare === undefined) {
    prepare = app.prepare()
  }
  await prepare
  return createHandler(app)
}

async function startServer() {
  const DEFAULT_PORT = 3000
  let port = parseInt(process.env.NODE_ENV!, 10)
  port = !isNaN(port) ? port : DEFAULT_PORT
  const server = micro(await handler)
  server.listen(port, () => console.log(`Server started on port ${port}`))
}
