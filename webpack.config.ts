import {createConfiguration} from 'wcb'

let configuration = createConfiguration({
  atlOptions: {configFileName: 'tsconfig.server.json'},
  environment: 'production',
  log: message => console.log(message),
  pattern: ['index.ts'],
  target: 'node',
})
configuration = {
  ...configuration,
  output: {
    ...configuration.output,
    libraryTarget: 'commonjs',
  },
}

export default configuration // tslint:disable-line:no-default-export
