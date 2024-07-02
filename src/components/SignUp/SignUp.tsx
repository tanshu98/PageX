import { Button, Paper, Stack, TextField, Typography } from "@mui/material";
import React, { Component } from "react";
import withRouter from "../HOC/withRouter";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";


interface SignUpState {
  // signUpData: {
  //   name: string;
  //   email: string;
  //   password: string;
  //   confirmPassword: string;
  // };
}
interface IProps {
  location: any;
  navigate: any;
}

const signupSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  email: Yup.string().email("Invalid Email").required("Email is required"),
  password: Yup.string()
    .min(8, "Password must be 8 charactors")
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords must match")
    .required("Password is required"),
});

class SignUp extends Component<IProps, SignUpState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      signUpData: { name: "", email: "", password: "", confirmPassword: "" },
    };
  }
  // changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const { name, value } = e.target;
  //   this.setState((prevState) => ({
  //     ...prevState,
  //     [name]: value,
  //   }));
  // };
  signUpHandler = (values: { name: string; email: string; password: string; confirmPassword: string; }) => {
    console.log("signUpHandler", values);
    this.props.navigate("/", { state: values });
  };
  render() {
    // const { signUpData } = this.state;

    return (
      <Stack direction="row" justifyContent="center">
        <Paper sx={{ mt: 4 }}>
        <Formik
            initialValues={{ name: "", email: "", password: "", confirmPassword: "" }}
            validationSchema={signupSchema}
            onSubmit={(values, { setSubmitting }) => {
              console.log(values);
              
              this.signUpHandler(values);
              setSubmitting(false);
            }}
          >
            {({ isSubmitting, errors, touched }) => (
              <Form
                // onSubmit={this.signUpHandler}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 15,
                  marginTop: "10px",
                  padding: "20px",
                  textAlign: "center",
                }}
              >
                <Typography variant="h4">Sign Up</Typography>
                <Field
                  as={TextField}
                  name="name"
                  placeholder="Name"
                  variant="outlined"
                  helperText={touched.name && errors.name}
                  error={touched.name && Boolean(errors.name)}
                  required
                  // value={signUpData.name}
                  // onChange={this.changeHandler}
                />
                <Field
                as={TextField}
                name="email"
                placeholder="Email"
                variant="outlined"
                helperText={touched.email && errors.email}
                error={touched.email && Boolean(errors.email)}
                required
                  // value={signUpData.email}
                  // onChange={this.changeHandler}
                />
                <Field
                as={TextField}
                name="password"
                placeholder="Password"
                type="password"
                variant="outlined"
                helperText={touched.password && errors.password}
                error={touched.password && Boolean(errors.password)}
                required
                // onChange={this.changeHandler}
                // value={signUpData.password}
                />
                <Field
                as={TextField}
                variant="outlined"
                name="confirmPassword"
                type="password"
                placeholder="Confirm Password"
                helperText={touched.confirmPassword &&errors.confirmPassword}
                error={touched.confirmPassword && Boolean(errors.confirmPassword)}
                required
                // onChange={this.changeHandler}
                // value={signUpData.confirmPassword}
                />
                <Button type="submit" variant="contained" disabled={isSubmitting}>
                  Sign Up
                </Button>
              </Form>
            )}
          </Formik>
        </Paper>
      </Stack>
    );
  }
}

export default withRouter(SignUp);
