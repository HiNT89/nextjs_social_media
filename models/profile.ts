import { FeedItemProps, InformationProps } from ".";

export interface ProfileThumbnailProps {
  user: InformationProps;
  thumbURL: string;
  description: string;
}
export interface ProfileInfoProps {
  user: InformationProps;
  listPost: Array<FeedItemProps>;
  email: string;
  friends: string[];
}
