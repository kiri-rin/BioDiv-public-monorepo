import styled from "@emotion/styled";
import { Drawer, Tab, Tabs } from "@mui/material";

import { CommonTabContainer } from "@/components/common/Tabs/style";

export const MainRightPanelComponent = styled(Drawer)`
  .MuiDrawer-paper {
    width: 400px;
    box-sizing: border-box;
    padding: 24px;
    height: 100%;
  }
`;
export const MainRightPanelTabs = styled(Tabs)``;
export const MainRightPanelTabItem = styled(Tab)``;
export const MainRightPanelTabContainer = styled(CommonTabContainer)``;
