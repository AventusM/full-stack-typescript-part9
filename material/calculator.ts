type Operation = "multiply" | "add" | "divide";
type Result = number;

const calculator = (a: number, b: number, operation: Operation): Result => {
  if (operation === "multiply") {
    return a * b;
  } else if (operation === "add") {
    return a + b;
  } else if (operation === "divide") {
    if (b === 0) throw new Error("Cant divide by zero");
    return a / b;
  } else {
    throw new Error("Unknown operation: " + operation);
  }
};

try {
  const firstNum: number = Number(process.argv[2]);
  const secondNum: number = Number(process.argv[3]);
  console.log(calculator(firstNum, secondNum, "divide"));
  console.log(process.argv);
} catch (e) {
  console.log("Something went wrong, error message: ", e.message);
}
