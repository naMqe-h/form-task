type PropsType = {
    label: string
    type?: "text" | "email"
    name: string
    value: string
    onChange: (name: string, value: string) => void
}

export const TextField = ({ label, type = "text", name, value, onChange }: PropsType) => {
    const id = `field-${name || label.toLowerCase().replace(/\s+/g, '-')}`

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        onChange(name, e.target.value);
    };

    return (
        <div className="w-[426px] h-[68px] flex flex-col gap-2">
            <label htmlFor={id} className="text-base text-[#000853]">
                {label}
            </label>
            <input 
                id={id}
                type={type}
                name={name}
                value={value}
                onChange={handleChange}
                required
                aria-required
                className="w-full h-[48px] bg-white rounded-lg border-[1px] border-[#CBB6E5] outline-none focus:border-[2px] focus:border-[#761BE4] focus:bg-[#FAF9FA]"
            />
        </div>
    )
}