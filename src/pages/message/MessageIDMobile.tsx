import { BoxMessage } from "@/components/message";
import { useEffect, useState, useCallback } from "react";
import { Stack } from "@mui/material";
import { useMessageDetail, useMessage } from "@/hooks";
import { useRouter } from "next/router";
export interface IAppProps {}

export default function MessageIDMobile() {
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
  return (
    <Stack
      direction="row"
      width={"100%"}
      bgcolor={"primary.dark"}
      sx={{ borderRadius: "12px" }}
      p={{ xs: 0, sm: 2 }}
      gap={4}
      height={"calc(100vh - 120px)"}
    >
      <BoxMessage
        data={messageDetail}
        value={payloadSendMessage.content}
        handleOnChange={handleOnChange}
        handleSubmit={handleSubmit}
      />
    </Stack>
  );
}
