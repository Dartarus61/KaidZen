import React from "react";
import Input from "../Input/Input";

const InputList = ({ props }) => {
  console.log(props);
  return (
    <div>
      {props.map((input) => (
        <Input {...input} />
      ))}
    </div>
  );
};

export default InputList;
