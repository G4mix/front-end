import { FontAwesomeIcon, FontAwesomeIconProps } from "@fortawesome/react-fontawesome";
import * as HeroIconsSolid from "@heroicons/react/24/solid";
import { IconDefinition as SolidIconDefinition } from "@fortawesome/free-solid-svg-icons";
import { IconDefinition as BrandIconDefinition } from "@fortawesome/free-brands-svg-icons";
import React from "react"

type HeroIconProps = React.SVGProps<SVGSVGElement> & {
  title?: string | undefined;
  titleId?: string | undefined;
};

type IconProps = {
  icon: BrandIconDefinition | SolidIconDefinition | keyof typeof HeroIconsSolid;
};

function IconFontAwesome({ icon, ...props }: Omit<FontAwesomeIconProps, "icon"> & IconProps) {
  return <FontAwesomeIcon {...props} icon={icon as BrandIconDefinition | SolidIconDefinition} />;
}

function IconHero({ icon, ...props }: Omit<HeroIconProps, "ref"> & IconProps) {
  const HeroIcon = HeroIconsSolid[icon as keyof typeof HeroIconsSolid];
  return <HeroIcon {...props} />;
}

export const Icon = {
  Hero: IconHero,
  FontAwesome: IconFontAwesome
};
