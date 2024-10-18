import React from 'react';
import { Formik, Form, Field } from "formik";
import * as Yup from 'yup';
import { Button, TextField, Box, MenuItem, Select, InputLabel, FormControl } from '@mui/material';

const PersonalInfoSchema = Yup.object().shape({
    fullName: Yup.string().required("Full name is required"),
    email: Yup.string().email('Invalid email format').required('Email is required'),
    phoneNumber: Yup.string().matches(/^[0-9]{10}$/, 'Phone number is not valid').required('Phone number is required'),
    dob: Yup.date().required("Date of birth is required").test('age', "You must be 18+", (value) => {
        const today = new Date();
        const birthDate = new Date(value);
        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDifference = today.getMonth() - birthDate.getMonth();
        if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        return age >= 18;
    }),
    gender: Yup.string().required('Gender is required'),
    nationality: Yup.string().required('Nationality is required'),
    profilePicture: Yup.mixed().nullable(),
});

const PersonalInfo = ({ onNext }) => {
    return (
        <Formik
            initialValues={{
                fullName: "",
                email: "",
                phoneNumber: "",
                dob: "",
                gender: "",
                nationality: "",
                profilePicture: null,
            }}
            validationSchema={PersonalInfoSchema}
            onSubmit={(values) => {
                onNext({ personal: values });
            }}
        >
            {({ errors, touched, setFieldValue }) => (
                <Form>
                    <Field
                        as={TextField}
                        name="fullName"
                        label="Full Name"
                        fullWidth
                        margin="normal"
                        error={touched.fullName && Boolean(errors.fullName)}
                        helperText={touched.fullName && errors.fullName}
                    />

                    <Field
                        as={TextField}
                        name="email"
                        label="Email"
                        fullWidth
                        margin="normal"
                        error={touched.email && Boolean(errors.email)}
                        helperText={touched.email && errors.email}
                    />

                    <Field
                        as={TextField}
                        name="phoneNumber"
                        label="Phone Number"
                        fullWidth
                        margin="normal"
                        error={touched.phoneNumber && Boolean(errors.phoneNumber)}
                        helperText={touched.phoneNumber && errors.phoneNumber}
                    />

                    <Field
                        as={TextField}
                        name="dob"
                        label="Date of Birth"
                        type="date"
                        fullWidth
                        margin="normal"
                        InputLabelProps={{ shrink: true }}
                        error={touched.dob && Boolean(errors.dob)}
                        helperText={touched.dob && errors.dob}
                    />

                    <FormControl fullWidth margin="normal" error={touched.gender && Boolean(errors.gender)}>
                        <InputLabel>Gender</InputLabel>
                        <Field as={Select} name="gender" label="Gender">
                            <MenuItem value="male">Male</MenuItem>
                            <MenuItem value="female">Female</MenuItem>
                            <MenuItem value="other">Other</MenuItem>
                        </Field>
                    </FormControl>

                    <Field
                        as={TextField}
                        name="nationality"
                        label="Nationality"
                        fullWidth
                        margin="normal"
                        error={touched.nationality && Boolean(errors.nationality)}
                        helperText={touched.nationality && errors.nationality}
                    />

                    <Box mt={2}>
                        <input
                            id="profilePicture"
                            name="profilePicture"
                            type="file"
                            onChange={(event) => {
                                setFieldValue('profilePicture', event.target.files[0]);
                            }}
                        />
                    </Box>

                    <Box mt={2}>
                        <Button type="submit" variant="contained" color="primary">
                            Next
                        </Button>
                    </Box>
                </Form>
            )}
        </Formik>
    );
};

export default PersonalInfo;
