type PropsType = {
    label: string
    type?: "text" | "email"
}

export const TextField = ({ label, type = "text" } : PropsType) => {


    return (
        <div className="w-[426px] h-[68px] flex flex-col gap-2">
            <label className="text-base text-[#000853]">{label}</label>
            <input 
                type={type}
                className="w-full h-[48px] bg-white rounded-lg border-[1px] border-[#CBB6E5] outline-none focus:border-[2px] focus:border-[#761BE4] focus:bg-[#FAF9FA]"
            />
        </div>
    )
}