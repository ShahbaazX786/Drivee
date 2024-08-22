/* eslint-disable prettier/prettier */
import { useAuth } from "@clerk/clerk-expo";
import { Redirect } from "expo-router";

const MainPage = () => {
  const { isSignedIn } = useAuth();

  if (isSignedIn) {
    return <Redirect href={"/(root)/(tabs)/home"} />;
  }
  // just redirect to welcome page in auth layout
  return <Redirect href="/(auth)/welcome" />;
};

export default MainPage;
