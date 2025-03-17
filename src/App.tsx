import { useState, FormEvent } from "react"
import { FileInput } from "./components/FileInput"
import { Slider } from "./components/Slider"
import { TextField } from "./components/TextField"
import { DateInput } from "./components/DateInput"

function App() {
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        email_error: false,
        age: 8,
        photo: null as File | null,
        workoutDate: null as Date | null
    });

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

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        console.log(formData);
    };

    const isFormComplete = () => {
        return (
            formData.firstName.trim() !== "" &&
            formData.lastName.trim() !== "" &&
            formData.email.trim() !== "" &&
            formData.photo !== null &&
            formData.workoutDate !== null &&
            !formData.email_error
        );
    };

    const buttonBgColor = isFormComplete() ? "#761BE4" : "#CBB6E5";

    return (
        <main className="max-w-screen h-auto flex items-center justify-center py-32 overflow-x-hidden">
            <form onSubmit={handleSubmit} className="w-[426px] h-auto flex flex-col gap-6">
                <section>
                    <h2 className="font-medium text-2xl text-[#000853]">Personal info</h2>
                    <div className="flex flex-col gap-6 mt-6">
                        <TextField 
                            label="First Name" 
                            name="firstName" 
                            value={formData.firstName}
                            onChange={handleTextChange}
                        />
                        <TextField 
                            label="Last Name" 
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleTextChange}
                        />
                        <TextField 
                            label="Email Address" 
                            type="email" 
                            name="email"
                            value={formData.email}
                            onChange={handleTextChange}
                        />
                        <Slider 
                            value={formData.age} 
                            onChange={handleAgeChange}
                        />
                        <FileInput 
                            file={formData.photo}
                            onChange={handleFileChange}
                        />
                    </div>
                </section>

                <section>
                    <h2 className="font-medium text-2xl text-[#000853]">Your workout</h2>
                    <div className="mt-6">
                        <DateInput 
                            selectedDate={formData.workoutDate}
                            onDateChange={handleDateChange}
                        />
                    </div>
                </section>

                <button
                    type="submit"
                    className="w-[426px] rounded-sm py-4 px-8"
                    style={{ backgroundColor: buttonBgColor }}
                    disabled={isFormComplete()}
                >
                    <span className="text-white text-lg font-medium">
                        Send Application
                    </span>
                </button>
            </form>
        </main>
    )
}

export default App
