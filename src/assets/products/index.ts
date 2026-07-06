import camProBlack from "./cam_pro_black.png";
import camProWhite from "./cam_pro_white.png";
import camV2Black from "./cam_v2_black.png";
import camV2White from "./cam_v2_white.png";
import camV3Black from "./cam_v3_black.png";
import camV3White from "./cam_v3_white.png";
import camV4Black from "./cam_v4_black.png";
import camV4Gray from "./cam_v4_gray.png";
import camV4White from "./cam_v4_white.png";
import doorbell from "./doorbell.png";
import microSd from "./micro_sd.png";
import senseHub from "./sense_hub.png";
import senseMotion from "./sense_motion.png";
import type { ProductAssetKey } from "../../types/bundle";

export const productAssetMap: Record<ProductAssetKey, string> = {
  "cam-pro-black": camProBlack,
  "cam-pro-white": camProWhite,
  "cam-v2-black": camV2Black,
  "cam-v2-white": camV2White,
  "cam-v3-black": camV3Black,
  "cam-v3-white": camV3White,
  "cam-v4-black": camV4Black,
  "cam-v4-gray": camV4Gray,
  "cam-v4-white": camV4White,
  doorbell,
  "micro-sd": microSd,
  "sense-hub": senseHub,
  "sense-motion": senseMotion,
};
