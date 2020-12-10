import React from "react";

interface HeaderProps {
  name: string;
}

const Header: React.FC<HeaderProps> = (props) => {
  return <h1>{props.name}</h1>;
};

// Cant use ContentProps[] directly
interface ContentArrayProps {
  parts: ContentProps[];
}

interface ContentProps {
  name: string;
  exerciseCount: number;
}

const Content: React.FC<ContentArrayProps> = (props) => {
  return (
    <>
      {props.parts.map((course: ContentProps, index: number) => {
        return (
          <p key={index}>
            {course.name} {course.exerciseCount}
          </p>
        );
      })}
    </>
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
  const courseParts = [
    {
      name: "Fundamentals",
      exerciseCount: 10,
    },
    {
      name: "Using props to pass data",
      exerciseCount: 7,
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14,
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
