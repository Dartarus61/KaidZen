import React from "react";
import TextField from "@mui/material/TextField";
import s from "./Input.module.css";

const Input = (promis) => {
  return (
    <div className={s.input}>
      <TextField
        label={promis.label}
        variant="filled"
        required
        error={promis.error}
        value={promis.value}
        onChange={promis.onChange}
        onBlur={promis.onBlur}
        helperText={promis.helperText}
      />
    </div>
  );
};

export default Input;
