import { ACTION_TYPES } from "../actions";
import { MODAL_TYPES } from "../constants";

/*
let initState = {
  ui: {
    addInputOpen: false,
    addOutputOpen: false,
    addConnectionOpen: false,
    editGainOpen: false,
    editGainId: null
  }
};
*/
let initState = {
  "addInputOpen": false,
  "addOutputOpen": false,
  "addConnectionOpen": false,
  "editGainOpen": false,
  "editGainId": null
};

const ui = (state = initState, action) => {
  switch (action.type) {
    case ACTION_TYPES.TOGGLE_ADD_INPUT_MODAL:
      return {
        ...state,
        addInputOpen: !state.addInputOpen
      };
    case ACTION_TYPES.TOGGLE_ADD_OUTPUT_MODAL:
      return {
        ...state,
        addOutputOpen: !state.addOutputOpen
      };
    case ACTION_TYPES.TOGGLE_ADD_CONNECTION_MODAL:
      return {
        ...state,
        addConnectionOpen: !state.addConnectionOpen
      };
    case ACTION_TYPES.TOGGLE_EDIT_GAIN_MODAL:
      return {
        ...state,
        editGainOpen: !state.editGainOpen,
        editGainId: action.id
      };
    default:
      return state;
  }
};

export default ui;

const modalsMap = {
  [MODAL_TYPES.ADD_INPUT]: "addInputOpen",
  [MODAL_TYPES.ADD_OUTPUT]: "addOutputOpen",
  [MODAL_TYPES.ADD_CONNECTION]: "addConnectionOpen",
  [MODAL_TYPES.EDIT_GAIN]: "editGainOpen",
};
export const getIsModalOpen = (state, modalType) => {
  return state[modalsMap[modalType]];
};

export const getEditGainId= (state) => state.editGainId;