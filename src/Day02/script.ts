import { getInput } from "../util";

const input: number[][] = getInput("Day02", "\n").map((line) =>
  line.split(" ").map((level) => parseInt(level))
);

function part1(reports: number[][]) {
  reports.forEach((report) => {
    if (report[0] > report[1]) {
      report.reverse();
    }
  });

  let count = 0;
  reports.forEach((report) => {
    let isSave = true;
    for (let i = 0; i < report.length - 1; i++) {
      if (
        report[i] > report[i + 1] ||
        Math.abs(report[i] - report[i + 1]) < 1 ||
        Math.abs(report[i] - report[i + 1]) > 3
      ) {
        isSave = false;
      }
    }
    count += +isSave;
  });

  return count;
}

function part2(reports: number[][]) {
  reports.forEach((report) => {
    if (report[0] < report[1]) {
      report.reverse();
    }
  });

  let count = 0;
  reports.forEach((report) => {
    let isSave = true;
    let wasSkipped = false;
    for (let i = 0; i < report.length - 1; i++) {
      if (
        report[i] < report[i + 1] ||
        Math.abs(report[i] - report[i + 1]) < 1 ||
        Math.abs(report[i] - report[i + 1]) > 3
      ) {
        if (!wasSkipped) {
          report.splice(i, 1);
          wasSkipped = true;
          i = 0;
        } else {
          isSave = false;
        }
      }
    }
    count += +isSave;
  });

  return count;
}

console.log(part1(input));
console.log(part2(input));
