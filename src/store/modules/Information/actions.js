export const SHOW_INFORMATION = 'SHOW_INFORMATION';
export const HIDE_INFORMATION = 'HIDE_INFORMATION';

export function showInformation(title, text, onConfirm) {
  return {
    type: SHOW_INFORMATION,
    payload: {
      title,
      text,
      onConfirm,
    },
  };
}

export function hideInformation() {
  return {
    type: HIDE_INFORMATION,
  };
}
