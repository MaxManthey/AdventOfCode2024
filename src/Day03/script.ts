import { getInput } from "../util";

const input = getInput("Day03", "\n").join("\n");

function part1(document: string): number {
  const mulRegex = /mul\((\d{1,3}),(\d{1,3})\)/g;
  let totalSum = 0;
  let match: RegExpExecArray | null;

  while ((match = mulRegex.exec(document)) !== null) {
    const num1 = parseInt(match[1]);
    const num2 = parseInt(match[2]);
    totalSum += num1 * num2;
  }

  return totalSum;
}

function part2(document: string) {
  const mulRegex = /(mul\((\d{1,3}),(\d{1,3})\)|do\(\)|don't\(\))/g;

  let match: RegExpExecArray | null;
  let total = 0;
  let isEnabled = true;

  while ((match = mulRegex.exec(document)) !== null) {
    const instruction = match[0];

    if (instruction === "do()") isEnabled = true;
    else if (instruction === "don't()") isEnabled = false;
    else if (instruction.startsWith("mul") && isEnabled) {
      const num1 = parseInt(match[2]);
      const num2 = parseInt(match[3]);
      total += num1 * num2;
    }
  }

  return total;
}

console.log(part1(input));
console.log(part2(input));
