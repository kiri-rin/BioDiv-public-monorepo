import React from "react";
import {
  BrowserRouter,
  createBrowserRouter,
  Navigate,
  Outlet,
  Route,
  Routes,
} from "react-router-dom";
import { MainScreen } from "@/features/main";
import { LoginScreen } from "@/features/user/authorization/login";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import { CabinetLayout } from "@/features/user/cabinet";
import { CabinetUsersResults } from "@/features/user/cabinet/results";
import { CabinetInfo } from "@/features/user/cabinet/info";
import { TopMenu } from "@/features/top-menu";
import { userReduxApi } from "@/store/user";
import { CircularProgress } from "@mui/material";
import { RegistrationScreen } from "@/features/user/authorization/registration";

export const RootRouterWrapped = () => {
  const user = useSelector((state: RootState) => state.user);
  const isLoading = useSelector(
    (state: RootState) =>
      userReduxApi.endpoints.loadUser.select({})(state).isLoading
  );
  const isUserLoading = isLoading || user === undefined;
  return (
    <>
      <TopMenu />
      <Routes>
        {user ? (
          <>
            <Route index element={<MainScreen />} />
            {/*<Route path={"services"} element={<MainScreen />} />*/}
            <Route
              path={"login"}
              element={<Navigate to="/cabinet" replace={true} />}
            />
            <Route
              path={"registration"}
              element={<Navigate to="/cabinet" replace={true} />}
            />
            <Route
              path={"cabinet/*"}
              element={
                <CabinetLayout>
                  <Outlet />
                </CabinetLayout>
              }
            >
              <Route
                index
                path={""}
                element={<Navigate to="/cabinet/info" replace={true} />}
              />
              <Route path={"info"} element={<CabinetInfo />} />
              <Route path={"results"} element={<CabinetUsersResults />} />
            </Route>
          </>
        ) : (
          <>
            <Route path={"login"} element={<LoginScreen />} />
            <Route path={"registration"} element={<RegistrationScreen />} />
            {["*", "services", "cabinet/*"].map((path) => (
              <Route
                path={path}
                element={
                  isUserLoading ? (
                    <>
                      <CircularProgress />
                    </>
                  ) : (
                    <Navigate to="/login" replace={true} />
                  )
                }
              />
            ))}
          </>
        )}
      </Routes>
    </>
  );
};
const router = createBrowserRouter([
  {
    path: "/",
    element: <RootRouterWrapped />,
  },
]);
export const RootRouter = () => (
  <BrowserRouter>
    <RootRouterWrapped />
  </BrowserRouter>
);
