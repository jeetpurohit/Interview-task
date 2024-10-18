import React from 'react';
import { Button, TextField, MenuItem, Box } from '@mui/material';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';


const AccountInfoSchema = Yup.object().shape({
  username: Yup.string().required('Username is required'),
  password: Yup.string()
    .min(8, 'Password must be at least 8 characters long')
    .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
    .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .matches(/[0-9]/, 'Password must contain at least one number')
    .matches(/[\W_]/, 'Password must contain at least one special character')
    .required('Password is required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .required('Confirm Password is required'),
  securityQuestion: Yup.string().required('Security Question is required'),
  securityAnswer: Yup.string().required('Answer is required'),
});

const AccountInfo = ({ onBack, onNext }) => {
  return (
    <Formik
      initialValues={{
        username: '',
        password: '',
        confirmPassword: '',
        securityQuestion: '',
        securityAnswer: '',
      }}
      validationSchema={AccountInfoSchema}
      onSubmit={(values) => {
        onNext({ account: values });
      }}
    >
      {({ errors, touched }) => (
        <Form>
         
          <Field
            as={TextField}
            name="username"
            label="Username"
            fullWidth
            margin="normal"
            error={touched.username && Boolean(errors.username)}
            helperText={touched.username && errors.username}
          />

         
          <Field
            as={TextField}
            type="password"
            name="password"
            label="Password"
            fullWidth
            margin="normal"
            error={touched.password && Boolean(errors.password)}
            helperText={touched.password && errors.password}
          />

        
          <Field
            as={TextField}
            type="password"
            name="confirmPassword"
            label="Confirm Password"
            fullWidth
            margin="normal"
            error={touched.confirmPassword && Boolean(errors.confirmPassword)}
            helperText={touched.confirmPassword && errors.confirmPassword}
          />

          
          <Field
            as={TextField}
            name="securityQuestion"
            label="Security Question"
            select
            fullWidth
            margin="normal"
            error={touched.securityQuestion && Boolean(errors.securityQuestion)}
            helperText={touched.securityQuestion && errors.securityQuestion}
          >
            <MenuItem value="What is your mother’s maiden name?">
              What is your mother’s maiden name?
            </MenuItem>
            <MenuItem value="What is the name of your first pet?">
              What is the name of your first pet?
            </MenuItem>
            <MenuItem value="What was your first car?">
              What was your first car?
            </MenuItem>
          </Field>

          
          <Field
            as={TextField}
            name="securityAnswer"
            label="Answer"
            fullWidth
            margin="normal"
            error={touched.securityAnswer && Boolean(errors.securityAnswer)}
            helperText={touched.securityAnswer && errors.securityAnswer}
          />

        
          <Box mt={2} display="flex" justifyContent="space-between">
            <Button variant="contained" color="secondary" onClick={onBack}>
              Back
            </Button>
            <Button type="submit" variant="contained" color="primary">
              Next
            </Button>
          </Box>
        </Form>
      )}
    </Formik>
  );
};

export default AccountInfo;