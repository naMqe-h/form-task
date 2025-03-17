import { FileInput } from "./components/FileInput"
import { Slider } from "./components/Slider"
import { TextField } from "./components/TextField"
import { DateInput } from "./components/DateInput"

function App() {

  return (
    <main className="max-w-screen h-auto flex items-center justify-center py-32 overflow-x-hidden">
      <div className="w-[426px] h-auto flex flex-col gap-6">
        <h1 className="font-medium text-2xl text-[#000853]">Personal info</h1>
        <TextField label="First Name" />
        <TextField label="Last Name" />
        <TextField label="Email Address" type="email" />
        <Slider />
        <FileInput />
        <h1 className="font-medium text-2xl text-[#000853]">Your workout</h1>
        <DateInput />
      </div>
    </main>
  )
}

export default App
