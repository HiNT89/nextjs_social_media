import { BoxUserItem } from "@/components/message/box-user-item";
import React from "react";

import { useRouter } from "next/router";
import { Stack } from "@mui/material";
import { useMessage, ListMessage } from "@/hooks";
export interface IAppProps {}

export default function MessageMobile() {
  const router = useRouter();
  const pathname = router.query.pathname;
  const { listMessage } = useMessage();
  return (
    <Stack
      component="aside"
      sx={{
        width: "100%",
        borderRadius: "8px",
        backgroundColor: "#fff",
        boxShadow: { sm: "5px 5px 5px 5px #ccc" },
        p: 2,
        overflow: "auto",
      }}
      maxHeight={"calc(100vh - 120px)"}
      className="customScroll"
    >
      <Stack direction="column" gap={2} pt={2}>
        {(listMessage ?? []).map((item: ListMessage) => (
          <BoxUserItem
            key={item._id}
            data={item}
            isActive={pathname === item._id}
          />
        ))}
      </Stack>
    </Stack>
  );
}
