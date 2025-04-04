import { SiAppletv } from "react-icons/si";
import { SiPrimevideo } from "react-icons/si";
import { BsGooglePlay } from "react-icons/bs";
import { GrYoutube } from "react-icons/gr";
import { TfiMicrosoft } from "react-icons/tfi";
import { BsFillTicketPerforatedFill } from "react-icons/bs";
import { MovieProviderShape } from "../../types";
import { ReactElement } from "react";

type ProviderLogosProps = {
  purchaseProviders: MovieProviderShape[];
};

type LogoMap = {
  [key: string]: ReactElement;
};

function ProviderLogos(props: ProviderLogosProps) {
  const logoMap: LogoMap = {
    "Amazon Video": (
      <div key={"amazon"} className="h-[50px] w-[50px] text-white mr-4">
        <SiPrimevideo className="h-[50px] w-[50px]" />
      </div>
    ),
    "Apple TV": (
      <div key={"apple"} className="h-[50px] w-[50px] text-white mr-2">
        <SiAppletv className="h-[50px] w-[50px]" />
      </div>
    ),
    "Google Play Movies": (
      <div
        key={"google"}
        className="h-[50px] w-[50px] text-white flex justify-center align-items-center"
      >
        <BsGooglePlay className="h-[30px] w-[30px]" />
      </div>
    ),
    YouTube: (
      <div
        key={"yt"}
        className=" h-[50px] w-[50px] text-white flex justify-center align-items-center"
      >
        <GrYoutube className="h-[30px] w-[30px] " />
      </div>
    ),
    "Fandango At Home": (
      <div
        key={"fah"}
        className="h-[50px] w-[50px] text-white flex justify-center align-items-center"
      >
        <BsFillTicketPerforatedFill className="h-[30px] w-[30px]" />
      </div>
    ),
    "Microsoft Store": (
      <div
        key={"ms"}
        className="h-[50px] w-[50px] text-white flex justify-center align-items-center"
      >
        <TfiMicrosoft className="h-[30px] w-[30px]" />
      </div>
    ),
  };
  return (
    <div className="flex align-center justify-center my-4">
      {props.purchaseProviders.map((provider: MovieProviderShape) => {
        return logoMap[provider.name];
      })}
    </div>
  );
}

export default ProviderLogos;
