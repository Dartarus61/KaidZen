import React from "react";
import Menu from "../../UI/Menu/Menu";
import GetSaggestionsDashboard from "../../components/GetSaggestionsDashboard/GetSaggestionsDashboard";

const SendSuggest = () => {
  return (
    <Menu head="Поступившие редложения">
      <GetSaggestionsDashboard />
    </Menu>
  );
};

export default SendSuggest;
