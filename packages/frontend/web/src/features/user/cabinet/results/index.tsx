import { userResultsReduxApi } from "@/store/results";
import React, { useEffect, useState } from "react";
import {
  CabinetUsersResultsContainer,
  CabinetUsersResultsContainerLoadingBackdrop,
  CabinetUsersResultsContainerLoadingIndicator,
  CabinetUsersResultsList,
  CabinetUsersResultsPagination,
} from "./style";
import { CabinetUsersResultItem } from "@/features/user/cabinet/results/components/item";
import { useSelector } from "react-redux";
import { RootState } from "@/store";

export const CabinetUsersResults = () => {
  const [page, setPage] = useState<number>(1);
  const userResults = useSelector((state: RootState) => state.userResults);

  const { data, isLoading, error, refetch } =
    userResultsReduxApi.useLoadResultsQuery(
      {
        page,
      },
      {}
    );
  useEffect(() => {
    refetch();
  }, []);

  return (
    <CabinetUsersResultsContainer>
      <CabinetUsersResultsPagination
        count={data?.pagination.pageCount || 1}
        page={page}
        onChange={(ev, value) => {
          setPage(Number(value));
        }}
      />
      <CabinetUsersResultsList>
        {userResults?.list?.map((it) => (
          <CabinetUsersResultItem item={it} />
        ))}
      </CabinetUsersResultsList>
      {isLoading && (
        <CabinetUsersResultsContainerLoadingBackdrop>
          <CabinetUsersResultsContainerLoadingIndicator />
        </CabinetUsersResultsContainerLoadingBackdrop>
      )}
    </CabinetUsersResultsContainer>
  );
};
