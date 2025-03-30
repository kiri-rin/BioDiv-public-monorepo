import {
  AppBar,
  Button,
  Dialog,
  DialogContent,
  MenuItem,
  Select,
  Toolbar,
} from "@mui/material";
import { LangType, setLangAction } from "@/store/lang/reducer";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import {
  TopMenuLoginButton,
  TopMenuRightButtons,
  TopMenuUserButton,
} from "@/features/top-menu/style";
import { useNavigate } from "react-router-dom";
import { routes } from "@/navigation/routes";
import PersonIcon from "@mui/icons-material/Person";
import { TopMenuResults } from "@/features/top-menu/components/results";
import { useTranslations } from "@/utils/translations";
export const TopMenu = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const lang = useSelector((state: RootState) => state.lang);
  const strings = useTranslations();
  const user = useSelector((state: RootState) => state.user);
  const [openLicense, setOpenLicense] = useState(false);
  const [copied, setCopied] = useState(false);
  const closeLicense = () => {
    setOpenLicense(false);
    setCopied(false);
  };
  return (
    <AppBar position="relative" style={{ zIndex: 10000 }}>
      <Toolbar>
        <Button
          size={"large"}
          variant={"contained"}
          style={{
            paddingLeft: 8,
            paddingRight: 8,
            paddingTop: 4,
            paddingBottom: 4,
            marginRight: 8,

            display: "flex",
            alignItems: "center",
          }}
          onClick={() => {
            navigate(routes.MainPage);
          }}
        >
          <img style={{ height: 32 }} src={"/logo.png"} />
          BioDiv
        </Button>
        <Select
          size={"small"}
          style={{ backgroundColor: "white" }}
          value={lang}
          onChange={({ target: { value } }) => {
            dispatch(setLangAction(value as LangType));
          }}
        >
          <MenuItem value={"en"}>en</MenuItem>
          <MenuItem value={"ru"}>ru</MenuItem>
        </Select>
        {/*<Button style={{ color: "white" }} href={"/instruction.pdf"}>*/}
        {/*  {strings["top-menu.instruction"]}*/}
        {/*</Button>*/}
        <Button
          style={{ color: "white" }}
          onClick={() => {
            setOpenLicense(true);
          }}
        >
          {strings["top-menu.license"]}
        </Button>
        <Dialog
          open={openLicense}
          onClose={() => {
            closeLicense();
          }}
        >
          <DialogContent style={{ display: "flex", flexDirection: "column" }}>
            <div>{strings["top-menu.license-text"]}</div>
            <div style={{ marginLeft: "auto", display: "flex" }}>
              <Button
                onClick={() => {
                  closeLicense();
                }}
              >
                {strings["common.close"]}
              </Button>
              <Button
                onClick={() => {
                  navigator.clipboard
                    .writeText(strings["top-menu.license-text"])
                    .then(() => {
                      setCopied(true);
                    });
                }}
              >
                {copied ? strings["common.copied"] : strings["common.copy"]}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
        <TopMenuRightButtons>
          {user ? (
            <>
              <TopMenuResults />
              <TopMenuUserButton
                onClick={() => {
                  navigate(routes.Cabinet);
                }}
              >
                <PersonIcon />
              </TopMenuUserButton>
            </>
          ) : (
            <TopMenuLoginButton onClick={() => navigate(routes.Login)}>
              Login
            </TopMenuLoginButton>
          )}
        </TopMenuRightButtons>
      </Toolbar>
    </AppBar>
  );
};
