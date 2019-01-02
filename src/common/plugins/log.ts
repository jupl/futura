import plugin from 'good'
import {ServerRegisterPluginObject as Plugin} from 'hapi'

const FILE_LOG_OPTIONS = {interval: '1d', size: '1M', path: './logs'}
const SQUEEZE_MODULE = 'good-squeeze'
const CONSOLE_BASE = [
  {
    args: [{error: '*', log: '*', request: '*', response: '*'}],
    module: SQUEEZE_MODULE,
    name: 'Squeeze',
  },
  {
    args: [{
      color: process.env.NODE_ENV !== 'production',
      format: 'YYYY-MM-DDTHH:mm:ss.SSS',
    }],
    module: 'good-console',
  },
]

/**
 * Construct log plugin
 * @return Hapi plugin
 */
export const createPlugin = (): Plugin<{}> => {
  let options = {ops: {interval: 60000}, reporters: {}}
  if(process.env.NODE_ENV === 'production') {
    options = {
      ...options,
      reporters: {
        ...options.reporters,
        log: [
          ...CONSOLE_BASE,
          {
            args: ['log.txt', FILE_LOG_OPTIONS],
            module: 'rotating-file-stream',
          },
        ],
        ops: [
          {
            args: [{ops: '*'}],
            module: SQUEEZE_MODULE,
            name: 'Squeeze',
          },
          {
            module: SQUEEZE_MODULE,
            name: 'SafeJson',
          },
          {
            args: ['ops.json', FILE_LOG_OPTIONS],
            module: 'rotating-file-stream',
          },
        ],
      },
    }
  }
  else {
    options = {
      ...options,
      reporters: {...options.reporters, log: [...CONSOLE_BASE, 'stdout']},
    }
  }
  return {options, plugin}
}
