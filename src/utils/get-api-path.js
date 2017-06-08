export default function getApiPath (path) {
  if (path[0] !== '/') {
    path = `/${path}`
  }

  return `${process.env.API_BASE_URL}${path}`
}
