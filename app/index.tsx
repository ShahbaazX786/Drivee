/* eslint-disable prettier/prettier */
import { Redirect } from "expo-router";

const MainPage = () => {
  // just redirect to welcome page in auth layout
  return <Redirect href="/(auth)/welcome" />;
};

export default MainPage;
