import { MODAL_TYPES } from "../../constants";

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