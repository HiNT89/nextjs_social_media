import { Stack } from "@mui/material";
import React from "react";
import { BoxUserItem } from "./box-user-item";
import { ListMessage } from "@/hooks";

export function BoxUsers({
  listUser,
  pathname,
}: {
  listUser: any;
  pathname: string | string[] | undefined;
}) {
  return (
    <Stack
      component="aside"
      sx={{
        width: { sm: "35%" },
        borderRadius: "8px",
        backgroundColor: "#fff",
        boxShadow: { sm: "5px 5px 5px 5px #ccc" },
        p: 2,
        overflow: "auto",
      }}
      className="customScroll"
    >
      <Stack direction="column" gap={2} pt={2}>
        {listUser.map((item: ListMessage) => (
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
