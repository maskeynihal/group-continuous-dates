function pipe(...fns) {
  return (v) => fns.reduce((acc, fn) => fn(acc), v);
}

module.exports = {
  pipe,
};
