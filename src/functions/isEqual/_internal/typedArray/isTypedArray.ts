export const isTypedArray =
  typeof ArrayBuffer === 'function' && ArrayBuffer.isView
    ? ArrayBuffer.isView
    : null;
