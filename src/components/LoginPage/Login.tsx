import { Button, FormControl, InputLabel, Paper, Stack, TextField, Typography } from "@mui/material";
import React, { Component } from "react";
import { Link } from "react-router-dom";
import withRouter from "../HOC/withRouter";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from 'yup';

interface LoginProps {
  location: any;
  navigate: any;
}

interface LoginState {
  id: string;
  name: string;
  email: string;
}

const loginSchema = Yup.object().shape({
  id: Yup.number().required("Please enter an ID"),
  name: Yup.string().required("Name is required"),
  email: Yup.string().email("Invalid Email").required("Email is required"),
});

class Login extends Component<LoginProps, LoginState> {
  loginHandler = (values: LoginState) => {
    console.log("User Logged In", values);
    this.props.navigate('/home', { state: values });
  };

  render() {
    return (
      <Stack direction="row" justifyContent="center">
        <Paper sx={{ m: 4, width: 400, p: 2, textAlign: 'center' }}>
          <Formik
            initialValues={{ id: '', name: '', email: '' }}
            validationSchema={loginSchema}
            onSubmit={(values, { setSubmitting }) => {
              console.log(values);
              this.loginHandler(values);
              setSubmitting(false);
            }}
          >
            {({ isSubmitting, errors, touched }) => (
              <Form>
                <InputLabel sx={{ fontSize: "2rem", mb: 4, mt: 1 }}>Login Page</InputLabel>
                <FormControl sx={{ display: 'flex', flexDirection: 'column', gap: 3, textAlign: 'center' }}>
                  <Field
                    as={TextField}
                    variant="outlined"
                    name="id"
                    placeholder="Enter ID"
                    fullWidth
                    error={touched.id && Boolean(errors.id)}
                    helperText={touched.id && errors.id}
                  />
                  <Field
                    as={TextField}
                    variant="outlined"
                    name="name"
                    placeholder="Name"
                    fullWidth
                    error={touched.name && Boolean(errors.name)}
                    helperText={touched.name && errors.name}
                  />
                  <Field
                    as={TextField}
                    variant="outlined"
                    name="email"
                    placeholder="Email"
                    fullWidth
                    error={touched.email && Boolean(errors.email)}
                    helperText={touched.email && errors.email}
                  />
                  <Button type="submit" variant="contained" disabled={isSubmitting}>
                    Login
                  </Button>
                  <Typography variant="body2">
                    <Link to="/">Forgot Password?</Link>
                  </Typography>
                  <Typography variant="body2">
                    <Link to="/signup">New Member? Sign Up!</Link>
                  </Typography>
                </FormControl>
              </Form>
            )}
          </Formik>
        </Paper>
      </Stack>
    );
  }
}

export default withRouter(Login);
