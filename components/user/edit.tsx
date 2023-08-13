import {
  Stack,
  TextField,
  Button,
  FormControlLabel,
  Radio,
  FormControl,
  FormLabel,
  RadioGroup,
  Input,
  Typography,
} from "@mui/material";
import React, { ChangeEvent, useEffect, useState } from "react";
import { useAuth } from "@/hooks";
import { PayloadSignup, FormInput } from "@/models";
import { validateForm } from "@/utils";
export interface EditUserProps {
  isShow: boolean;
  toggle: (value: boolean) => void;
}
export default function EditUser(props: EditUserProps) {
  const { signup } = useAuth();
  //state
  const { isShow = true, toggle } = props;
  const [formInput, setFormInput] = useState<FormInput>({
    username: "",
    password: "",
    middleName: "",
    firstName: "",
    lastName: "",
    phoneNumber: "",
    email: "",
    gender: "",
    birthday: "",
    roles: ["user"],
  });
  const [formInputError, setFormInputError] = useState({
    phoneNumber: "",
    email: "",
  });
  const [isDisable, setIsDisable] = useState(true);
  //useEffect
  useEffect(() => {
    const newIsDisable = validateForm(formInput);
    setIsDisable(newIsDisable);
  }, [formInput]);
  // function

  const handleSubmit = () => {
    const regexPhoneNumber = /(84|0[3|5|7|8|9])+([0-9]{8})\b/g;
    const regexEmail =
      /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    const checkPhoneNumber = formInput.phoneNumber.match(regexPhoneNumber);
    const checkEmail = formInput.email.match(regexEmail);
    if (!checkPhoneNumber) {
      setFormInputError({
        email: "",
        phoneNumber: "số điện thoại không hợp lệ",
      });
      return;
    }
    if (!checkEmail) {
      setFormInputError({
        phoneNumber: "",
        email: "email không hợp lệ",
      });
      return;
    }
    if (checkPhoneNumber && checkEmail) {
      const payload: PayloadSignup = { ...formInput };
      signup(payload)
        .then(() => {
          setFormInput({
            username: "",
            password: "",
            middleName: "",
            firstName: "",
            lastName: "",
            phoneNumber: "",
            email: "",
            gender: "",
            birthday: "",
            roles: ["user"],
          });
          toggle(true);
        })
        .catch((e) => console.log(e));
    }
  };

  const handleInput = (
    evt: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = evt.target;
    setFormInput({ ...formInput, [name]: value });
  };
  return (
    <Stack
      component={"div"}
      direction="column"
      gap={2}
      sx={{
        p: 3,
        display: isShow ? "flex" : "none",
      }}
    >
      <TextField
        id="outlined-basic"
        label="Username"
        variant="outlined"
        name="username"
        value={formInput.username}
        onChange={(evt) => handleInput(evt)}
      />

      <TextField
        id="outlined-basic"
        label="Password"
        variant="outlined"
        type="password"
        name="password"
        value={formInput.password}
        onChange={(evt) => handleInput(evt)}
      />

      <TextField
        id="outlined-basic"
        label="First name"
        variant="outlined"
        name="firstName"
        value={formInput.firstName}
        onChange={(evt) => handleInput(evt)}
      />

      <TextField
        id="outlined-basic"
        label="Middle name"
        variant="outlined"
        name="middleName"
        value={formInput.middleName}
        onChange={(evt) => handleInput(evt)}
      />

      <TextField
        id="outlined-basic"
        label="Last name"
        variant="outlined"
        name="lastName"
        value={formInput.lastName}
        onChange={(evt) => handleInput(evt)}
      />

      <TextField
        id="outlined-basic"
        label="Phone number"
        variant="outlined"
        name="phoneNumber"
        value={formInput.phoneNumber}
        onChange={(evt) => handleInput(evt)}
      />
      <Typography
        component="p"
        sx={{
          display: formInputError.phoneNumber ? "block" : "none",
          color: "#Be2528",
          fontSize: "0.8rem",
          textTransform: "capitalize",
          fontWeight: "600",
        }}
      >
        {formInputError.phoneNumber}
      </Typography>
      <TextField
        id="outlined-basic"
        label="Email"
        variant="outlined"
        name="email"
        value={formInput.email}
        onChange={(evt) => handleInput(evt)}
      />
      <Typography
        component="p"
        sx={{
          display: formInputError.email ? "block" : "none",
          color: "#Be2528",
          fontSize: "0.8rem",
          textTransform: "capitalize",
          fontWeight: "600",
        }}
      >
        {formInputError.email}
      </Typography>
      <Stack direction={{ xs: "column", sm: "row" }} gap={2}>
        <Input
          type="date"
          name="birthday"
          value={formInput.birthday}
          onChange={(evt) => handleInput(evt)}
        />
        <FormControl>
          <FormLabel id="demo-radio-buttons-group-label">Gender</FormLabel>
          <RadioGroup
            aria-labelledby="demo-radio-buttons-group-label"
            defaultValue="female"
            value={formInput.gender}
            name="gender"
            onChange={(evt) => handleInput(evt)}
            row
          >
            <FormControlLabel
              value="female"
              control={<Radio />}
              label="Female"
            />
            <FormControlLabel value="male" control={<Radio />} label="Male" />
            <FormControlLabel value="other" control={<Radio />} label="Other" />
          </RadioGroup>
        </FormControl>
      </Stack>

      <Button
        type="submit"
        variant="contained"
        color="primary"
        disabled={isDisable}
        onClick={handleSubmit}
      >
        signin
      </Button>
    </Stack>
  );
}
