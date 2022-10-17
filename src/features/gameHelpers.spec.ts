import {
  createNewGrid,
  combineLine,
  compressLine,
  getCellsCount,
  placeNumberInAvailableCellNumber,
  placeValueInRandomAvailableCell,
  rotate90,
  rotate180,
  rotate270,
  getRotatedGrid,
} from "./gameHelpers";

describe("Given createNewGrid", () => {
  it("should create the correct default size array of 6x6", () => {
    expect(createNewGrid()).toEqual([
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
    ]);
  });

  it("should create the correct 2x4 size array", () => {
    expect(createNewGrid(2, 4)).toEqual([
      [0, 0, 0, 0],
      [0, 0, 0, 0],
    ]);
  });

  it("should create the correct 4x2 size array", () => {
    expect(createNewGrid(4, 2)).toEqual([
      [0, 0],
      [0, 0],
      [0, 0],
      [0, 0],
    ]);
  });

  it("should create the correct 3x3 size array", () => {
    expect(createNewGrid(3, 3)).toEqual([
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, 0],
    ]);
  });
});

describe("Given combineLine", () => {
  it("should COMBINE the numbers in a line correctly", () => {
    expect(combineLine([0, 2, 2])).toEqual([0, 4, 0]);
    expect(combineLine([0, 4, 2])).toEqual([0, 4, 2]);
    expect(combineLine([2, 2, 2, 0])).toEqual([4, 0, 2, 0]);
    expect(combineLine([2, 2, 2, 2])).toEqual([4, 0, 4, 0]);
    expect(combineLine([2, 0, 0, 2])).toEqual([4, 0, 0, 0]);
    expect(combineLine([0, 0, 0, 2])).toEqual([0, 0, 0, 2]);
  });

  //   it("should COMBINE the numbers in a line correctly with obstacles (-1)", () => {
  //     expect(combineLine([0, -1, 2])).toEqual([0, -1, 2]);
  //     expect(combineLine([-1, 2, 2])).toEqual([-1, 4, 0]);
  //     expect(combineLine([0, 0, -1, -1])).toEqual([0, 0, -1, -1]);
  //     expect(combineLine([-1, -1, 2, 2])).toEqual([-1, -1, 4, 0]);
  //   });
});

describe("Given compressLine", () => {
  it("should COMPRESS the numbers in a line correctly", () => {
    expect(compressLine([0, 2, 2])).toEqual([2, 2, 0]);
    expect(compressLine([0, 4, 2])).toEqual([4, 2, 0]);
    expect(compressLine([2, 2, 2, 0])).toEqual([2, 2, 2, 0]);
    expect(compressLine([2, 2, 2, 2])).toEqual([2, 2, 2, 2]);
    expect(compressLine([2, 0, 0, 2])).toEqual([2, 2, 0, 0]);
    expect(compressLine([0, 0, 0, 2])).toEqual([2, 0, 0, 0]);
  });

  //   it("should COMPRESS the numbers in a line correctly with obstacles (-1)", () => {
  //     expect(compressLine([0, -1, 2])).toEqual([0, -1, 2]);
  //     expect(compressLine([-1, 2, 2])).toEqual([-1, 2, 2]);
  //     expect(compressLine([0, 0, -1, -1])).toEqual([0, 0, -1, -1]);
  //     expect(compressLine([-1, -1, 2, 2])).toEqual([-1, -1, 2, 2]);
  //     expect(compressLine([0, -1, 0, 2])).toEqual([0, -1, 0, 2]);
  //   });
});

