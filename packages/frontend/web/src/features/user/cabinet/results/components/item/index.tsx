import { Result } from "@rrrcn/common-types/strapi/models/Result";
import {
  CabinetUsersResultExpiresDate,
  CabinetUsersResultItemBottomRow,
  CabinetUsersResultItemContainer,
  CabinetUsersResultItemDate,
  CabinetUsersResultItemId,
  CabinetUsersResultItemInnerContainer,
  CabinetUsersResultItemLink,
  CabinetUsersResultItemLinksContainer,
  CabinetUsersResultItemStatus,
  CabinetUsersResultItemStatusRow,
  CabinetUsersResultItemTopRow,
  CabinetUsersResultItemType,
} from "@/features/user/cabinet/results/components/item/style";
import { BASE_PATH } from "@/api/constants";
import { format } from "date-fns";
import { useTranslations } from "@/utils/translations";

export const CabinetUsersResultItem = (props: { item: Result }) => {
  const link = `${BASE_PATH}/api/result/download/${props.item.uid}`;
  const logsLink = `${BASE_PATH}/api/result/logs/${props.item.uid}`;
  const strings = useTranslations();
  return (
    <CabinetUsersResultItemContainer>
      <CabinetUsersResultItemInnerContainer>
        <CabinetUsersResultItemTopRow>
          <CabinetUsersResultItemType>
            {props.item.type}
          </CabinetUsersResultItemType>
          <CabinetUsersResultItemId>#{props.item.id}</CabinetUsersResultItemId>
        </CabinetUsersResultItemTopRow>
        <CabinetUsersResultItemStatusRow>
          <CabinetUsersResultItemStatus
            $status={props.item.status || undefined}
          >
            {props.item.status}
          </CabinetUsersResultItemStatus>
          {(props.item.finished_at || props.item.createdAt) && (
            <CabinetUsersResultItemDate>
              {format(
                new Date((props.item.finished_at || props.item.createdAt)!),
                "dd.MM.yyyy HH:mm"
              )}
            </CabinetUsersResultItemDate>
          )}
        </CabinetUsersResultItemStatusRow>
        <CabinetUsersResultItemBottomRow>
          <CabinetUsersResultItemLinksContainer>
            {props.item.status === "completed" && (
              <CabinetUsersResultItemLink href={link}>
                {strings["cabinet-results.download"]}
              </CabinetUsersResultItemLink>
            )}
            <CabinetUsersResultItemLink href={logsLink} target={"__blank"}>
              {strings["cabinet-results.view-logs"]}
            </CabinetUsersResultItemLink>
            {props.item.expires_at ? (
              <CabinetUsersResultExpiresDate>
                {strings["cabinet-results.expires-in"]}
                {format(new Date(props.item.expires_at), "dd.MM.yyyy HH:mm")}
              </CabinetUsersResultExpiresDate>
            ) : (
              <CabinetUsersResultExpiresDate>
                {strings["cabinet-results.non-expires"]}
              </CabinetUsersResultExpiresDate>
            )}
          </CabinetUsersResultItemLinksContainer>
        </CabinetUsersResultItemBottomRow>
      </CabinetUsersResultItemInnerContainer>
    </CabinetUsersResultItemContainer>
  );
};
