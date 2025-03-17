import { useDate } from '../hooks/useDate'

type DateInputProps = {
    selectedDate: Date | null
    onDateChange: (date: Date | null) => void
    selectedTime?: string
    onTimeChange?: (time: string | undefined) => void
}

export const DateInput = ({ 
    selectedDate, 
    onDateChange, 
    selectedTime, 
    onTimeChange 
}: DateInputProps) => {
    const {
        currentDate,
        observanceMessage,
        daysOfWeek,
        months,
        timeOptions,
        goToPreviousMonth,
        goToNextMonth,
        handleTimeClick,
        renderCalendar,
        isObservanceHoliday
    } = useDate({
        initialDate: selectedDate,
        onDateChange,
        initialTime: selectedTime,
        onTimeChange
    })

    return (
        <div className="flex flex-col">
            <div className="flex flex-col md:flex-row md:justify-between md:gap-6">
                <div className="w-full md:w-[326px] flex flex-col gap-2 mx-auto md:mx-0">
                    <label htmlFor="date-picker" className="text-[#000853]">Date</label>

                    <div 
                        id="date-picker"
                        className="w-full max-w-[326px] h-[292px] mx-auto md:mx-0 bg-white border border-[#CBB6E5] rounded-lg flex flex-col items-center py-1"
                        role="grid"
                        aria-label="Calendar"
                    >
                        <div className="w-[278px] flex justify-between items-center mb-2">
                            <button 
                                onClick={(e) => goToPreviousMonth(e)}
                                className="text-[#CBB6E5] flex items-center justify-center text-4xl cursor-pointer"
                                aria-label="Previous month"
                            >
                                ◂
                            </button>
                            <div className="font-medium text-[#000853] text-center text-base" role="status" aria-live="polite">
                                {months[currentDate.getMonth()]} {currentDate.getFullYear()}
                            </div>
                            <button 
                                onClick={(e) => goToNextMonth(e)}
                                className="text-[#CBB6E5] flex items-center justify-center text-4xl cursor-pointer"
                                aria-label="Next month"
                            >
                                ▸
                            </button>
                        </div>
                        
                        <div className="w-[278px] grid grid-cols-7 gap-y-3" role="rowgroup">
                            {daysOfWeek.map(day => (
                                <div 
                                    key={day} 
                                    className="w-6 h-4 flex items-center justify-center font-medium text-sm text-[#000853]"
                                    role="columnheader"
                                >
                                    {day}
                                </div>
                            ))}
                            {renderCalendar()}
                        </div>
                    </div>
                    
                    {observanceMessage && (
                        <div className="flex items-center gap-2 text-purple-600 mt-1">
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M8 16C6.41775 16 4.87104 15.5308 3.55544 14.6518C2.23985 13.7727 1.21447 12.5233 0.608967 11.0615C0.00346629 9.59966 -0.15496 7.99113 0.153721 6.43928C0.462403 4.88743 1.22433 3.46197 2.34315 2.34315C3.46197 1.22433 4.88743 0.462401 6.43928 0.153719C7.99113 -0.154963 9.59966 0.00346375 11.0615 0.608965C12.5233 1.21447 13.7727 2.23985 14.6518 3.55544C15.5308 4.87103 16 6.41775 16 8C16 10.1217 15.1571 12.1566 13.6569 13.6569C12.1566 15.1571 10.1217 16 8 16ZM7.00667 12C7.00667 12.2652 7.11203 12.5196 7.29956 12.7071C7.4871 12.8946 7.74145 13 8.00667 13C8.27189 13 8.52624 12.8946 8.71378 12.7071C8.90131 12.5196 9.00667 12.2652 9.00667 12V7.40667C9.00667 7.27535 8.9808 7.14531 8.93055 7.02398C8.88029 6.90266 8.80664 6.79242 8.71378 6.69956C8.62092 6.6067 8.51068 6.53304 8.38935 6.48279C8.26803 6.43253 8.13799 6.40667 8.00667 6.40667C7.87535 6.40667 7.74531 6.43253 7.62399 6.48279C7.50266 6.53304 7.39242 6.6067 7.29956 6.69956C7.2067 6.79242 7.13305 6.90266 7.08279 7.02398C7.03254 7.14531 7.00667 7.27535 7.00667 7.40667V12ZM8 3C7.77321 3 7.55152 3.06725 7.36295 3.19325C7.17438 3.31925 7.02741 3.49833 6.94062 3.70786C6.85383 3.91738 6.83113 4.14794 6.87537 4.37037C6.91961 4.5928 7.02882 4.79712 7.18919 4.95748C7.34955 5.11785 7.55387 5.22706 7.7763 5.2713C7.99873 5.31555 8.22929 5.29284 8.43881 5.20605C8.64834 5.11926 8.82743 4.97229 8.95342 4.78372C9.07942 4.59515 9.14667 4.37346 9.14667 4.14667C9.14667 3.84255 9.02586 3.55089 8.81082 3.33585C8.59578 3.12081 8.30412 3 8 3Z" fill="#CBB6E5"/>
                            </svg>
                            <p className="text-sm text-[#000853]">{observanceMessage}</p>
                        </div>
                    )}
                    
                    <input 
                        type="hidden" 
                        name="selectedDate" 
                        value={selectedDate ? selectedDate.toISOString() : ''}
                        aria-label="Selected date"
                        required
                    />
                </div>

                {selectedDate && !isObservanceHoliday(selectedDate) && (
                    <div className="flex flex-col gap-2 mt-6 md:mt-0 w-full md:w-auto">
                        <label className="text-[#000853] text-base">Time</label>
                        <div className="flex flex-row md:flex-col gap-3 flex-wrap md:justify-start w-full px-4 md:px-0">
                            {timeOptions.map(time => (
                                <button
                                    key={time}
                                    onClick={(e) => handleTimeClick(time, e)}
                                    className={`w-[76px] h-[46px] rounded-lg bg-white text-[#000853] cursor-pointer ${
                                        selectedTime === time
                                            ? 'border-[2px] border-[#761BE4]' 
                                            : 'border-[1px] border-[#CBB6E5]'
                                    }`}
                                    aria-selected={selectedTime === time}
                                    aria-label={`Time ${time}`}
                                >
                                    {time}
                                </button>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}