import React from "react";
import { useInput } from "../hooks/useInput";
import InputList from "../InputList/InputList";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { Button, TextField } from "@mui/material";
import s from "./SendDeshboard.module.css";

const SendDeshboard = () => {
  const body = useInput("", { isEmpty: true });
  const effect = useInput("", { isEmpty: true });

  const propsList = [
    {
      label: "Предложение",
      error: body.isDirty && (body.isEmpty || body.emailError),
      value: body.value,
      onChange: (e) => body.onChange(e),
      onBlur: (e) => body.onBlur(e),
      helperText:
        body.isDirty && (body.isEmpty || body.emailError) && body.error,
    },
    {
      label: "Предполагаемый экономический эффект",
      error: effect.isDirty && effect.isEmpty,
      value: effect.value,
      onChange: (e) => effect.onChange(e),
      onBlur: (e) => effect.onBlur(e),
      helperText: effect.isDirty && effect.isEmpty && effect.error,
    },
  ];

  const [area, setArea] = React.useState("");

  const handleChange = (event) => {
    setArea(event.target.value);
  };

  return (
    <form className={s.container}>
      <InputList props={propsList} />
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Сфера улучшения</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={area}
          label="Сфера улучшения"
          onChange={handleChange}
        >
          <MenuItem value="Transport">Транспортировка</MenuItem>
          <MenuItem value="Details">Детали</MenuItem>
          <MenuItem value="Methods">Методы производства</MenuItem>
        </Select>
      </FormControl>
      <TextField
        type="file"
        style={{ paddingTop: "40px" }}
        id="outlined-basic"
        variant="outlined"
      />
      <Button
        disabled={!body.inputValid || !effect.inputValid || area === ""}
        style={{ marginTop: "40px" }}
        variant="contained"
      >
        Отправить
      </Button>
    </form>
  );
};

export default SendDeshboard;
