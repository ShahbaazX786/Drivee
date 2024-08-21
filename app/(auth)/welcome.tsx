/* eslint-disable prettier/prettier */
import { onboardingData } from "@/constants";
import { router } from "expo-router";
import { useRef, useState } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Swiper from "react-native-swiper";
import CustomButton from "@/components/customButton";

const Onboarding = () => {
  const SwiperRef = useRef<Swiper>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const isLastSlide = activeIndex === onboardingData.length - 1;

  const navigateToSignup = () => {
    router.replace("/(auth)/sign-up");
  };

  return (
    <SafeAreaView className="flex h-full justify-between items-center bg-white">
      <TouchableOpacity
        onPress={navigateToSignup}
        className="w-full flex items-end p-5"
      >
        <Text className="text-black text-base font-JakartaBold">Skip</Text>
      </TouchableOpacity>
      <Swiper
        ref={SwiperRef}
        loop={false}
        dot={<View className="w-8 h-1 mx-1 bg-[#E2E8F0] rounded-full"></View>}
        activeDot={
          <View className="w-8 h-1 mx-1 bg-[#E286FF] rounded-full"></View>
        }
        onIndexChanged={(index) => setActiveIndex(index)}
      >
        {onboardingData.map((item) => (
          <View key={item.id} className="flex items-center justify-center p-5">
            <Image source={item.image} className="w-full h-80" />
            <View className="flex flex-row items-center justify-center w-full mt-10">
              <Text className="text-black text-3xl font-bold mx-10 text-center">
                {item.title}
              </Text>
            </View>
            <Text className="text-base font-JakartaSemiBold text-center mx-10 mt-3 text-[#858585]">
              {item.description}
            </Text>
          </View>
        ))}
      </Swiper>
      <CustomButton
        title={isLastSlide ? "Get Started" : "Next"}
        onPress={() =>
          isLastSlide
            ? router.replace("/(auth)/sign-up")
            : SwiperRef.current?.scrollBy(1)
        }
        className="w-11/12 mt-10 mb-5"
      />
    </SafeAreaView>
  );
};

export default Onboarding;
