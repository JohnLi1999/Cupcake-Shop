export const updateObject = (oldObject, updatedProperties) => {
  return { ...oldObject, ...updatedProperties };
};

export const bytesToMB = bytes => {
  return (bytes / (1024 * 1024)).toFixed(2);
};
