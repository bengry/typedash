export const isTypedArray =
  typeof ArrayBuffer === 'function' && ArrayBuffer.isView
    ? // eslint-disable-next-line @typescript-eslint/unbound-method
      ArrayBuffer.isView
    : null;
