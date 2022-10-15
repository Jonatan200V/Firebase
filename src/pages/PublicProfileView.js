import React from "react";
import { useParams } from "react-router-dom";

const PublicProfileView = () => {
  const { username } = useParams();
  const params = useParams();
  console.log(params);
  return <div>{username}</div>;
};

export default PublicProfileView;
