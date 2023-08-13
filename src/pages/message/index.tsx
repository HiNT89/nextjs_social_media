import { NextPageWithLayout } from "@/models/common";
import { MainLayout } from "components/layout/main";
import { Stack } from "@mui/material";
import { BoxMessage, BoxUsers } from "@/components/message";
import { useRouter } from "next/router";
import MessageMobile from "./message-mobile";
import { useEffect, useState } from "react";
import { useMessage } from "@/hooks";
const Message: NextPageWithLayout = () => {
  const router = useRouter();
  const { listMessage } = useMessage();
  const [isMobileScreen, setIsMobileScreen] = useState(false);
  useEffect(() => {
    setIsMobileScreen(window.outerWidth < 768);
  }, []);
  if (isMobileScreen) return <MessageMobile />;
  return (
    <Stack
      direction="row"
      width={"100%"}
      bgcolor={"primary.dark"}
      sx={{ borderRadius: "12px" }}
      p={{ xs: 1, sm: 2 }}
      gap={4}
      height={"calc(100vh - 74px)"}
    >
      <BoxUsers
        listUser={listMessage ?? []}
        pathname={router.query.boxMessageID}
      />
      <BoxMessage
        notification={"change one box message"}
        value={""}
        handleOnChange={(value: string) => {}}
        handleSubmit={() => {}}
      />
    </Stack>
  );
};

Message.layout = MainLayout;

export default Message;
