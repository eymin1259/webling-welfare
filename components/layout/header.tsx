import { memo, useMemo } from "react";
import styled from "@emotion/styled";
import { backgroundIcons } from "styles/baseSytle";
import { useRouter } from "next/router";
import { useRecoilState } from "recoil";
import { headerTitleAtom } from "store/atoms";

const Header = () => {
  const router = useRouter();
  const [headerTitle] = useRecoilState(headerTitleAtom);
  const hideBackBtn = useMemo(() => {
    return (
      router.pathname.includes("/manager") ||
      router.pathname.includes("/employee/menu/category") ||
      router.pathname.includes("/employee/mypage") ||
      router.pathname.includes("/employee/orderHistory")
    );
  }, [router.pathname]);

  return (
    <HeaderContainer showBackBtn={!hideBackBtn}>
      <span onClick={() => router.back()} />
      <p>{headerTitle}</p>
    </HeaderContainer>
  );
};

export default memo(Header);

interface IHeaderContainerProps {
  showBackBtn: boolean;
}
const HeaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-end;
  width: 100%;
  border-bottom: 1px solid lightgray;
  background-color: white;
  margin-bottom: 10px;
  padding-bottom: 10px;

  span {
    width: 35px;
    height: 30px;
    ${backgroundIcons};
    background-position: -29px -67px;
    cursor: pointer;
    margin: 10px 10px 20px;
    visibility: ${(props: IHeaderContainerProps) =>
      props.showBackBtn ? "visible" : "hidden"};
  }

  p {
    color: black;
    font-size: 1.7rem;
    font-weight: bolder;
    margin: 0 20px;
  }
`;
