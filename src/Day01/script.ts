import { getInput } from "../util";

const input = getInput("Day01", "\n");

function parseDocument(document: string[]) {
  const lines = document.map((el) => el.split("   "));

  const left: number[] = [];
  const right: number[] = [];
  lines.forEach((line) => {
    left.push(parseInt(line[0]));
    right.push(parseInt(line[1]));
  });

  return [left, right];
}

function part1(document: string[]) {
  const [left, right] = parseDocument(document);
  left.sort();
  right.sort();

  let sum = 0;
  for (let i = 0; i < left.length; i++) {
    sum += Math.abs(left[i] - right[i]);
  }

  return sum;
}

function part2(document: string[]) {
  const [left, right] = parseDocument(document);

  let sum = 0;
  for (let i = 0; i < left.length; i++) {
    sum += left[i] * right.filter((el) => el === left[i]).length;
  }

  return sum;
}

console.log(part1(input));
console.log(part2(input));
