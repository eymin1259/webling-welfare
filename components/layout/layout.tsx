import { FC, ReactNode, useEffect, useMemo } from "react";
import styled from "@emotion/styled";
import TabBar from "@/components/layout/tabBar";
import { useAuth } from "hooks/common/useAuth";
import Header from "./header";
import Sidebar from "./sidebar";
import { Loading } from "../common/loading";
import { useRouter } from "next/router";

interface ILayoutContainerProps {
  isManagerMode: boolean;
}

export const Layout: FC<{ children: ReactNode }> = ({ children }) => {
  const { isLogin, userInfo, isLoading } = useAuth();
  const router = useRouter();
  const isManagerMode = useMemo(() => {
    return isLogin === "true" && userInfo.isManager;
  }, [isLogin, userInfo.isManager]);

  const isEmployeeMode = useMemo(() => {
    return isLogin === "true" && !userInfo.isManager;
  }, [isLogin, userInfo.isManager]);

  if (isLogin === "unknown") return <Loading />;

  return (
    <LayoutContainer isManagerMode={isManagerMode}>
      {isManagerMode && <Sidebar />}
      <MainContainer isManagerMode={isManagerMode}>
        {isLogin === "true" && <Header />}
        {children}
      </MainContainer>
      {isEmployeeMode && <TabBar />}
    </LayoutContainer>
  );
};

const LayoutContainer = styled.div`
  display: flex;
  flex-direction: ${(props: ILayoutContainerProps) =>
    props.isManagerMode ? "row" : "column"};
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 100vh;
  background-color: floralwhite;

  .layout-tabBar {
    width: 480px;
  }
`;

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;

  height: 100%;
  width: ${(props: ILayoutContainerProps) =>
    props.isManagerMode ? "80%" : "480px"};
  padding-bottom: ${(props: ILayoutContainerProps) =>
    props.isManagerMode ? "0" : "80px"};
  background-color: white;
`;
