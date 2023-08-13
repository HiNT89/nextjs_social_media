import React, { memo } from "react";
import { Stack, Avatar, Button, Input } from "@mui/material";
import { Send } from "@mui/icons-material";
import Image from "next/image";
import { SendContentProps } from "@/models";
import { useAuth } from "@/hooks";
function SendContent({
  placeholder,
  handleOnChange,
  value,
  handleSubmit,
}: SendContentProps) {
  const { user } = useAuth();
  return (
    <Stack
      component="form"
      direction="row"
      justifyContent="space-between"
      gap={2}
    >
      <Avatar alt={user?.lastName} sx={{ width: "32px", height: "32px" }}>
        <Image src={user?.avatar} alt="avatar" width={60} height={60} />
      </Avatar>
      <Stack
        flexGrow={1}
        direction="row"
        gap={{
          xs: 0.5,
          sm: 1,
        }}
      >
        <Input
          sx={{ flexGrow: "1" }}
          placeholder={placeholder}
          value={value}
          onChange={(e) => {
            handleOnChange(e.target.value);
          }}
        />
      </Stack>
      <Button
        variant="contained"
        color="primary"
        className="hover:shadow-md"
        sx={{
          minWidth: {
            xs: "44px",
            sm: "64px",
          },
        }}
        onClick={handleSubmit}
      >
        <Send />
      </Button>
    </Stack>
  );
}
export default memo(SendContent);
