import React, { Fragment } from "react";

interface HeaderProps {
  name: string;
}

const Header: React.FC<HeaderProps> = (props) => {
  return <h1>{props.name}</h1>;
};

interface CoursePartBase {
  name: string;
  exerciseCount: number;
}

interface CoursePartBaseWithDescription extends CoursePartBase {
  description: string;
}

interface CoursePartOne extends CoursePartBaseWithDescription {
  name: "Fundamentals";
}

interface CoursePartTwo extends CoursePartBase {
  name: "Using props to pass data";
  groupProjectCount: number;
}

interface CoursePartThree extends CoursePartBaseWithDescription {
  name: "Deeper type usage";
  exerciseSubmissionLink: string;
}

interface CoursePartFour extends CoursePartBaseWithDescription {
  name: "New beginnings";
  availableCredits: number;
}

type CoursePart =
  | CoursePartOne
  | CoursePartTwo
  | CoursePartThree
  | CoursePartFour;

// Cant use ContentProps[] directly
interface CoursePartProps {
  parts: CoursePart[];
}

/*interface CoursePart {
  name: string;
  exerciseCount: number;
}*/

const Part: React.FC<CoursePart> = (props) => {
  switch (props.name) {
    case "Fundamentals":
      return (
        <Fragment>
          <p>Name: {props.name}</p>
          <p>Exercise count: {props.exerciseCount}</p>
          <p>Description: {props.description}</p>
        </Fragment>
      );
    case "Using props to pass data":
      return (
        <Fragment>
          <p>Name: {props.name}</p>
          <p>Exercise count: {props.exerciseCount}</p>
          <p>Group project count: {props.groupProjectCount}</p>
        </Fragment>
      );
    case "Deeper type usage":
      return (
        <Fragment>
          <p>Name: {props.name}</p>
          <p>Exercise count: {props.exerciseCount}</p>
          <p>Description: {props.description}</p>
          <p>Exercise submission link: {props.exerciseSubmissionLink}</p>
        </Fragment>
      );
    case "New beginnings":
      return (
        <Fragment>
          <p>Name: {props.name}</p>
          <p>Exercise count: {props.exerciseCount}</p>
          <p>Description: {props.description}</p>
          <p>Available credits: {props.availableCredits}</p>
        </Fragment>
      );
    default:
      return assertNever(props);
  }
};

const Content: React.FC<CoursePartProps> = (props) => {
  return (
    <ul>
      {props.parts.map((course: CoursePart, index: number) => {
        return (
          <li key={index}>
            {/*  Use spread operator to maintain prop type (CoursePart) */}
            <Part {...course} />
          </li>
        );
      })}
    </ul>
  );
};

/**
 * Helper function for exhaustive type checking
 */
const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

interface TotalProps {
  numberOfExercises: number;
}

const Total: React.FC<TotalProps> = (props) => {
  return <p>Number of exercises {props.numberOfExercises}</p>;
};

const App: React.FC = () => {
  const courseName = "Half Stack application development";
  const courseParts: CoursePart[] = [
    {
      name: "Fundamentals",
      exerciseCount: 10,
      description: "This is an awesome course part",
    },
    {
      name: "Using props to pass data",
      exerciseCount: 7,
      groupProjectCount: 3,
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14,
      description: "Confusing description",
      exerciseSubmissionLink: "https://fake-exercise-submit.made-up-url.dev",
    },
    {
      name: "New beginnings",
      exerciseCount: 5,
      description: "This is the future of programming",
      availableCredits: 10,
    },
  ];

  const numberOfExercises = courseParts.reduce(
    (carry, part) => carry + part.exerciseCount,
    0
  );

  return (
    <div>
      <Header name={courseName} />
      <Content parts={courseParts} />
      <Total numberOfExercises={numberOfExercises} />
    </div>
  );
};

export default App;
