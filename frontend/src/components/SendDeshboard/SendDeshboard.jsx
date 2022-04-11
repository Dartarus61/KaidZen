import React, { useContext, useState } from "react";
import { useInput } from "../../items/hooks/useInput";
import InputList from "../InputList/InputList";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { Button, TextField } from "@mui/material";
import s from "./SendDeshboard.module.css";
import Loader from "../../UI/Loader/Loader";
import { AuthContext } from "../../items/context/context";
import axios from "axios";

const SendDeshboard = () => {
  const { isAuth } = useContext(AuthContext);
  const body = useInput("", { isEmpty: true });
  const effect = useInput("", { isEmpty: true });
  const [area, setArea] = useState("");
  const [targetFile, setTargetFile] = useState("");
  const [isLoading, setIsLoading] = useState(false);

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

  const handleChange = (event) => {
    setArea(event.target.value);
  };

  const pushForm = async (e) => {
    e.preventDefault();
    console.log(1);
    setIsLoading(true);
    await axios
      .post("api/offer", {
        description: body.value,
        economic: effect.value,
        area_of_improvement: area,
        id: isAuth.data.id,
      })
      .then(function (response) {
        console.log(response.data);
        setIsLoading(false);
      })
      .catch(function (error) {
        console.log(error);
      })
      .finally(function (error) {
        setIsLoading(false);
      });
  };

  return (
    <form className={s.container}>
      {isLoading && <Loader />}
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
        value={targetFile}
        onChange={(e) => {
          setTargetFile(e.target.value);
        }}
        style={{ paddingTop: "40px" }}
        id="outlined-basic"
        variant="outlined"
      />
      <Button
        disabled={!body.inputValid || !effect.inputValid || area === ""}
        style={{ marginTop: "40px" }}
        onClick={(e) => pushForm(e)}
        variant="contained"
      >
        Отправить
      </Button>
    </form>
  );
};

export default SendDeshboard;
