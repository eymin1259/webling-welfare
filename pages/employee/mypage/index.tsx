import { Button } from "@/components/common/btn";
import List from "@/components/common/list";
import ListItem from "@/components/common/listItem";
import { useAuth } from "hooks/common/useAuth";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useRecoilState } from "recoil";
import { headerTitleAtom } from "store/atoms";

export default function EmployeeMypagePage() {
  const [_, setHeaderTitle] = useRecoilState(headerTitleAtom);
  const { userInfo, logout } = useAuth();
  const router = useRouter();

  useEffect(() => {
    setHeaderTitle("마이페이지");
  }, []);

  return (
    <List>
      <ListItem>{`이름 : ${userInfo.name}`}</ListItem>
      <ListItem>{`쿠폰갯수 : ${userInfo.coupon}개`}</ListItem>
      <ListItem
        isclickable={true}
        onclick={async () => {
          await logout();
          router.push("/signin");
        }}
      >
        로그아웃
      </ListItem>
    </List>
  );
}
