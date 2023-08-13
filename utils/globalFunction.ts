import { FormInput, PayloadUpdate } from "@/models";
import moment from "moment";
interface FormInputLogin {
  username: string;
  password: string;
}
export const validateForm = (
  formInput: FormInput | PayloadUpdate | FormInputLogin,
) => {
  const values = Object.values(formInput);
  const checkOnChange = values.some((it) => !it);
  if (checkOnChange) return true;
  return false;
};

export const checkPathname = (pathnameURL: string, pathname: string) => {
  if (pathnameURL !== "/" && pathname !== "/")
    return pathnameURL.includes(pathname);
  if (pathnameURL === "/" && pathname === "/") return true;
};
export const showTimeStart = (createAt: string) => {
  const b = moment().format();
  const a = moment(createAt, "YYYY-MM-DD");
  const c = -a.diff(b, "minutes");
  let result = createAt;
  if (c < 1440) {
    result = moment(result).fromNow();
  } else if (c < 2880) {
    result = "đã tạo ngày hôm qua";
  } else {
    const date = moment(result).date();
    const month = moment(result).month() + 1;
    const year = moment(result).year();
    result = `đã tạo ${date} thg ${month} năm ${year}`;
  }
  return result;
};
interface FriendProps {
  _id: string;
  username: string;
  password: "$2a$08$cON2QKfNS6WfmQZMhZB3QeilN890WYsY9KsdqqE.AHkJ4AWUefcbS";
  messageID: string[];
  roles: string[];
  createdAt: string;
  friends: {
    _id: string;
    middleName: string;
    firstName: string;
    lastName: string;
    gender: string;
    birthday: string | null;
    phoneNumber: string;
    avatar: string;
  }[];
  email: "hint1@gmail.com";
}
export const checkAddFriend = (friend: FriendProps, userID: string) => {
  const listFriendID = friend?.friends.map((it) => it._id);
  if (userID === friend?._id) return true;
  return listFriendID?.includes(userID);
};
