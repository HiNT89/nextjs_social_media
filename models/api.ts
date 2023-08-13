import { FeedItemProps, InformationProps } from ".";

export interface PayloadSignup {
  roles: string[];
  username: string;
  email: string;
  password: string;
  middleName: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  gender: string;
  birthday: string;
}
export interface PayloadUpdate {
  middleName: string;
  firstName: string;
  lastName: string;
  avatar: string;
  phoneNumber: string;
  gender: string;
  birthday: string;
}
export interface PayloadLogin {
  username: string;
  password: string;
}
export interface ListResponse<T> {
  data: Array<T>;
}

export interface ListParams {
  _page: number;
  _limit: number;
}
export interface PayloadCreatePost {
  description: string;
  mediaURL: string;
}
export interface PayloadUpdatePost {
  interaction?: {
    like: string[];
    share: string[];
  };
  description?: string;
  type?: string;
  mediaUrl?: string;
}
export interface PayloadCommentCreate {
  commentContent: string;
  reply: string;
  postID: string;
}
export interface PayloadAddFriend {
  users: string[];
}
export interface PayloadUnFriend {
  users: string[];
  messageID: string;
}
export interface PayloadSendMessage {
  content: string;
  reply: string;
  messageID: string;
}
export interface ProfileProps {
  _id: InformationProps[];
  thumbnail: string;
  description: string;
  listPost: FeedItemProps[];
}
export interface UpdateProfileThumbnail {
  thumbnail: string;
  description: string;
}
