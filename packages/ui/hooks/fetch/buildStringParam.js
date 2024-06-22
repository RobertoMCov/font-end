const buildStringParams = (objectParams = {}) => {
  if (!Object.keys(objectParams).length) return ''
  const params = new URLSearchParams(objectParams)
  return `?${params.toString()}`
}

export default buildStringParams
