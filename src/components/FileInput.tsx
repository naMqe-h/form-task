export const FileInput = () => {
    return (
        <div className="w-[426px] h-[116px] flex flex-col gap-2 mt-6">
            <h3 className="text-[#000853]">Photo</h3>
            <div className="w-full h-[96px] bg-white border border-[#CBB6E5] rounded-lg flex items-center justify-center relative">
                <input 
                    type="file" 
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" 
                />
                <div className="flex items-center justify-center pointer-events-none">
                    <span className="text-[#761BE4] underline">
                        Upload a file
                    </span>
                    <span className="text-[#898DA9] ml-2">or drag and drop here</span>
                </div>
            </div>
        </div>
    )
}