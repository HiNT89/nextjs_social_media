import { MainLayout } from "@/components/layout";
import {
  Avatar,
  Stack,
  Typography,
  Box,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  TextField,
  Input,
} from "@mui/material";
import React, { useEffect, useState, useRef } from "react";
import Image from "next/image";
import { Upload } from "@mui/icons-material";
import { useAuth } from "@/hooks";
import { validateForm } from "@/utils";
import { uploadMedia } from "@/firebase";

function Setting() {
  const { user, update } = useAuth();
  // state
  const [isDisabled, setIsDisabled] = useState(true);
  const [imagePreview, setImagePreview] = useState(user.avatar);
  const [profile, setProfile] = useState({
    middleName: user.middleName,
    firstName: user.firstName,
    lastName: user.lastName,
    phoneNumber: user.phoneNumber,
    gender: user.gender,
    avatar: user.avatar,
    birthday: user.birthday,
  });
  const elementFileRef = useRef<FileList>();
  // effect
  useEffect(() => {
    const newIsDisable = validateForm(profile);
    setIsDisabled(newIsDisable);
  }, [profile]);
  // function
  const onChangeInput = (e: {
    target: {
      value: string;
      name: string;
    };
  }) => {
    const { name, value } = e.target;
    const newProfile = { ...profile, [name]: value };
    setProfile(newProfile);
  };
  const onSubmit = async () => {
    const files = elementFileRef.current?.[0];
    const payload = { ...profile };
    const fileName = files?.name || "";
    await uploadMedia(files, fileName)
      .then((data) => {
        payload.avatar = data;
      })
      .catch((e) => {
        console.log("error", e);
      });

    update(payload);
  };
  return (
    <Stack
      component={"article"}
      sx={{
        p: 4,
        backgroundColor: "primary.dark",
        borderRadius: "12px",
        overflow: "auto",
      }}
      maxHeight={{ xs: "calc(100vh - 120px)", sm: "calc(100vh - 74px)" }}
      flexGrow={1}
      className="customScroll"
    >
      <Typography component="h2" variant="h5" textTransform={"capitalize"}>
        edit profile
      </Typography>
      <Stack direction={"column"} component={"div"} gap={2} mt={2}>
        <Stack direction={"row"} alignItems={"flex-end"}>
          <Box sx={{ display: "none" }}>
            <Input
              type="file"
              id="file-avatar"
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                const { files } = event.target;
                const selectedFiles = files as FileList;
                elementFileRef.current = selectedFiles;
                if (selectedFiles?.[0]) {
                  const src = URL.createObjectURL(selectedFiles?.[0]);
                  setImagePreview(src);
                }
              }}
            />
          </Box>
          <Avatar sx={{ width: 100, height: 100 }}>
            <Image
              alt={profile.lastName}
              src={imagePreview}
              width={100}
              height={100}
            />
          </Avatar>
          <Box
            component={"label"}
            htmlFor="file-avatar"
            sx={{
              minWidth: "30px",
              width: "30px",
              borderRadius: "50%",
              transform: "translateX(-60%)",
              color: "primary.main",
            }}
            className="cursor-pointer"
          >
            <Upload />
          </Box>
        </Stack>
        <Stack direction={{ xs: "column", sm: "row" }} gap={2}>
          <TextField
            id="outlined-basic"
            label="First name"
            name="firstName"
            value={profile.firstName}
            onChange={(e) => onChangeInput(e)}
            variant="outlined"
          />
          <TextField
            id="outlined-basic"
            label="Middle name"
            name="middleName"
            value={profile.middleName}
            variant="outlined"
            onChange={(e) => onChangeInput(e)}
          />
          <TextField
            id="outlined-basic"
            label="Last name"
            name="lastName"
            value={profile.lastName}
            variant="outlined"
            onChange={(e) => onChangeInput(e)}
          />
        </Stack>
        <Stack direction={{ xs: "column", sm: "row" }} gap={2}>
          <TextField
            id="outlined-basic"
            label="Phone"
            name="phoneNumber"
            value={profile.phoneNumber}
            variant="outlined"
            onChange={(e) => onChangeInput(e)}
          />
        </Stack>
        <Stack direction={{ xs: "column", sm: "row" }} gap={2}>
          <Input
            type="date"
            name="birthday"
            value={profile.birthday}
            onChange={(e) => onChangeInput(e)}
          />
          <FormControl>
            <FormLabel id="demo-radio-buttons-group-label">Gender</FormLabel>
            <RadioGroup
              aria-labelledby="demo-radio-buttons-group-label"
              defaultValue="female"
              value={profile.gender}
              name="gender"
              onChange={(e) => onChangeInput(e)}
              row
            >
              <FormControlLabel
                value="female"
                control={<Radio />}
                label="Female"
              />
              <FormControlLabel value="male" control={<Radio />} label="Male" />
              <FormControlLabel
                value="other"
                control={<Radio />}
                label="Other"
              />
            </RadioGroup>
          </FormControl>
        </Stack>
        <Box>
          <Input
            type="submit"
            disabled={isDisabled}
            value={"Save"}
            sx={{
              backgroundColor: "primary.main",
              p: 1,
              borderRadius: "4px",
              color: "#fff",
              input: { cursor: "pointer" },
              "&:after,&:before": {
                display: "none",
              },
            }}
            onClick={onSubmit}
          />
        </Box>
      </Stack>
    </Stack>
  );
}
Setting.layout = MainLayout;
export default Setting;
