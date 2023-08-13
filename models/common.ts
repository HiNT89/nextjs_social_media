import { NextPage } from "next";
import { AppProps } from "next/app";
import { ReactElement, ReactNode } from "react";
import { EmotionCache } from "@emotion/react";
export interface LayoutProps {
  children: ReactNode;
}

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  layout?: (props: LayoutProps) => ReactElement;
};

export type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
  emotionCache?: EmotionCache;
};

export interface InformationProps {
  _id: string;
  middleName: string;
  lastName: string;
  firstName: string;
  gender: string;
  birthday: string | null;
  phoneNumber: string;
  avatar: string;
}
export interface FeedItemProps {
  _id: string;
  userID: InformationProps;
  createdAt: string;
  type: string;
  description: string;
  mediaURL: string;
  commentIDs: string[];
  interaction: {
    share: string[];
    like: string[];
  };
}
export interface FeedDetailProps {
  _id: string;
  userID: InformationProps;
  createdAt: string;
  type: string;
  description: string;
  mediaURL: string;
  commentIDs: {
    avatar: string;
    firstName: string;
    lastName: string;
    middleName: string;
    _id: string;
    userID: string;
    reply: null | string;
    comment: string;
    createdAt: string;
  }[];
  interaction: {
    share: string[];
    like: string[];
  };
}
export interface FriendsProps {
  _id: string;
  middleName: string;
  lastName: string;
  firstName: string;
  gender: string;
  birthday: string | null;
  phoneNumber: string;
  avatar: string;
}

export interface SendContentProps {
  placeholder: string;
  handleOnChange: (value: string) => void;
  value: string;
  handleSubmit: () => void;
}
