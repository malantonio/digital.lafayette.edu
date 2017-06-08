import Debug from 'debug'
import SessionStorage from './session-storage'
import * as sessionKeys from './session-keys'

const session = new SessionStorage({
  key: sessionKeys.SESSION,
  log: Debug('digital:session')
})

session.keys = sessionKeys

export default session
