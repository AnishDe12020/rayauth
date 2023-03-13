import React from "react";
import { CiTwitter } from "react-icons/ci";
import { RxDiscordLogo } from "react-icons/rx";

type Props = {};

const Socials = (props: Props) => {
  const socialData = [
    {
      name: "Twitter",
      link: "https://twitter.com/rayauthhq",
      icon: <CiTwitter />,
      color: "text-blue-500",
    },
    {
      name: "Discord",
      link: "https://discord.gg/rayauthhq",
      icon: <RxDiscordLogo />,
      color: "text-purple-500",
    },
  ];
  return (
    <div className="text-white mx-auto w-full">
      <div className="flex items-center justify-center p-4 bg-slate-700">
        {socialData.map((social, key) => (
          <a
            className={`text-2xl mx-2 hover:${social.color}`}
            key={key}
            href={social.link}
          >
            {social.icon}
          </a>
        ))}
      </div>
    </div>
  );
};

export default Socials;
