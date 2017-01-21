import { HOST } from '../config'
import { handleActions } from 'redux-actions'

// Actions
import { ActionConst as Actions } from 'react-native-router-flux'
const { FOCUS } = Actions

const initialState = {
  stackDepth: 0,
  currentScene: {}
}

// Reducer
export default handleActions({
  [FOCUS]: (state, action) => {
    const stackDepth = parseInt(action.scene.key.replace(action.scene.sceneKey, '').replace('_', ''))
    return {
      ...state,
      stackDepth,
      currentScene: action.scene
    }
  }
}, initialState)

// Action Creators
