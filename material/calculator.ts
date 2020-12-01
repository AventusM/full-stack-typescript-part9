type Operation = "multiply" | "add" | "divide";
type Result = number;

export const calculator = (
  a: number,
  b: number,
  operation: Operation
): Result => {
  if (operation === "multiply") {
    return a * b;
  } else if (operation === "add") {
    return a + b;
  } else if (operation === "divide") {
    if (b === 0) throw new Error("Cant divide by zero");
    return a / b;
  } else {
    throw new Error(`Unknown operation`);
  }
};

try {
  const firstNum = Number(process.argv[2]);
  const secondNum = Number(process.argv[3]);
  console.log(calculator(firstNum, secondNum, "divide"));
  console.log(process.argv);
} catch (e) {
  console.log("Something went wrong, error message: ", e);
}
