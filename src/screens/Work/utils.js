import React from 'react'
import Link from 'react-router-dom/Link'

const createFacetQueryValue = (key, value) => {
  return `f[${key}][]=${value}`
}

const reflective = value => value

const linkFacetField = field => value => (
  <Link to={`/search?${createFacetQueryValue(field, value)}`}>
    {value}
  </Link>
)
const dateString = value => {
  let [date, time] = value.split('T')
  time = time.replace(/\+00:00$/, '')

  const [year, month, day] = date.split('-').map(Number)
  const [hour, minute, _seconds] = time.split(':').map(Number)
  const [seconds, milliseconds] = String(_seconds).split('.').map(Number)

  const d = new Date(
    Date.UTC(year, month - 1, day, hour, minute, seconds, milliseconds)
  )

  return d.toString()
}

export const renderers = {
  linkFacetField,
  reflective,
}

export const schema = {
  'title': {
    label: 'Title',
    renderer: reflective,
  },

  'creator': {
    label: 'Creator',
    renderer: linkFacetField('creator'),
  },

  'description': {
    label: 'Description',
    renderer: reflective,
  },

  'subject_loc': {
    label: 'Subject (Library of Congress)',
    renderer: linkFacetField('subject'),
  },

  'format': {
    label: 'Format',
    renderer: reflective,
  },

  'rights': {
    label: 'Rights',
    renderer: reflective,
  },

  'date_uploaded': {
    label: 'Uploaded',
    renderer: dateString,
  },
}
