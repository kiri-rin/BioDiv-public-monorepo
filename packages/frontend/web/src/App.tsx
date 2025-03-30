import React from "react";
import "./App.css";
import { Provider } from "react-redux";
import store from "./store";
import { styled } from "@mui/material";
import "./components/common.scss";
import { QueryClient, QueryClientProvider } from "react-query";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { RootRouter } from "@/navigation";

export const Offset = styled("div")(({ theme }) => theme.mixins.toolbar);
const queryClient = new QueryClient();
function App() {
  // useLoadUserQuery({});
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <QueryClientProvider client={queryClient}>
        <RootRouter />
      </QueryClientProvider>
    </LocalizationProvider>
  );
}
const Wrapper = () => (
  <Provider store={store}>
    <App />
  </Provider>
);

export default Wrapper;
