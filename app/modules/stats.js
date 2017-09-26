import { handleActions } from 'redux-actions'
import { HOST, xApiKey } from '../keys.json'

// Actions
const FETCH = 'stats/FETCH'
const ERROR = 'stats/ERROR'
const UPDATE = 'stats/UPDATE'
const PURGE = 'stats/PURGE'

const initialState = {
  isFetching: false,
  hasFetched: false,
  error: false,
  lastRetry: null,
  data: {}
}

// Reducer
export default handleActions({
  [FETCH]: (state, action) => {
    return {
      ...state,
      lastRetry: new Date(),
      isFetching: true
    }
  },
  [ERROR]: (state, action) => {
    const { error } = action
    return {
      ...state,
      isFetching: false,
      error
    }
  },
  [UPDATE]: (state, action) => {
    const data = action.stats
    return {
      ...state,
      isFetching: false,
      error: false,
      hasFetched: true,
      data: { ...data }
    }
  },
  [PURGE]: (state, action) => {
    return {
      ...initialState
    }
  }
}, initialState)

// Action Creators
export function fetchStats() {
  return { type: FETCH }
}

export function errorStats(error) {
  return { type: ERROR, error }
}

export function updateStats(stats) {
  return { type: UPDATE, stats }
}

export function purgeStats() {
  return { type: PURGE }
}


export function statsPoll(timeout = 60000) {
  return dispatch => {
    setTimeout(() => dispatch(statsFetch()), timeout)
  }

  function statsFetch () {
    return dispatch => {
      const path = '/status'
      dispatch(fetchStats())

      return fetch(`${HOST}/${path}`, { headers: { 'x-api-key': xApiKey } })
        .then(response => {
          if (!response) {
            throw new Error('No response from api')
          }

          const { status, ok, headers } = response
          const contentType = headers.get('content-type')

          if (contentType && contentType.indexOf('application/json') !== -1) {
            return response.json()
              .then(data => ({
                status,
                ok,
                data
              }))
          }

          return Promise.resolve({
            status,
            ok: false
          })
        })
        .then(response => {
          if (!response.ok || response.status !== 200) {
            throw response
          }

          if (response.data && response.status === 200) {
            dispatch(updateStats(response.data))
          }
          dispatch(statsPoll())
        })
        .catch(error => {
          console.warn(`Api called failed ${path}`)
          dispatch(statsPoll(100000))
          dispatch(errorStats(error))
        })
    }
  }
}
