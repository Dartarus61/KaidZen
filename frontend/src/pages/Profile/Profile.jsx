import React from "react";
import Menu from "../../UI/Menu/Menu";
import ProfileDashboard from "../../components/ProfileDashboard/ProfileDashboard";

const Profile = () => {
  return (
    <Menu head="Профиль">
      <ProfileDashboard />
    </Menu>
  );
};

export default Profile;
