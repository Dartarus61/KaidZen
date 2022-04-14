import React from "react";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

const Loader = () => {
  return (
    <Backdrop
      sx={{
        color: "#fff",
        position: "fixed",
        zIndex: (theme) => theme.zIndex.drawer + 999,
      }}
      open={true}
    >
      <CircularProgress color="inherit" />
    </Backdrop>
  );
};

export default Loader;
