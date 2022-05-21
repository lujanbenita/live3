import { useRouter } from "next/router";
import styled from "@emotion/styled";

import { getIfLinkIsActive } from "utils/navigationUtils";
import Tab from "./Tab";

const StyledTab = styled(Tab)`
  ${({ disabled }) => disabled && "color: #162a3a;"}
`;

const TabsBar = ({
  tabs,
  extraClassTab = "",
  disabled = false,
  className = "",
}) => {
  const router = useRouter();

  const handleClick = (tab) => {
    if (!disabled) {
      router.push(tab.path);
    }
  };
  return (
    <div className={`c-tabs-bar ${className}`}>
      {tabs.map((tab) => (
        <StyledTab
          disabled={disabled}
          key={tab.id}
          label={tab.label}
          isActive={!disabled && getIfLinkIsActive(router, tab, tabs)}
          onClick={handleClick}
          className={`c-tabs-bar__tab ${extraClassTab}`}
          tab={tab}
        />
      ))}
    </div>
  );
};

export default TabsBar;
