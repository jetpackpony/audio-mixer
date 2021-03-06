import * as R from 'ramda';
import { ACTION_TYPES } from '../../actions';
import initState from './initialState';
import {
  addEndpoint, addConnection,
  deleteNode, deleteConnection,
  updateDeviceList,
  addAudioNode, editAudioNode,
  moveNode
} from './handlers';

const handlersMap = {
  [ACTION_TYPES.ADD_ENDPOINT]: addEndpoint,
  [ACTION_TYPES.ADD_AUDIO_NODE]: addAudioNode,
  [ACTION_TYPES.ADD_CONNECTION]: addConnection,
  [ACTION_TYPES.DELETE_NODE]: deleteNode,
  [ACTION_TYPES.DELETE_CONNECTION]: deleteConnection,
  [ACTION_TYPES.EDIT_AUDIO_NODE]: editAudioNode,
  [ACTION_TYPES.UPDATE_DEVICE_LIST]: updateDeviceList,
  [ACTION_TYPES.MOVE_NODE]: moveNode,
}

const stateIdentity = (state) => state;
const getHandler = (actionType) => (
  handlersMap[actionType] || stateIdentity
);

const audioGraph = (state = initState, action) => {
  return getHandler(action.type)(state, action);
};

export default audioGraph;
export * from './selectors';