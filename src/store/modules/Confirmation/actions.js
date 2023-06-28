export const SHOW_CONFIRMATION = 'SHOW_CONFIRMATION';
export const HIDE_CONFIRMATION = 'HIDE_CONFIRMATION';

export function showConfirmation(title, text, onConfirm) {
  return {
    type: SHOW_CONFIRMATION,
    payload: {
      title,
      text,
      onConfirm,
    },
  };
}

export function hideConfirmation() {
  return {
    type: HIDE_CONFIRMATION,
  };
}
