const groupContinuousDate = require(".");

test("should group continuous dates", () => {
  const input = [
    {
      startDate: "2020-09-01",
      endDate: "2020-10-12",
    },
    {
      startDate: "2021-09-01",
      endDate: "2022-09-12",
    },
    {
      startDate: "2022-08-01",
      endDate: "2022-08-31",
    },
    {
      startDate: "2022-09-01",
      endDate: "2022-09-12",
    },

    {
      startDate: "2022-09-13",
      endDate: "2022-09-15",
    },
    {
      startDate: "2022-11-13",
      endDate: "2022-12-31",
    },
  ];

  const expected = {
    1: [{ startDate: "2020-09-01", endDate: "2020-10-12" }],
    2: [
      { startDate: "2021-09-01", endDate: "2022-09-12" },
      { startDate: "2022-08-01", endDate: "2022-08-31" },
      { startDate: "2022-09-01", endDate: "2022-09-12" },
      { startDate: "2022-09-13", endDate: "2022-09-15" },
    ],
    3: [{ startDate: "2022-11-13", endDate: "2022-12-31" }],
  };

  const result = groupContinuousDate(input);

  expect(result).toEqual(expected);
});
