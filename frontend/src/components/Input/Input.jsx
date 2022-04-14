import React from "react";
import TextField from "@mui/material/TextField";
import s from "./Input.module.css";

const Input = (props) => {
  return (
    <div className={s.input}>
      <TextField
        label={props.label}
        variant="filled"
        required
        type={props.type}
        error={props.error}
        value={props.value}
        onChange={props.onChange}
        onBlur={props.onBlur}
        helperText={props.helperText}
      />
    </div>
  );
};

export default Input;
