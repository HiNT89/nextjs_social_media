import { FeedItemProps, NextPageWithLayout } from "@/models/common";
import { MainLayout } from "components/layout/main";
import { Stack } from "@mui/material";
import { Friends } from "@/components/common";
import { Feeds } from "@/components/post/feeds";
import React, { useCallback, useEffect, useState } from "react";
import { usePost } from "@/hooks";
const Home: NextPageWithLayout = () => {
  const [pageIndex, setPageIndex] = useState(1);
  const { postList } = usePost({
    _page: pageIndex,
  });
  const [dataListPosts, setDataListPosts] = useState<Array<FeedItemProps> | []>(
    [],
  );

  const incrementPage = useCallback(() => {
    setPageIndex(pageIndex + 1);
  }, [pageIndex]);
  useEffect(() => {
    if (typeof postList === "object")
      setDataListPosts([...dataListPosts, ...postList]);
  }, [postList]);
  return (
    <Stack
      component={"div"}
      flexGrow={1}
      direction={"row"}
      maxWidth={"100%"}
      gap={2}
    >
      <Feeds
        data={dataListPosts}
        incrementPage={incrementPage}
       
      />
      <Friends />
    </Stack>
  );
};
Home.layout = MainLayout;

export default Home;
