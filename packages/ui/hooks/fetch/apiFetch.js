const axios = require('axios')
const defaultURL = process.env.NEXT_PUBLIC_BACKEND_CONNECTION

const throwErrorMessage = ({ name, message }) => {
  function ErrorMessage ({ name, message }) {
    this.name = name
    this.message = message
  }
  throw new ErrorMessage({
    name,
    message
  })
}

const fetchPost = ({
  urlOption = defaultURL,
  pathUrl,
  dataFetch,
  headersObj,
  axiosMethod = 'post'
}) => {
  return axios({
    method: axiosMethod,
    url: `${urlOption}${pathUrl}`,
    data: dataFetch,
    headers: {
      ...headersObj
    }
  })
    .then(({ data: { payload } }) => {
      return payload
    })
    .catch((error) => {
      if (error.response) {
        throwErrorMessage({
          name: error.response.data.payload.error.name,
          message: error.response.data.payload.error.message
        })
      } else {
        throwErrorMessage({
          name: 'unknownError',
          message: 'Error desconocido o de red.'
        })
      }
    })
}

const fetchGet = ({
  urlOption = defaultURL,
  pathUrl,
  headersObj,
  optionsRequest = {} // responseType: 'blob', // important,
}) => {
  return axios({
    url: `${urlOption}${pathUrl}`,
    method: 'GET',
    ...optionsRequest,
    headers: {
      ...headersObj
    }
  })
    .then((response) => {
      if (Object.keys(optionsRequest).length) {
        return response.data
      } else if (response?.data?.payload) {
        return response.data.payload
      } else {
        return response
      }
    })
    .catch((error) => {
      if (error.response && error.response.request.responseType === 'blob') {
        throwErrorMessage({
          name: 'downloadError',
          message: 'Hubo un problema al descargar el archivo'
        })
      } else if (error.response) {
        throwErrorMessage({
          name: error.response.data.payload.error.name,
          message: error.response.data.payload.error.message
        })
      } else {
        throwErrorMessage({
          name: 'unknownError',
          message: 'Error desconocido o de red.'
        })
      }
    })
}

export {
  fetchPost,
  fetchGet
}