describe("Given getAvailableCells", () => {
  it("should find the correct number for available cells", () => {
    expect(
      getCellsCount([
        [0, 2, 2],
        [0, 0, 0],
        [0, 0, 0],
      ])
    ).toEqual(7);

    expect(
      getCellsCount([
        [2, 2, 2],
        [2, 2, 2],
        [2, 2, 2],
      ])
    ).toEqual(0);

    expect(
      getCellsCount([
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0],
      ])
    ).toEqual(12);

    expect(
      getCellsCount([
        [4, 4, 4],
        [4, 4, 4],
        [4, 4, 4],
        [4, 4, 4],
      ])
    ).toEqual(0);

    expect(
      getCellsCount([
        [0, 4, 4],
        [4, 4, 4],
        [4, 4, 4],
        [4, 4, 0],
      ])
    ).toEqual(2);
  });
});

describe("Given placeNumberInAvailableCellNumber", () => {
  it("should insert 128 into the correct free slot", () => {
    expect(
      placeNumberInAvailableCellNumber(
        [
          [0, 4, 4],
          [4, 4, 4],
          [4, 4, 0],
        ],
        0,
        128
      )
    ).toEqual([
      [128, 4, 4],
      [4, 4, 4],
      [4, 4, 0],
    ]);

    expect(
      placeNumberInAvailableCellNumber(
        [
          [0, 4, 4],
          [4, 4, 4],
          [4, 4, 0],
        ],
        1,
        128
      )
    ).toEqual([
      [0, 4, 4],
      [4, 4, 4],
      [4, 4, 128],
    ]);
  });

  it("should not insert a number if the position is out of range", () => {
    expect(
      placeNumberInAvailableCellNumber(
        [
          [0, 4, 4],
          [4, 4, 4],
          [4, 4, 0],
        ],
        5,
        128
      )
    ).toEqual([
      [0, 4, 4],
      [4, 4, 4],
      [4, 4, 0],
    ]);

    expect(
      placeNumberInAvailableCellNumber(
        [
          [4, 4, 4],
          [4, 4, 4],
          [4, 4, 4],
        ],
        0,
        128
      )
    ).toEqual([
      [4, 4, 4],
      [4, 4, 4],
      [4, 4, 4],
    ]);
  });
});

describe("Given placeValueInRandomAvailableCell", () => {
  it("should find the correct number for available cells", () => {
    expect(
      placeValueInRandomAvailableCell({
        grid: [
          [4, 4, 4],
          [4, 4, 4],
          [4, 4, 0],
        ],
        value: 128,
      })
    ).toEqual([
      [4, 4, 4],
      [4, 4, 4],
      [4, 4, 128],
    ]);

    expect(
      placeValueInRandomAvailableCell({
        grid: [
          [0, 4, 4],
          [4, 4, 4],
          [4, 4, 4],
        ],
        value: 128,
      })
    ).toEqual([
      [128, 4, 4],
      [4, 4, 4],
      [4, 4, 4],
    ]);
  });
});

describe("Given rotate90", () => {
  it("should rotate square 2d matrix correctly", () => {
    expect(
      rotate90([
        [1, 2, 4],
        [128, 0, 8],
        [64, 32, 16],
      ])
    ).toEqual([
      [64, 128, 1],
      [32, 0, 2],
      [16, 8, 4],
    ]);
  });

  it("should rotate rectangular 2d matrix correctly", () => {
    expect(
      rotate90([
        [1, 2, 4, 8],
        [512, 0, -1, 16],
        [256, 128, 64, 32],
      ])
    ).toEqual([
      [256, 512, 1],
      [128, 0, 2],
      [64, -1, 4],
      [32, 16, 8],
    ]);
  });
});

describe("Given rotate180", () => {
  it("should rotate square 2d matrix correctly", () => {
    expect(
      rotate180([
        [1, 2, 4],
        [128, 0, 8],
        [64, 32, 16],
      ])
    ).toEqual([
      [16, 32, 64],
      [8, 0, 128],
      [4, 2, 1],
    ]);
  });

  it("should rotate rectangular 2d matrix correctly", () => {
    expect(
      rotate180([
        [1, 2, 4, 8],
        [512, 0, -1, 16],
        [256, 128, 64, 32],
      ])
    ).toEqual([
      [32, 64, 128, 256],
      [16, -1, 0, 512],
      [8, 4, 2, 1],
    ]);
  });
});

