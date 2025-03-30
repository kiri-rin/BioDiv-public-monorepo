import { PropsWithChildren } from "react";
import {
  CabinetLayoutContainer,
  CabinetLayoutInnerContainer,
  CabinetLayoutInnerInnerContainer,
  CabinetLayoutMenu,
  CabinetLayoutMenuItem,
  CabinetLayoutMenuLogoutButton,
} from "@/features/user/cabinet/style";
import { routes } from "@/navigation/routes";
import { useMatch } from "react-router-dom";
import { useLogoutMutation } from "@/store/user";
import { useTranslations } from "@/utils/translations";

export const CabinetLayout = (props: PropsWithChildren) => {
  const [logout] = useLogoutMutation();
  const strings = useTranslations();
  return (
    <CabinetLayoutContainer>
      <CabinetLayoutInnerContainer>
        <CabinetLayoutInnerInnerContainer>
          <CabinetLayoutMenu>
            <NavigationLink to={routes.CabinetInfo}>
              {strings["cabinet.navigation-info"]}
            </NavigationLink>
            <NavigationLink to={routes.CabinetResults}>
              {strings["cabinet.navigation-results"]}
            </NavigationLink>
            <CabinetLayoutMenuLogoutButton
              onClick={() => {
                logout({});
              }}
            >
              {strings["cabinet.navigation-logout"]}
            </CabinetLayoutMenuLogoutButton>
          </CabinetLayoutMenu>
          {props.children}
        </CabinetLayoutInnerInnerContainer>
      </CabinetLayoutInnerContainer>
    </CabinetLayoutContainer>
  );
};
const NavigationLink = ({
  to,
  children,
}: PropsWithChildren<{ to: string }>) => {
  const match = useMatch(to);
  return (
    <CabinetLayoutMenuItem selected={!!match} to={to}>
      {children}
    </CabinetLayoutMenuItem>
  );
};
