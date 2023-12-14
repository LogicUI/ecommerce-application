import React from "react";
import WithAuth from "../higherOrderComponents/withAuth";
import { useAuth } from "../context/authContext";
import Header from "../components/Header";

const HomePage = () => {
  const { user } = useAuth();
  return (
    <div>
      <Header />
      <h1>Welcome, user with UID {user?.uid}</h1>
      <p>This is the home page, and its protected!</p>
    </div>
  );
};

export default HomePage;
