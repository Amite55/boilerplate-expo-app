import { Dimensions } from "react-native";

export const PrimaryColor = "#FF6600";
export const BaseColor = "#FFF4ED";

export const _HEIGHT = Dimensions.get("screen").height;
export const _WIDTH = Dimensions.get("screen").width;
export const bytesToMB = (bytes: number) => {
  return (bytes / (1024 * 1024)).toFixed(2);
};