describe("Given rotate270", () => {
  it("should rotate square 2d matrix correctly", () => {
    expect(
      rotate270([
        [1, 2, 4],
        [128, 0, 8],
        [64, 32, 16],
      ])
    ).toEqual([
      [4, 8, 16],
      [2, 0, 32],
      [1, 128, 64],
    ]);
  });

  it("should rotate rectangular 2d matrix correctly", () => {
    expect(
      rotate270([
        [1, 2, 4, 8],
        [512, 0, -1, 16],
        [256, 128, 64, 32],
      ])
    ).toEqual([
      [8, 16, 32],
      [4, -1, 64],
      [2, 0, 128],
      [1, 512, 256],
    ]);
  });
});

describe("Given getRotatedGrid", () => {
  it("should rotate square 2d matrix correctly when direction is UP", () => {
    expect(
      getRotatedGrid({
        direction: "up",
        grid: [
          [1, 2, 4],
          [128, 0, 8],
          [64, 32, 16],
        ],
      })
    ).toEqual([
      [16, 32, 64],
      [8, 0, 128],
      [4, 2, 1],
    ]);
  });

  it("should rotate square 2d matrix correctly when direction is UP and reversed", () => {
    expect(
      getRotatedGrid({
        direction: "up",
        grid: [
          [16, 32, 64],
          [8, 0, 128],
          [4, 2, 1],
        ],
        reverse: true,
      })
    ).toEqual([
      [1, 2, 4],
      [128, 0, 8],
      [64, 32, 16],
    ]);
  });

  it("should rotate square 2d matrix correctly when direction is DOWN", () => {
    expect(
      getRotatedGrid({
        direction: "down",
        grid: [
          [1, 2, 4],
          [128, 0, 8],
          [64, 32, 16],
        ],
      })
    ).toEqual([
      [1, 2, 4],
      [128, 0, 8],
      [64, 32, 16],
    ]);
  });

  it("should rotate square 2d matrix correctly when direction is DOWN and reversed", () => {
    expect(
      getRotatedGrid({
        direction: "down",
        grid: [
          [1, 2, 4],
          [128, 0, 8],
          [64, 32, 16],
        ],
        reverse: true,
      })
    ).toEqual([
      [1, 2, 4],
      [128, 0, 8],
      [64, 32, 16],
    ]);
  });

  it("should rotate square 2d matrix correctly when direction is LEFT", () => {
    expect(
      getRotatedGrid({
        direction: "left",
        grid: [
          [1, 2, 4],
          [128, 0, 8],
          [64, 32, 16],
        ],
      })
    ).toEqual([
      [4, 8, 16],
      [2, 0, 32],
      [1, 128, 64],
    ]);
  });

  it("should rotate square 2d matrix correctly when direction is LEFT and reversed", () => {
    expect(
      getRotatedGrid({
        direction: "left",
        grid: [
          [4, 8, 16],
          [2, 0, 32],
          [1, 128, 64],
        ],
        reverse: true,
      })
    ).toEqual([
      [1, 2, 4],
      [128, 0, 8],
      [64, 32, 16],
    ]);
  });

  it("should rotate square 2d matrix correctly when direction is RIGHT", () => {
    expect(
      getRotatedGrid({
        direction: "right",
        grid: [
          [1, 2, 4],
          [128, 0, 8],
          [64, 32, 16],
        ],
      })
    ).toEqual([
      [64, 128, 1],
      [32, 0, 2],
      [16, 8, 4],
    ]);
  });

  it("should rotate square 2d matrix correctly when direction is RIGHT and reversed", () => {
    expect(
      getRotatedGrid({
        direction: "right",
        grid: [
          [64, 128, 1],
          [32, 0, 2],
          [16, 8, 4],
        ],
        reverse: true,
      })
    ).toEqual([
      [1, 2, 4],
      [128, 0, 8],
      [64, 32, 16],
    ]);
  });
});
