import { deviceShareAtom } from "@/store/deviceShare";
import { useAtom } from "jotai";

export const useDeviceShare = () => {
  const [deviceShare, setDeviceShare] = useAtom(deviceShareAtom, {
    delay: 1000,
  });

  return {
    deviceShare,
    setDeviceShare,
  };
};
