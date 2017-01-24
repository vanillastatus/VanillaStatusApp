import { HOST } from '../config'
import { handleActions } from 'redux-actions'

// Actions
const FETCH = 'stats/FETCH'
const ERROR = 'stats/ERROR'
const UPDATE = 'stats/UPDATE'
const PURGE = 'stats/PURGE'

const initialState = {
  isFetching: false,
  hasFetched: false,
  error: false,
  data: {}
}

// Reducer
export default handleActions({
  [FETCH]: (state, action) => {
    return {
      ...state,
      isFetching: true
    }
  },
  [ERROR]: (state, action) => {
    const { error } = action
    return {
      ...state,
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
      dispatch(fetchStats())
      return fetch(`${HOST}/stats`)
        .then(response => {
          if (response && response.status === 200) {
            return response.json()
          } else {
            return null
          }
        })
        .then(json => {
          if (json) {
            dispatch(updateStats(json))
          }
          dispatch(statsPoll())
        })
        .catch(error => {
          dispatch(statsPoll(100000))
          dispatch(errorStats(error))
        })
    }
  }
}
