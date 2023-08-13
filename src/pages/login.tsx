import { EmptyLayout } from "@/components/layout";
import EditUser from "@/components/user/edit";
import { useAuth } from "@/hooks";
import { Box, Button, Stack, TextField } from "@mui/material";
import { useRouter } from "next/router";
import React, { ChangeEvent, useState, useEffect } from "react";
import { validateForm } from "@/utils";
export default function LoginPage() {
  const { login } = useAuth();
  const [formInput, setFormInput] = useState({
    username: "hint1",
    password: "123",
  });
  const [isDisable, setIsDisable] = useState(true);
  useEffect(() => {
    const newIsDisable = validateForm(formInput);
    setIsDisable(newIsDisable);
  }, [formInput]);
  const router = useRouter();
  const handleSubmit = async () => {
    await login(formInput);
    router.push("/");
  };

  const handleInput = (
    evt: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = evt.target;
    setFormInput({ ...formInput, [name]: value });
  };
  const [isLogin, setIsLogin] = useState(true);
  const toggle = (value: boolean) => {
    setIsLogin(value);
  };
  return (
    <Stack
      component={"main"}
      sx={{
        px: { xs: 1 },
        maxWidth: "100vw",
        minHeight: "100vh",
        backgroundColor: "#181c23",
        justifyContent: "center",
        alignItems: "center",
        p: isLogin ? 0 : 3,
      }}
    >
      <Box
        sx={{
          width: {
            xs: "90%",
            sm: isLogin ? "50%" : "70%",
          },
          backgroundColor: "#fff",
          p: 2,
          borderRadius: "8px",
          color: "#000",
        }}
      >
        <Stack
          direction="row"
          sx={{
            backgroundColor: "#fff",
            p: 2,
            borderRadius: "8px",
          }}
        >
          <Box
            component="button"
            sx={{
              width: "50%",
              color: isLogin ? "#fff" : "#000",
              textTransform: "uppercase",
              fontWeight: "bold",
              backgroundColor: isLogin ? "primary.main" : "#fff",
              p: 1,
              transition: "all 0.3s",
              borderTopLeftRadius: "8px",
              borderBottomLeftRadius: "8px",
            }}
            onClick={() => toggle(true)}
          >
            login
          </Box>
          <Box
            component="button"
            sx={{
              width: "50%",
              color: !isLogin ? "#fff" : "#000",
              textTransform: "uppercase",
              fontWeight: "bold",
              p: 1,
              transition: "all 0.3s",
              backgroundColor: !isLogin ? "primary.main" : "#fff",
              borderTopRightRadius: "8px",
              borderBottomRightRadius: "8px",
            }}
            onClick={() => toggle(false)}
          >
            signup
          </Box>
        </Stack>
        <Box>
          <Stack
            component={"div"}
            direction="column"
            gap={2}
            sx={{
              p: 3,
              display: isLogin ? "flex" : "none",
            }}
          >
            <TextField
              id="outlined-basic"
              label="Username"
              variant="outlined"
              name="username"
              value={formInput.username}
              onChange={(evt) => handleInput(evt)}
            />
            <TextField
              id="outlined-basic"
              label="Password"
              variant="outlined"
              name="password"
              type="password"
              value={formInput.password}
              onChange={(evt) => handleInput(evt)}
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              onClick={handleSubmit}
              disabled={isDisable}
            >
              login
            </Button>
          </Stack>
          <EditUser isShow={!isLogin} toggle={toggle} />
        </Box>
      </Box>
    </Stack>
  );
}
LoginPage.layout = EmptyLayout;
