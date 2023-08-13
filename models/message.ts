export interface BoxUserItemProps {
  _id: string;
  users: string[];
  message: {
    content: string;
    createdAt: string;
    reply: string | null;
    userID: string;
    _id: string;
  };
}
export interface MessageItemProps {
  messageID: string;
  username: string;
  imageURL?: string;
  userID: string;
  time: string;
  messageContent: string;
  reply: {
    isReply: boolean;
    messageID?: string;
    messageContent?: string;
  };
}
export interface BoxMessageProps {
  imageURL: string;
  username: string;
  userID: string;
  isOnline: boolean;
  lastTime: string;
  dataMessage: {
    messageID: string;
    username: string;
    imageURL?: string;
    userID: string;
    time: string;
    messageContent: string;
    reply: {
      isReply: boolean;
      messageID?: string;
      messageContent?: string;
    };
  }[];
}
