import { useState } from 'react';

export const Slider = () => {
    const [value, setValue] = useState(8);

    const min = 8;
    const max = 100;

    const handleValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValue(parseInt(e.target.value));
    };

    const getPercentage = () => ((value - min) / (max - min)) * 100;

    return (
        <div className="w-[426px] flex flex-col gap-2 select-none relative">
            <label htmlFor='age-slider' className="text-[#000853] text-base">Age</label>
            <div className='w-full flex justify-between'>
                <span className="text-xs text-[#000853] pl-1">{min}</span>
                <span className="text-xs text-[#000853]">{max}</span>
            </div>
            <div
                className="absolute transform -translate-x-1/2 -bottom-8.5"
                style={{ left: `${getPercentage()}%` }}
            >
                <div className="absolute w-[9px] h-[9px] bg-[#FAF9FA] border-t border-l border-[#CBB6E5] transform rotate-45 -top-0.5 left-1/2 -translate-x-1/2"></div>
                <div className="relative w-[37px] h-[25px] bg-[#FAF9FA] border-1 border-[#CBB6E5] rounded-sm text-center">
                    <span className='text-[#761BE4] text-xs'>
                        {value}
                    </span>
                </div>
            </div>
            <input 
                type="range" 
                min={min} 
                max={max} 
                value={value} 
                onChange={handleValueChange}
                id='age-slider'
                className="w-full cursor-pointer accent-[#761BE4] appearance-none h-[4px] bg-[#CBB6E5] rounded-full"
            />
        </div>
    );
}