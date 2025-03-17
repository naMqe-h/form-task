import { useState, FormEvent, useEffect } from "react";

type FormData = {
    firstName: string;
    lastName: string;
    email: string;
    email_error: boolean;
    age: number;
    photo: File | null;
    workoutDate: Date | null;
    workoutTime: string | undefined;
}

export const useForm = () => {
    const [formData, setFormData] = useState<FormData>({
        firstName: "",
        lastName: "",
        email: "",
        email_error: false,
        age: 8,
        photo: null,
        workoutDate: null,
        workoutTime: undefined
    });
    const [formFilled, setFormFilled] = useState<boolean>(false);

    const handleTextChange = (name: string, value: string, email_error: boolean = false) => {
        setFormData(prev => ({
            ...prev,
            [name]: value,
            email_error
        }));
    };

    const handleAgeChange = (value: number) => {
        setFormData(prev => ({
            ...prev,
            age: value
        }));
    };

    const handleFileChange = (file: File | null) => {
        setFormData(prev => ({
            ...prev,
            photo: file
        }));
    };

    const handleDateChange = (date: Date | null) => {
        setFormData(prev => ({
            ...prev,
            workoutDate: date
        }));
    };

    const handleTimeChange = (time: string | undefined) => {
        setFormData(prev => ({
            ...prev,
            workoutTime: time
        }));
    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        
        const formDataToSend = new FormData();
        
        formDataToSend.append('firstName', formData.firstName);
        formDataToSend.append('lastName', formData.lastName);
        formDataToSend.append('email', formData.email);
        formDataToSend.append('age', formData.age.toString());
        formDataToSend.append('photo', formData.photo as File);
        formDataToSend.append('workoutDate', formData.workoutDate?.toISOString().split("T")[0] as string);
        formDataToSend.append('workoutTime', formData.workoutTime as string);
        
        fetch('http://letsworkout.pl/submit', {
            method: 'POST',
            body: formDataToSend
        });
    };

    useEffect(() => {
        if(
            formData.firstName.trim() !== "" &&
            formData.lastName.trim() !== "" &&
            formData.email.trim() !== "" &&
            formData.photo !== null &&
            formData.workoutDate !== null &&
            formData.workoutTime !== undefined &&
            !formData.email_error
        ) {
            setFormFilled(true);
        } else {
            setFormFilled(false);
        }
    }, [formData]);

    return {
        formData,
        formFilled,
        handleTextChange,
        handleAgeChange,
        handleFileChange,
        handleDateChange,
        handleTimeChange,
        handleSubmit
    };
}; 