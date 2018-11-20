import * as R from 'ramda';
import { NODE_TYPES } from '../../constants';

export const getInputNodes = (state) => (
  R.filter((node) => (node.type === NODE_TYPES.SOURCE), state)
);

export const getOutputNodes = (state) => (
  R.filter((node) => (node.type === NODE_TYPES.DESTINATION), state)
);

export const getAudioNodes = (state) => (
  R.filter((node) => (node.type === NODE_TYPES.AUDIONODE), state)
);

export const getNodeTitleById = (state, id) => (
  R.compose(
    R.prop("title"),
    R.find(R.propEq("nodeId", id))
  )(state)
);

export const getNodeById = (state, id) => (
    R.find(R.propEq("nodeId", id))(state)
);

export const getConnections = (state) => (
  R.reduce((agregator, node) => (
    R.concat(
      agregator,
      R.map((out) => ({
        nodeId: node.nodeId + "-" + out,
        fromTitle: getNodeTitleById(state, node.nodeId),
        fromId: node.nodeId,
        toTitle: getNodeTitleById(state, out),
        toId: out
      }), node.output)
    )
  ), [], state)
);

export const getAllNodes = (state) => state;

export const getAudioNodePropsById = (state, id) => (
  id !== null
    ? R.compose(
        R.prop("props"),
        R.find(R.propEq("nodeId", id))
      )(state)
    : null
);

export const getAudioNodePluginIdById = (state, id) => (
  id !== null
    ? R.compose(
        R.prop("nodeTypeId"),
        R.find(R.propEq("nodeId", id))
      )(state)
    : null
);