import { NextPageWithLayout } from "@/models/common";
import { MainLayout } from "components/layout/main";
import { Stack } from "@mui/material";
import { BoxMessage, BoxUsers } from "@/components/message";
import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/router";
import MessageIDMobile from "./MessageIDMobile";
import { useMessageDetail, useMessage } from "@/hooks";

const Message: NextPageWithLayout = () => {
  const router = useRouter();
  const { messageDetail, handleSendMessage } = useMessageDetail(
    router.query.boxMessageID,
  );
  const [payloadSendMessage, setPayloadSendMessage] = useState({
    content: "",
    reply: "",
    messageID: messageDetail?._id,
  });
  useEffect(() => {
    setPayloadSendMessage({
      content: "",
      reply: "",
      messageID: messageDetail?._id,
    });
  }, [messageDetail]);
  const { listMessage } = useMessage();
  const [isMobileScreen, setIsMobileScreen] = useState(false);
  useEffect(() => {
    setIsMobileScreen(window.outerWidth < 768);
  }, []);
  // function
  const handleOnChange = useCallback(
    (value: string) => {
      setPayloadSendMessage({ ...payloadSendMessage, content: value });
    },
    [payloadSendMessage],
  );
  const handleSubmit = useCallback(async () => {
    try {
      await handleSendMessage(payloadSendMessage);
      setPayloadSendMessage({ ...payloadSendMessage, content: "" });
    } catch (e) {
      console.log(e);
    }
  }, [payloadSendMessage, handleSendMessage]);
  if (isMobileScreen) return <MessageIDMobile />;
  return (
    <Stack
      direction="row"
      width={"100%"}
      bgcolor={"primary.dark"}
      sx={{ borderRadius: "12px" }}
      p={2}
      gap={4}
      height={{ xs: "calc(100vh - 120px)", sm: "calc(100vh - 74px)" }}
    >
      <BoxUsers
        listUser={listMessage ?? []}
        pathname={router.query.boxMessageID}
      />
      <BoxMessage
        data={messageDetail}
        value={payloadSendMessage.content}
        handleOnChange={handleOnChange}
        handleSubmit={handleSubmit}
      />
    </Stack>
  );
};

Message.layout = MainLayout;

export default Message;
