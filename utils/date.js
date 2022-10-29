const MILLISECOND_PER_DAY = 1000 * 60 * 60 * 24;

/**
 * calculate diff in days between two dates.
 *
 * @param {Date} date1
 * @param {Date} date2
 * @returns {Number}
 */
function diffInDays(date1, date2) {
  const utc1 = Date.UTC(date1.getFullYear(), date1.getMonth(), date1.getDate());
  const utc2 = Date.UTC(date2.getFullYear(), date2.getMonth(), date2.getDate());

  return Math.floor((utc2 - utc1) / MILLISECOND_PER_DAY);
}

module.exports = {
  diffInDays,
};
