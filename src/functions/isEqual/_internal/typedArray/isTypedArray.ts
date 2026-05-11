export const isTypedArray =
  typeof ArrayBuffer === 'function' && ArrayBuffer.isView
    ? (v: unknown) => ArrayBuffer.isView(v)
    : null;
