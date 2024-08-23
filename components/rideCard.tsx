/* eslint-disable prettier/prettier */

import { icons } from "@/constants";
import { formatDate, formatTime } from "@/lib/utils";
import { Ride } from "@/types/type";
import { Image, Text, View } from "react-native";

const RideCard = ({
  ride: {
    destination_latitude,
    destination_longitude,
    origin_address,
    destination_address,
    created_at,
    ride_time,
    driver,
    payment_status,
  },
}: {
  ride: Ride;
}) => {
  return (
    <View className="flex flex-row items-center justify-center bg-white shadow-sm shadow-neutral-300 mb-3 rounded-lg">
      <View className="flex flex-col justify-center items-center p-3">
        <View className="flex flex-row justify-between items-center">
          <Image
            source={{
              uri: `${process.env.EXPO_PUBLIC_GEO_APIFY_URL}:${destination_longitude},${destination_latitude}&Zoom=14&apiKey=${process.env.EXPO_PUBLIC_GEO_APIFY_KEY}`,
            }}
            className="w-20 h-24 rounded-lg"
          />
          <View className="flex flex-col mx-5 gap-y-5 flex-1">
            <View className="flex flex-row items-center gap-x-2">
              <Image source={icons.to} className="w-5 h-5" />
              <Text className="text-base font-JakartaMedium" numberOfLines={1}>
                {origin_address}
              </Text>
            </View>
            <View className="flex flex-row items-center gap-x-2">
              <Image source={icons.point} className="w-5 h-5" />
              <Text className="text-base font-JakartaMedium" numberOfLines={1}>
                {destination_address}
              </Text>
            </View>
          </View>
        </View>
        <View className="flex flex-col w-full mt-5 bg-general-500 p-3 items-start justify-center rounded-lg">
          <View className="flex flex-row items-center w-full justify-between mb-5">
            <Text className="text-base font-JakartaMedium text-gray-500">
              Date & Time
            </Text>
            <Text className="text-base font-JakartaMedium text-gray-500">
              {formatDate(created_at)}, {formatTime(ride_time)}
            </Text>
          </View>
          <View className="flex flex-row items-center w-full justify-between mb-5">
            <Text className="text-base font-JakartaMedium text-gray-500">
              Driver
            </Text>
            <Text className="text-base font-JakartaMedium text-gray-500">
              {driver.first_name} {driver.last_name}
            </Text>
          </View>
          <View className="flex flex-row items-center w-full justify-between mb-5">
            <Text className="text-base font-JakartaMedium text-gray-500">
              Seats
            </Text>
            <Text className="text-base font-JakartaMedium text-gray-500">
              {driver.car_seats}
            </Text>
          </View>
          <View className="flex flex-row items-center w-full justify-between mb-5">
            <Text className="text-base font-JakartaMedium text-gray-500">
              Payment Status
            </Text>
            <Text
              className={`text-base font-JakartaMedium text-gray-500 ${payment_status === "paid" ? "text-green-500" : "text-red-500"} capitalize`}
            >
              {payment_status}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default RideCard;
