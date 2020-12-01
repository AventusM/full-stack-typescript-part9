interface MultiplicationArguments {
  first: number;
  second: number;
}

const parseArgs = (args: Array<string>): MultiplicationArguments => {
  if (args.length < 4) throw new Error("Not enough arguments");
  if (args.length > 4) throw new Error("Too many arguments");

  if (isNaN(Number(args[2])) || isNaN(Number(args[3]))) {
    throw new Error("Non-number value provided");
  } else {
    return {
      first: Number(args[2]),
      second: Number(args[3]),
    };
  }
};

const multiplicator = (a: number, b: number, printText: string) => {
  console.log(printText, a * b);
};

try {
  const { first, second } = parseArgs(process.argv);
  multiplicator(first, second, "Multiplication result:");
} catch (e) {
  console.log("error: ", e);
}

//const a: number = Number(process.argv[2]);
//const b: number = Number(process.argv[3]);
//multiplicator(a, b, `Multiplied ${a} and ${b}, the result is:`);
