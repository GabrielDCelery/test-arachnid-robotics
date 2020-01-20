const isNormalNumeric = (string: string): boolean => {
  const numeric = Math.floor(Number(string));
  return numeric !== Infinity && String(numeric) === string && numeric >= 0;
};

export default {
  isNormalNumeric
};
