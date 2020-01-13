class Strings {
  isNormalNumeric(string) {
    const numeric = Math.floor(Number(string));
    return numeric !== Infinity && String(numeric) === string && numeric >= 0;
  }
}

module.exports = new Strings();
