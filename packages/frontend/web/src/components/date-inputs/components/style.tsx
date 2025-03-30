import styled from "@emotion/styled";
import { CommonContainerWithError } from "@/components/common/common";

export const RepeatedDateInputContainer = styled(CommonContainerWithError)`
  padding: 8px;
  border: 1px solid;
  overflow: hidden;
  flex: 1;
  position: relative;
`;
export const RepeatedDateInputYearContainer = styled(CommonContainerWithError)`
  display: flex;
  flex-direction: row;
  gap: 8px;
  width: 100%;
  flex: 1;
  flex-wrap: wrap;
`;
