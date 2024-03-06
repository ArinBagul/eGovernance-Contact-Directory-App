import { SvgXml } from "react-native-svg";

const CustomTabBarIcon = ({ icon, color, size }) => {
  return <SvgXml xml={icon} width={size} height={size} fill={color} />;
};

export default CustomTabBarIcon;