import React from "react";
import Menu from "../Menu/Menu";
import s from "./Profile.module.css";

const Profile = () => {
  return (
    <div className={s.container}>
      <Menu />
      <div className={s.containerProfile}>
        <span>Профиль</span>
      </div>
    </div>
  );
};

export default Profile;
