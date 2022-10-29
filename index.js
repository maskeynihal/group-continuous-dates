const { pipe } = require("./utils/pipe");
const { diffInDays } = require("./utils/date");
const { groupBy, orderByDate } = require("./utils/array");

/**
 * Group object with continuous date.
 *
 * @param {Array<{[key: string]: unknown}>} arrayOfObjectWithDate
 * @param {[string, string]} [startDateKey, endDateKey] = []
 * @param {number} thresholdDays = 1
 * @returns {{[key: string | number]: Array<{[key: string]: unknown}>}}
 */
function groupContinuousDate(
  arrayOfObjectWithDate,
  [startDateKey = "startDate", endDateKey = "endDate"] = [],
  thresholdDays = 1
) {
  return pipe(
    (v) => orderByDate(v, startDateKey),
    (v) => addContinuousProperty(v, thresholdDays),
    addGroupIdForContinuous,
    (v) => groupBy(v, "groupId", removeAddedProperties)
  )(arrayOfObjectWithDate);
}

/**
 * Remove added properties.
 *
 * @param {{[key: string]: unknown}} value
 * @returns Object
 */
function removeAddedProperties(value = {}) {
  const { isContinuous, groupId, ...rest } = value;

  return rest;
}

/**
 * Assign group id for continuous data.
 *
 * @param {Array<Object>} arr
 * @returns {Array<{[key: string]: unknown, groupId: number}>}
 */
function addGroupIdForContinuous(arr) {
  return arr.reduce((acc, cv) => {
    const latestData = acc[acc.length - 1] || {};

    const { groupId: latestGroupId, isContinuous } = latestData;

    let nextGroupId = latestGroupId;

    if (!latestGroupId) {
      nextGroupId = 1;
    } else {
      if (!isContinuous) {
        nextGroupId += 1;
      }
    }

    return [
      ...acc,
      {
        ...cv,
        groupId: nextGroupId,
      },
    ];
  }, []);
}

/**
 * Add continuous property to the array of object.
 *
 * @param {Array<{[key: string]: unknown}>} arr
 * @param {number} thresholdDays = 1
 * @returns {Array<{[key: string]: unknown, isContinuous: boolean | null}>}
 */
function addContinuousProperty(arr, thresholdDays = 1) {
  const dataWithContinuous = [];

  for (let i = 0; i < arr.length; i++) {
    const current = arr[i];
    const next = arr[i + 1];

    if (!next) {
      dataWithContinuous.push({
        ...current,
        isContinuous: null,
      });

      break;
    }

    const diff = diffInDays(
      new Date(current.endDate),
      new Date(next.startDate)
    );

    dataWithContinuous.push({
      ...current,
      isContinuous: diff <= thresholdDays,
    });
  }

  return dataWithContinuous;
}

module.exports = groupContinuousDate;
