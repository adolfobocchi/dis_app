import { SHOW_INFORMATION, HIDE_INFORMATION } from './actions';

const initialState = {
  title: 'INFORMAÇÃO',
  text: '',
  visible: false,
};

export default function confirmationReducer(state = initialState, action) {
  switch (action.type) {
    case SHOW_INFORMATION:
      return {
        ...state,
        text: action.payload.text,
        visible: true,
      };
    case HIDE_INFORMATION:
      return {
        ...state,
        visible: false
      };
    default:
      return state;
  }
}
