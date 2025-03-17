import { useForm } from "./hooks/useForm"
import { FileInput } from "./components/FileInput"
import { Slider } from "./components/Slider"
import { TextField } from "./components/TextField"
import { DateInput } from "./components/DateInput"

function App() {
    const {
        formData,
        formFilled,
        handleTextChange,
        handleAgeChange,
        handleFileChange,
        handleDateChange,
        handleTimeChange,
        handleSubmit
    } = useForm();

    return (
        <main className="max-w-screen h-auto flex items-center justify-center py-8 md:py-32 px-4 md:px-0 overflow-x-hidden">
            <form onSubmit={handleSubmit} className="w-full max-w-[426px] h-auto flex flex-col gap-6 pb-8">
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
                            selectedTime={formData.workoutTime}
                            onTimeChange={handleTimeChange}
                        />
                    </div>
                </section>

                <button
                    type="submit"
                    className={`w-full rounded-sm py-4 px-8 my-4 ${formFilled ? "bg-[#761BE4] cursor-pointer hover:bg-[#6A19CD]" : "bg-[#CBB6E5] cursor-not-allowed"}`}
                    disabled={!formFilled}
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
