import React from "react";
import Menu from "../Menu/Menu";
import s from "./Profile.module.css";
import ProfileDashboard from "./ProfileDashboard/ProfileDashboard";

const Profile = () => {
  return (
    <Menu head="Профиль">
      <ProfileDashboard />
    </Menu>
  );
};

export default Profile;
