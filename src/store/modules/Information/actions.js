export const SHOW_INFORMATION = 'SHOW_INFORMATION';
export const HIDE_INFORMATION = 'HIDE_INFORMATION';

export function showInformation(text) {
  return {
    type: SHOW_INFORMATION,
    payload: {
      text
    },
  };
}

export function hideInformation() {
  return {
    type: HIDE_INFORMATION,
  };
}
