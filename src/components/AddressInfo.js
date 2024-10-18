import React from 'react';
import { Formik, Form, Field } from "formik";
import * as Yup from 'yup';
import { Button, TextField, Box, MenuItem } from '@mui/material';

const AddressInfoSchema = Yup.object().shape({
    streetAddress: Yup.string().required("Street address is required"),
    city: Yup.string().required('City name is required'),
    state: Yup.string().required('State/Province is required'),
    postalCode: Yup.string().matches(/^[0-9]{6}$/, "Invalid postal code").required("Postal code is required"),
    country: Yup.string().required('Country is required')
});

const AddressInfo = ({ onBack, onNext }) => {
    return (
        <Formik
            initialValues={{
                streetAddress: "",
                city: "",
                state: "",
                postalCode: "",
                country: "",
            }}
            validationSchema={AddressInfoSchema}
            onSubmit={(values) => {
                onNext({ address: values });
            }}
        >
            {({ errors, touched, isValid, dirty }) => (
                <Form>
                    <Field
                        as={TextField}
                        name="streetAddress"
                        label="Street Address"
                        fullWidth
                        margin="normal"
                        error={touched.streetAddress && Boolean(errors.streetAddress)}
                        helperText={touched.streetAddress && errors.streetAddress}
                        autoComplete="street-address"
                    />

                    <Field
                        as={TextField}
                        name="city"
                        label="City"
                        fullWidth
                        margin="normal"
                        error={touched.city && Boolean(errors.city)}
                        helperText={touched.city && errors.city}
                        autoComplete="address-level2"
                    />

                    <Field
                        as={TextField}
                        name="state"
                        label="State/Province"
                        fullWidth
                        margin="normal"
                        error={touched.state && Boolean(errors.state)}
                        helperText={touched.state && errors.state}
                        autoComplete="address-level1"
                    />

                    <Field
                        as={TextField}
                        name="postalCode"
                        label="Postal/Zip Code"
                        fullWidth
                        margin="normal"
                        error={touched.postalCode && Boolean(errors.postalCode)}
                        helperText={touched.postalCode && errors.postalCode}
                        autoComplete="postal-code"
                    />

                    <Field
                        as={TextField}
                        name="country"
                        label="Country"
                        select
                        fullWidth
                        margin="normal"
                        error={touched.country && Boolean(errors.country)}
                        helperText={touched.country && errors.country}
                    >
                        <MenuItem value="India">India</MenuItem>
                        <MenuItem value="USA">USA</MenuItem>
                        <MenuItem value="Canada">Canada</MenuItem>
                        <MenuItem value="Australia">Australia</MenuItem>
                    </Field>

                    <Box display="flex" justifyContent="space-between" marginTop={2}>
                        <Button onClick={onBack} variant="outlined">Back</Button>
                        <Button type="submit" variant="contained" color="primary" disabled={!(isValid && dirty)}>
                            Next
                        </Button>
                    </Box>
                </Form>
            )}
        </Formik>
    );
};

export default AddressInfo;
