import { Species } from "@rrrcn/common-types/strapi/models/Species";
import React, { PropsWithChildren } from "react";
import { WithLocalesMap } from "@rrrcn/common-types/strapi/custom-models/with-localizations";
import { useLang } from "@/utils/translations/context";
import { PaperProps } from "@mui/material";
import {
  SpeciesItemContainer,
  SpeciesItemImage,
  SpeciesItemTitle,
  SpeciesItemTitleRowContainer,
} from "./style";
import { PaperTypeMap } from "@mui/material/Paper/Paper";
import BirdPlaceholder from "@/assets/images/bird_placeholder.png";
export type CommonSpeciesItemProps<
  RootComponent extends React.ElementType = PaperTypeMap["defaultComponent"],
  AdditionalProps = {}
> = {
  species: WithLocalesMap<Species>;
  containerProps?: PaperProps<RootComponent, AdditionalProps>;
};

export const CommonSpeciesItem = <
  RootComponent extends React.ElementType = PaperTypeMap["defaultComponent"],
  AdditionalProps = {}
>({
  containerProps,
  species,
  children,
}: PropsWithChildren<
  CommonSpeciesItemProps<RootComponent, AdditionalProps>
>) => {
  const { lang } = useLang();
  return (
    <SpeciesItemContainer {...containerProps}>
      <SpeciesItemTitleRowContainer>
        <SpeciesItemImage
          width={64}
          height={64}
          alt={species?.localesMap[lang]?.name || "Bird"}
          src={
            species.image?.url
              ? new URL(
                  species.image?.url,
                  process.env.NEXT_PUBLIC_API_BASE_PATH
                ).href
              : BirdPlaceholder
          }
        />
        <SpeciesItemTitle>{species?.localesMap[lang]?.name}</SpeciesItemTitle>
      </SpeciesItemTitleRowContainer>
      {children}
    </SpeciesItemContainer>
  );
};
