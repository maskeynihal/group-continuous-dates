const { pipe } = require("./pipe");
const { diffInDays } = require("./date");
const { groupBy, orderByDate } = require("./array");

test("should group the array by given key", () => {
  const ungroupedCities = [
    { name: "Jakarta", country: "Indonesia" },
    { name: "Bandung", country: "Indonesia" },
    { name: "Tokyo", country: "Japan" },
    { name: "Kathmandu", country: "Nepal" },
    { name: "Pokhara", country: "Nepal" },
    { name: "Bhaktapur", country: "Nepal" },
    { name: "New York", country: "USA" },
    { name: "Los Angeles", country: "USA" },
  ];

  const groupedCities = {
    Indonesia: [
      { name: "Jakarta", country: "Indonesia" },
      { name: "Bandung", country: "Indonesia" },
    ],
    Japan: [{ name: "Tokyo", country: "Japan" }],
    Nepal: [
      { name: "Kathmandu", country: "Nepal" },
      { name: "Pokhara", country: "Nepal" },
      { name: "Bhaktapur", country: "Nepal" },
    ],
    USA: [
      { name: "New York", country: "USA" },
      { name: "Los Angeles", country: "USA" },
    ],
  };

  expect(groupBy(ungroupedCities, "country")).toEqual(groupedCities);
});

test("should call the function serially using the pipe function", () => {
  const addOne = (v) => v + 1;
  const addTwo = (v) => v + 2;
  const addThree = (v) => v + 3;

  expect(pipe(addOne, addTwo, addThree)(1)).toBe(7);
});

test("should have the difference of date in days", () => {
  const date1 = new Date("2019-01-01");
  const date2 = new Date("2019-01-03");

  expect(diffInDays(date1, date2)).toBe(2);
});

test("should be ordered by start date", () => {
  const unorderedArray = [
    { startDate: "2020-01-01", endDate: "2020-01-02" },
    { startDate: "2019-01-01", endDate: "2019-01-02" },
    { startDate: "2019-01-03", endDate: "2019-01-04" },
  ];
  const orderedArray = [
    { startDate: "2019-01-01", endDate: "2019-01-02" },
    { startDate: "2019-01-03", endDate: "2019-01-04" },
    { startDate: "2020-01-01", endDate: "2020-01-02" },
  ];

  expect(orderByDate(unorderedArray, "startDate")).toEqual(orderedArray);
});
