/* eslint-disable prettier/prettier */
import CustomButton from "@/components/customButton";
import InputField from "@/components/inputField";
import OAuth from "@/components/oAuth";
import { icons, images } from "@/constants";
import { useSignUp } from "@clerk/clerk-expo";
import { Link, router } from "expo-router";
import { useState } from "react";
import { Image, ScrollView, Text, View } from "react-native";
import ReactNativeModal from "react-native-modal";

const SignUp = () => {
  const { isLoaded, signUp, setActive } = useSignUp();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [verification, setVerification] = useState({
    state: "success",
    error: "",
    code: "",
  });

  const signUpUser = async () => {
    if (!isLoaded) {
      return;
    }

    try {
      await signUp.create({
        emailAddress: form.email,
        password: form.password,
      });

      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });

      setVerification({
        ...verification,
        state: "pending",
      });
    } catch (err: any) {
      console.error(JSON.stringify(err, null, 2));
    }
  };

  const verifyUser = async () => {
    if (!isLoaded) {
      return;
    }

    try {
      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code: verification.code,
      });

      if (completeSignUp.status === "complete") {
        // save user to db
        await setActive({ session: completeSignUp.createdSessionId });
        setVerification({ ...verification, state: "success" });
      } else {
        setVerification({
          ...verification,
          state: "failed",
          error: "verification failed",
        });
        console.error(JSON.stringify(completeSignUp, null, 2));
      }
    } catch (err: any) {
      setVerification({
        ...verification,
        state: "failed",
        error: err?.errors[0]?.longMessage,
      });
    }
  };

  return (
    <ScrollView className="flex-1 bg-white">
      <View className="flex-1 bg-white">
        <View className="relative w-full h-64">
          <Image source={images.signUpCar} className="z-0 w-full h-64" />
          <Text className="text-2xl font-JakartaSemiBold text-black absolute bottom-5 left-5">
            Create Your Account
          </Text>
        </View>
        <View className="p-5">
          <InputField
            label="Name"
            placeholder="Enter your full name"
            icon={icons.person}
            value={form.name}
            onChangeText={(value: string) => {
              setForm({ ...form, name: value });
            }}
          />
          <InputField
            label="Email"
            placeholder="Enter your email address"
            icon={icons.email}
            value={form.email}
            onChangeText={(value: string) => {
              setForm({ ...form, email: value });
            }}
          />
          <InputField
            label="Password"
            placeholder="Enter your password"
            icon={icons.lock}
            value={form.password}
            onChangeText={(value: string) => {
              setForm({ ...form, password: value });
            }}
          />
          <CustomButton
            title="Sign Up"
            onPress={signUpUser}
            className={"mt-6"}
          />

          <OAuth />
          <Link
            href={"/sign-in"}
            className="text-lg text-center text-general-200 mt-10"
          >
            <Text>Already have an Account? </Text>
            <Text className="text-primary-500">Log In</Text>
          </Link>
        </View>

        <ReactNativeModal isVisible={verification.state === "success"}>
          <View className="bg-white rounded-2xl px-7 py-9 min-h-[300px]">
            <Image source={images.check} className="w-28 h-28 mx-auto  my-5" />
            <Text className="text-3xl font-JakartaBold text-center">
              Verified
            </Text>
            <Text className="text-base text-gray-400 font-Jakarta text-center mt-2">
              You have sucessfully verified your account
            </Text>
            <CustomButton
              title="Continue"
              onPress={() => router.replace("/(root)/(tabs)/home")}
              className="mt-5"
            />
          </View>
        </ReactNativeModal>
      </View>
    </ScrollView>
  );
};

export default SignUp;
