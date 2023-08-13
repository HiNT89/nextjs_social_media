import { FeedItemProps, NextPageWithLayout } from "@/models/common";
import { MainLayout } from "components/layout/main";
import { Box, Stack, Typography } from "@mui/material";
import { useRouter } from "next/router";
import { useEffect, useMemo, useState } from "react";
import { ProfileThumb, ProfileInfo } from "@/components/profile";
import { useProfile } from "@/hooks";
import { ProfileInfoProps, ProfileThumbnailProps } from "@/models";

const Profile: NextPageWithLayout = () => {
  const { query } = useRouter();
  const { profile, handleUpdate } = useProfile(query.profileID);
  const dataProfileThumbnail: ProfileThumbnailProps = useMemo(
    () => ({
      user: profile?._id,
      thumbURL: profile?.thumbnail,
      description: profile?.description,
    }),
    [profile],
  );
  const dataProfileInfo: ProfileInfoProps = useMemo(() => {
    const listPostCovert = profile?.listPost?.map((it: FeedItemProps) => ({
      ...it,
      userID: profile?._id,
    }));
    return {
      user: profile?._id,
      listPost: (listPostCovert || []).reverse(),
      email: profile?.email,
      friends: profile?.friends,
    };
  }, [profile]);
  return (
    <Stack
      direction="column"
      gap={4}
      width={"100%"}
      px={{ xs: 0.5, md: 5 }}
      py={{ xs: 0, md: 2 }}
    >
      <ProfileThumb data={dataProfileThumbnail} handleUpdate={handleUpdate} />
      <ProfileInfo data={dataProfileInfo} />
    </Stack>
  );
};

Profile.layout = MainLayout;

export default Profile;
