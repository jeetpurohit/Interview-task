import React from 'react';
import { Button, Checkbox, FormControlLabel, TextField, MenuItem, Box, FormGroup } from '@mui/material';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';


const PreferencesSchema = Yup.object().shape({
  contactMethod: Yup.string().required('Preferred contact method is required'),
  subscription: Yup.boolean(),
  interestAreas: Yup.array().min(1, 'Please select at least one interest area'),
  language: Yup.string().required('Language preference is required'),
});

const Preferences = ({ onBack, onNext }) => {
  return (
    <Formik
      initialValues={{
        contactMethod: '',
        subscription: false,
        interestAreas: [],
        language: '',
      }}
      validationSchema={PreferencesSchema}
      onSubmit={(values) => {
        onNext({ preferences: values });
      }}
    >
      {({ values, errors, touched, setFieldValue }) => (
        <Form>
   
          <Field
            as={TextField}
            name="contactMethod"
            label="Preferred Contact Method"
            select
            fullWidth
            margin="normal"
            error={touched.contactMethod && Boolean(errors.contactMethod)}
            helperText={touched.contactMethod && errors.contactMethod}
          >
            <MenuItem value="Email">Email</MenuItem>
            <MenuItem value="Phone">Phone</MenuItem>
            <MenuItem value="SMS">SMS</MenuItem>
          </Field>

          <FormControlLabel
            control={
              <Field
                as={Checkbox}
                name="subscription"
                checked={values.subscription}
              />
            }
            label="Subscribe to Newsletter"
          />

          <Box mt={2}>
            <p>Interest Areas</p>
            <FormGroup row>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={values.interestAreas.includes('Technology')}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setFieldValue('interestAreas', [...values.interestAreas, 'Technology']);
                      } else {
                        setFieldValue('interestAreas', values.interestAreas.filter((item) => item !== 'Technology'));
                      }
                    }}
                  />
                }
                label="Technology"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={values.interestAreas.includes('Health')}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setFieldValue('interestAreas', [...values.interestAreas, 'Health']);
                      } else {
                        setFieldValue('interestAreas', values.interestAreas.filter((item) => item !== 'Health'));
                      }
                    }}
                  />
                }
                label="Health"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={values.interestAreas.includes('Sports')}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setFieldValue('interestAreas', [...values.interestAreas, 'Sports']);
                      } else {
                        setFieldValue('interestAreas', values.interestAreas.filter((item) => item !== 'Sports'));
                      }
                    }}
                  />
                }
                label="Sports"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={values.interestAreas.includes('Arts')}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setFieldValue('interestAreas', [...values.interestAreas, 'Arts']);
                      } else {
                        setFieldValue('interestAreas', values.interestAreas.filter((item) => item !== 'Arts'));
                      }
                    }}
                  />
                }
                label="Arts"
              />
            </FormGroup>
            {touched.interestAreas && errors.interestAreas && (
              <p style={{ color: 'red' }}>{errors.interestAreas}</p>
            )}
          </Box>

          <Field
            as={TextField}
            name="language"
            label="Language Preference"
            select
            fullWidth
            margin="normal"
            error={touched.language && Boolean(errors.language)}
            helperText={touched.language && errors.language}
          >
            <MenuItem value="English">English</MenuItem>
            <MenuItem value="Spanish">Spanish</MenuItem>
            <MenuItem value="French">French</MenuItem>
            <MenuItem value="German">German</MenuItem>
          </Field>

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

export default Preferences;