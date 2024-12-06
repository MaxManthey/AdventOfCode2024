import { getInput } from "../util";

type Rule = [number, number];

const input = parseInput(getInput("Day05", "").join(""));

function parseInput(input: string): { rules: Rule[]; updates: number[][] } {
  const [ruleLines, updateLines] = input
    .split("\n\n")
    .map((section) => section.split("\n"));

  const rules: Rule[] = ruleLines.map((line) =>
    line.split("|").map(Number)
  ) as Rule[];

  const updates: number[][] = updateLines.map((line) =>
    line.split(",").map(Number)
  );
  return { rules, updates };
}

function isValidUpdate(update: number[], rules: Rule[]) {
  const indexMap = new Map<number, number>();
  update.forEach((page, index) => indexMap.set(page, index));

  for (const [x, y] of rules) {
    if (
      indexMap.has(x) &&
      indexMap.has(y) &&
      indexMap.get(x)! > indexMap.get(y)!
    ) {
      return false;
    }
  }
  return true;
}

function part1(document: { rules: Rule[]; updates: number[][] }) {
  const { rules, updates } = document;
  let sum = 0;

  for (const update of updates) {
    if (isValidUpdate(update, rules))
      sum += update[Math.floor(update.length / 2)];
  }

  return sum;
}

function sortedUpdate(rules: Rule[], update: number[]) {
  const filteredRules = rules.filter(
    ([x, y]) => update.includes(x) && update.includes(y)
  );
  const graph = new Map<number, number[]>();
  const inDegree = new Map<number, number>();

  for (const page of update) {
    graph.set(page, []);
    inDegree.set(page, 0);
  }

  for (const [x, y] of filteredRules) {
    graph.get(x)!.push(y);
    inDegree.set(y, inDegree.get(y)! + 1);
  }

  const queue: number[] = [];
  for (const [page, degree] of inDegree) {
    if (degree === 0) queue.push(page);
  }

  const sortedOrder: number[] = [];
  while (queue.length > 0) {
    const current = queue.shift()!;
    sortedOrder.push(current);

    for (const neighbor of graph.get(current)!) {
      inDegree.set(neighbor, inDegree.get(neighbor)! - 1);
      if (inDegree.get(neighbor)! === 0) queue.push(neighbor);
    }
  }

  return sortedOrder;
}

function part2(document: { rules: Rule[]; updates: number[][] }) {
  const { rules, updates } = document;
  let sum = 0;

  for (const update of updates) {
    if (!isValidUpdate(update, rules)) {
      sum += sortedUpdate(rules, update)[Math.floor(update.length / 2)];
    }
  }
  return sum;
}

console.log(part1(input));
console.log(part2(input));
