import './App.css';
import PersonalInfo from './components/PersonalInfo';
import { useState, useEffect } from 'react';
import { Box, Container, Step, StepLabel, Stepper, Typography } from '@mui/material';
import AddressInfo from './components/AddressInfo';
import AccountInfo from './components/AccountInfo';
import Preferences from './components/Preferences';

const steps = ['Personal Info', 'Address Info', 'Account Info', 'Preferences'];

function App() {
    const [activeStep, setActiveStep] = useState(0);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [formData, setFormData] = useState({
        personal: {},
        address: {},
        account: {}, 
        preferences: {}
    });

    const handleNext = (data) => {
        setFormData((prev) => ({ ...prev, ...data }));
        if (activeStep === steps.length - 1) {
            handleSubmit();
        } else {
            setActiveStep((prevStep) => prevStep + 1);
        }
    };

    const handleBack = () => {
        setActiveStep((prevStep) => prevStep - 1);
    };

    useEffect(() => {
        const savedData = localStorage.getItem('multiStepFormData');
        if (savedData) {
            setFormData(JSON.parse(savedData));
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('multiStepFormData', JSON.stringify(formData));
    }, [formData]);

    const handleSubmit = () => {
        localStorage.setItem('multiStepFormData', JSON.stringify(formData));
        setIsSubmitted(true);
        localStorage.removeItem('multiStepFormData'); 
    };

    return (
        <Container>
            {isSubmitted ? (
                <Typography variant="h5" align="center" mt={4} color="green">
                    Form submitted successfully! 🎉
                </Typography>
            ) : (
                <>
                    <Stepper activeStep={activeStep} alternativeLabel>
                        {steps.map((label) => (
                            <Step key={label}>
                                <StepLabel>{label}</StepLabel>
                            </Step>
                        ))}
                    </Stepper>
                    <Box mt={4}>
                        {activeStep === 0 && <PersonalInfo onNext={handleNext} formData={formData.personal} />}
                        {activeStep === 1 && <AddressInfo onNext={handleNext} onBack={handleBack} formData={formData.address} />}
                        {activeStep === 2 && <AccountInfo onNext={handleNext} onBack={handleBack} formData={formData.account} />}
                        {activeStep === 3 && <Preferences onNext={handleNext} onBack={handleBack} formData={formData.preferences} />}
                    </Box>
                </>
            )}
        </Container>
    );
}

export default App;
