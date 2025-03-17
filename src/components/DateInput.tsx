import { useState } from 'react'

type DateInputProps = {
    selectedDate: Date | null
    onDateChange: (date: Date | null) => void
    selectedTime?: string
    onTimeChange?: (time: string) => void
}

export const DateInput = ({ 
    selectedDate, 
    onDateChange, 
    selectedTime, 
    onTimeChange 
}: DateInputProps) => {
    const [currentDate, setCurrentDate] = useState(new Date())

    const daysOfWeek = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su']
    const months = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ]
    
    const timeOptions = ['12:00', '14:00', '16:30', '18:30', '20:00']

    const getDaysInMonth = (year: number, month: number) => {
        return new Date(year, month + 1, 0).getDate()
    }

    const getFirstDayOfMonth = (year: number, month: number) => {
        const day = new Date(year, month, 1).getDay()
        return day === 0 ? 6 : day - 1
    }

    const goToPreviousMonth = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault()
        setCurrentDate(prev => {
            const newDate = new Date(prev)
            newDate.setMonth(prev.getMonth() - 1)
            return newDate
        })
    }

    const goToNextMonth = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault()
        setCurrentDate(prev => {
            const newDate = new Date(prev)
            newDate.setMonth(prev.getMonth() + 1)
            return newDate
        })
    }

    const handleDateClick = (day: number, e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault()
        const year = currentDate.getFullYear()
        const month = currentDate.getMonth()
        const date = new Date(year, month, day)
        
        if (date.getDay() !== 0) {
            onDateChange(date)
        }
    }

    const handleTimeClick = (time: string, e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault()
        if (onTimeChange) {
            onTimeChange(time)
        }
    }

    const getDayStyle = (day: number) => {
        const year = currentDate.getFullYear()
        const month = currentDate.getMonth()
        const date = new Date(year, month, day)
        const dayOfWeek = date.getDay()
        
        if (dayOfWeek === 0) {
            return 'text-[#898DA9] cursor-not-allowed'
        } else {
            return 'text-[#000853] cursor-pointer'
        }
    }

    const renderCalendar = () => {
        const year = currentDate.getFullYear()
        const month = currentDate.getMonth()
        
        const daysInMonth = getDaysInMonth(year, month)
        const firstDayOfMonth = getFirstDayOfMonth(year, month)
        
        const days = []
        
        for (let i = 0; i < firstDayOfMonth; i++) {
            days.push(<div key={`empty-${i}`} className="w-6 h-6 text-center" aria-hidden="true"></div>)
        }
        
        for (let day = 1; day <= daysInMonth; day++) {
            const date = new Date(year, month, day)
            const isSunday = date.getDay() === 0
            
            const isCurrentDate = 
                selectedDate && 
                day === selectedDate.getDate() && 
                month === selectedDate.getMonth() && 
                year === selectedDate.getFullYear()
                
            days.push(
                <button 
                    key={`day-${day}`}
                    onClick={(e) => !isSunday && handleDateClick(day, e)}
                    disabled={isSunday}
                    aria-selected={isCurrentDate || false}
                    aria-label={`${day} ${months[month]} ${year}`}
                    className={`
                        w-6 h-6 flex items-center justify-center 
                        ${isCurrentDate 
                            ? 'bg-[#761BE4] text-white rounded-full' 
                            : getDayStyle(day)}
                        text-base
                    `}
                >
                    {day}
                </button>
            )
        }
        
        return days
    }

    return (
        <div className="flex flex-col">
            <div className="flex justify-between gap-6">
                <div className="w-[326px] flex flex-col gap-2">
                    <label htmlFor="date-picker" className="text-[#000853]">Date</label>

                    <div 
                        id="date-picker"
                        className="w-[326px] h-[292px] bg-white border border-[#CBB6E5] rounded-lg flex flex-col items-center py-1"
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
                                onClick={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => goToNextMonth(e)}
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
                    
                    <input 
                        type="hidden" 
                        name="selectedDate" 
                        value={selectedDate ? selectedDate.toISOString() : ''}
                        aria-label="Selected date"
                        required
                    />
                </div>

                {selectedDate && (
                    <div className="flex flex-col gap-2">
                        <label className="text-[#000853] text-base">Time</label>
                        <div className="flex flex-col gap-3">
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