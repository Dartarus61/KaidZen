import React from "react";
import Input from "../Input/Input";

const InputList = ({ props }) => {
  return (
    <div>
      {props.map((input) => (
        <Input {...input} />
      ))}
    </div>
  );
};

export default InputList;
