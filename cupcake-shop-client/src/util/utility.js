export const updateObject = (oldObject, updatedProperties) => {
  return { ...oldObject, ...updatedProperties };
};

export const bytesToMB = bytes => {
  return (bytes / (1024 * 1024)).toFixed(2);
};

export const filterByCondition = (type, list, condition, value) => {
  if (!!value) {
    if (type === 'object') {
      return list.filter(item => item[condition] === value);
    } else if (type === 'array') {
      return list.filter(item => item[condition].includes(value));
    }
  }

  return list;
};
