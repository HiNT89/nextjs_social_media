import { ProfileThumbnailProps } from "@/models";
import { CloudUpload } from "@mui/icons-material";
import { Avatar, Box, Button, Stack, Typography, Input } from "@mui/material";
import Image from "next/image";
import { useState, useRef } from "react";
import { uploadMedia } from "@/firebase";
export function ProfileThumb({
  data,
  handleUpdate,
}: {
  data: ProfileThumbnailProps;
  handleUpdate: any;
}) {
  const { user, thumbURL, description } = data;
  const [imagePreview, setImagePreview] = useState(thumbURL);
  const [profile, setProfile] = useState({
    thumbnail: thumbURL,
    description: description,
  });
  const [isEdit, setIsEdit] = useState(false);
  const elementFileRef = useRef<FileList>();
  const handleSubmit = async () => {
    const files = elementFileRef.current?.[0];
    const payload = { ...profile };
    const fileName = files?.name || "";
    try {
      const data = await uploadMedia(files, fileName);
      payload.thumbnail = data;
      await handleUpdate(payload);
    } catch (e) {
      console.log(e);
    }

    setIsEdit(false);
  };
  console.log(thumbURL);
  return (
    <Stack
      direction="column"
      component={"article"}
      sx={{
        position: "relative",
        width: "100%",
        height: { xs: "35vh", sm: "40vh", lg: "70vh" },
        boxShadow: "5px 5px 5px #ccc",
        borderRadius: "12px",
      }}
      onClick={() => setIsEdit(true)}
    >
      <Box
        sx={{
          width: "100%",
          height: "70%",
          position: "relative",
          " > img": {
            borderRadius: "12px",
            width: "100%",
            height: "100%",
          },
        }}
      >
        <Image
          alt="thumbnail"
          src={imagePreview ?? thumbURL}
          width={500}
          height={100}
        />
        <Box
          component={"label"}
          htmlFor="file-avatar"
          sx={{
            minWidth: "30px",
            width: "30px",
            borderRadius: "50%",
            transform: "translateX(-60%)",
            color: "primary.main",
            position: "absolute",
            b: "1%",
            right: "5%",
          }}
          className="cursor-pointer"
        >
          <CloudUpload />
        </Box>
        <Input
          style={{ display: "none" }}
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
      <Box
        sx={{
          width: "100%",
          backgroundColor: "#fff",
          borderRadius: "12px",
          px: { xs: 2, sm: 4 },
          py: { xs: 1, sm: 3 },
          textTransform: "capitalize",
        }}
      >
        <Typography
          component={"h2"}
          sx={{
            fontSize: {
              xs: "1.5rem",
              sm: "2.5rem",
            },
          }}
          fontWeight={"600"}
        >
          {user?.firstName + " " + user?.middleName + " " + user?.lastName}
        </Typography>
        {!isEdit ? (
          <Typography
            component={"p"}
            sx={{
              color: "text.secondary",
              fontSize: "0.9rem",
            }}
          >
            {profile.description}
          </Typography>
        ) : (
          <Input
            sx={{
              color: "text.secondary",
              fontSize: "0.9rem",
            }}
            onChange={(e) =>
              setProfile({ ...profile, description: e.target.value })
            }
            value={profile.description}
          />
        )}
      </Box>
      <Box
        sx={{
          position: "absolute",
          backgroundColor: "#fff",
          p: 0.5,
          borderRadius: "50%",
          top: "70%",
          transform: "translate(50%,-85%)",
          "> div ": {
            width: { xs: "72px", sm: "100px" },
            height: { xs: "72px", sm: "100px" },
          },
        }}
      >
        <Avatar>
          <Image
            alt={user?.lastName}
            src={user?.avatar}
            width={200}
            height={200}
          />
        </Avatar>
      </Box>
      <Box
        sx={{
          position: "absolute",
          backgroundColor: "#fff",
          p: 0.5,
          borderRadius: "50%",
          bottom: "1%",
          right: "2%",
          display: isEdit ? "block" : "none",
        }}
      >
        <Button
          variant="contained"
          color="primary"
          sx={{
            textTransform: "capitalize",
            px: 0.5,
            py: 0.5,
          }}
          onClick={(e) => {
            e.stopPropagation();
            handleSubmit();
          }}
        >
          update
        </Button>
      </Box>
    </Stack>
  );
}
