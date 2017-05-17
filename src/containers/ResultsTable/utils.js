import fields from '../../../config/work-fields.json'
import { session } from '../../utils'

const keys = Object.keys(fields)

const workFieldSortDict = keys.reduce((dict, key, index) => {
  dict[key] = index + 1
  return dict
}, {})

const sortByField = (a, b) => (
  workFieldSortDict[a] - workFieldSortDict[b]
)

const SESSION_KEY = 'result-table-fields'
const getSessionFields = () => session.get(SESSION_KEY)
const setSessionFields = fields => session.set(SESSION_KEY, fields)

export default {
  fields,
  getSessionFields,
  keys,
  setSessionFields,
  sortByField,
  workFieldSortDict,
}
