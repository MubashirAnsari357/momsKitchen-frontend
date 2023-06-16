import { useDispatch, useSelector } from "react-redux";
import React, { useEffect } from "react";
import { StatusBar } from "react-native";
import { loadUser } from "./redux/actions/userAction";
import UserStackNavigation from "./navigation/UserStackNavigation";
import ChefStackNavigation from "./navigation/ChefStackNavigation";

const Main = () => {
  
  const { isAuthenticated, user } = useSelector(
    (state) => state.auth
  );
  const dispatch = useDispatch();

  useEffect(() => {
      dispatch(loadUser());
  }, [dispatch]);


  return (
    <>
    <StatusBar barStyle="dark-content" backgroundColor="white" />
    {!isAuthenticated || isAuthenticated === undefined ? <UserStackNavigation /> :
      (isAuthenticated && user?.userType == "Chef") ? (
        <ChefStackNavigation />
      ) : (
        <UserStackNavigation />
      )}
    </>
  );
};

export default Main;
