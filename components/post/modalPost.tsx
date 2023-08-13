import React, { useRef, useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Box, Avatar, Stack, Typography, Input, Button } from "@mui/material";
import Image from "next/image";
import { useAuth } from "@/hooks";
import { InsertPhoto } from "@mui/icons-material";
import { uploadMedia } from "@/firebase";
import { useRouter } from "next/router";
import { usePost } from "@/hooks/use-post";
export default function FormDialog({
  open,
  toggle,
}: {
  open: boolean;
  toggle: (value: boolean) => void;
}) {
  const { handleCreate } = usePost();
  const router = useRouter();
  const { user } = useAuth();
  const [isMedia, setIsMedia] = useState(false);
  const [dataInputs, setDataInputs] = useState({
    description: "",
    urlPreview: "",
    mediaURL: "",
  });
  const elementFileRef = useRef<FileList>();
  // function
  const onSubmit = async () => {
    toggle(false);
    const payload = {
      description: dataInputs.description,
      mediaURL: "",
    };
    const files = elementFileRef.current?.[0];
    if (isMedia) {
      const fileName = files?.name || "";
      await uploadMedia(files, fileName)
        .then((data) => {
          payload.mediaURL = data;
        })
        .catch((e) => {
          console.log("error", e);
        });
    }
    handleCreate(payload);
    setDataInputs({
      description: "",
      urlPreview: "",
      mediaURL: "",
    });
    router.push("/");
    setIsMedia(false);
  };
  return (
    <div>
      <Dialog
        open={open}
        onClose={() => {
          toggle(false);
          setDataInputs({
            description: "",
            urlPreview: "",
            mediaURL: "",
          });
          setIsMedia(false);
        }}
        className="box-create-posts"
      >
        <DialogTitle sx={{ fontSize: "2rem", color: "#4b8aff" }}>
          Create post
        </DialogTitle>

        <Box
          component="div"
          sx={{
            minWidth: {
              xs: "89vw",
              sm: "700px",
            },
          }}
        >
          <DialogContent>
            <Stack direction={"row"} gap={2} mb={3}>
              <Avatar alt={user?.lastName}>
                <Image src={user?.avatar} alt="avatar" width={60} height={60} />
              </Avatar>
              <Stack direction="column">
                <Typography
                  component="h3"
                  variant="h5"
                  sx={{
                    textTransform: "capitalize",
                    fontSize: {
                      xs: "0.8rem",
                      sm: "1rem",
                    },
                  }}
                >
                  {user?.firstName +
                    " " +
                    user?.middleName +
                    " " +
                    user?.lastName}
                </Typography>
                <Typography
                  component="span"
                  sx={{
                    fontSize: {
                      xs: "0.8rem",
                      sm: "1rem",
                    },
                  }}
                >
                  Public
                </Typography>
              </Stack>
            </Stack>
            <Box
              component="textarea"
              sx={{
                width: "100%",
                fontSize: {
                  xs: "1rem",
                  sm: "1.5rem",
                },
                outline: "none",
              }}
              placeholder="What is happening ?"
              value={dataInputs.description}
              onChange={(e) =>
                setDataInputs({ ...dataInputs, description: e.target.value })
              }
            ></Box>
            {isMedia ? (
              <Image
                alt="media"
                src={dataInputs.urlPreview}
                width={700}
                height={200}
              />
            ) : (
              <Box>
                <Box
                  component={"label"}
                  htmlFor="input-file"
                  sx={{ cursor: "pointer" }}
                >
                  <InsertPhoto />
                </Box>
                <Input
                  type="file"
                  id="input-file"
                  sx={{ display: "none" }}
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                    const { files } = event.target;
                    const selectedFiles = files as FileList;
                    elementFileRef.current = selectedFiles;
                    if (selectedFiles?.[0]) {
                      const src = URL.createObjectURL(selectedFiles?.[0]);
                      setDataInputs({ ...dataInputs, urlPreview: src });
                      setIsMedia(true);
                    }
                  }}
                />
              </Box>
            )}
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => {
                toggle(false);
                setDataInputs({
                  description: "",
                  urlPreview: "",
                  mediaURL: "",
                });
                setIsMedia(false);
              }}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              color="primary"
              className="hover:shadow-md"
              onClick={onSubmit}
            >
              post
            </Button>
          </DialogActions>
        </Box>
      </Dialog>
    </div>
  );
}
