import PrimaryButton from "@/utils/PrimaryButton";
import { View } from "react-native";
import { useToastHelpers } from "../helpers/useToastHelpers";
import tw from "../lib/tailwind";

const Home = () => {
  const toast = useToastHelpers();
  return (
    <View style={tw`flex-1 justify-center items-center w-full pt-8`}>
      <PrimaryButton
        onPress={() => {
          toast.success(
            "sexxess........ sazzat vai ;laskjjjjjjjjjjjjjjjjjjjjjjdf",
          );
        }}
        buttonText="click me "
        buttonContainerStyle={tw`w-full`}
      />
    </View>
  );
};

export default Home;
