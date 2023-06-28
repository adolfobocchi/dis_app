import { SHOW_CONFIRMATION, HIDE_CONFIRMATION } from './actions';

const initialState = {
  title: '',
  text: '',
  onConfirm: null,
  visible: false,
};

export default function confirmationReducer(state = initialState, action) {
  switch (action.type) {
    case SHOW_CONFIRMATION:
      return {
        ...state,
        title: action.payload.title,
        text: action.payload.text,
        onConfirm: action.payload.onConfirm,
        visible: true,
      };
    case HIDE_CONFIRMATION:
      return {
        ...state,
        visible: false
      };
    default:
      return state;
  }
}
