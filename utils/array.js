function groupBy(arr, key, beforeGrouping = (v) => v) {
  return arr.reduce((acc, cv) => {
    const group = acc[cv[key]] || [];

    return {
      ...acc,
      [cv[key]]: [...group, beforeGrouping(cv)],
    };
  }, {});
}

// function to order the array of object by given key
function orderByDate(arr, key) {
  return arr.sort((a, b) => {
    const dateA = new Date(a[key]);
    const dateB = new Date(b[key]);

    return dateA - dateB;
  });
}

module.exports = {
  groupBy,
  orderByDate,
};
