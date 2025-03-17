import { Slider } from "./components/Slider"
import { TextField } from "./components/TextField"

function App() {

  return (
    <main className="w-screen h-screen flex justify-center items-center">
      <div className="w-[426px] h-auto flex flex-col gap-6">
        <h1 className="font-medium text-2xl text-[#000853]">Personal info</h1>
        <TextField label="First Name" />
        <TextField label="Last Name" />
        <TextField label="Email Address" type="email" />
        <Slider />
      </div>
    </main>
  )
}

export default App
