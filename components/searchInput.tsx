import { GoogleInputProps } from "@/types/type";
import { Text, View } from "react-native";

const SearchInput = ({
  icon,
  initialLocation,
  containerStyle,
  handlePress,
  textInputBackgroundColor,
}: GoogleInputProps) => {
  return (
    <View
      className={`flex flex-row items-center justify-center relative z-50 rounded-xl mb-5 ${containerStyle}`}
    >
      <Text>SearchInput</Text>
    </View>
  );
};

export default SearchInput;
