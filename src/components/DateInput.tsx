import { useState, useEffect } from 'react'

type DateInputProps = {
    selectedDate: Date | null
    onDateChange: (date: Date | null) => void
    selectedTime?: string
    onTimeChange?: (time: string) => void
}

type Holiday = {
    country: string
    iso: string
    year: number
    date: string
    day: string
    name: string
    type: string
}

export const DateInput = ({ 
    selectedDate, 
    onDateChange, 
    selectedTime, 
    onTimeChange 
}: DateInputProps) => {
    const [currentDate, setCurrentDate] = useState(new Date())
    const [holidays, setHolidays] = useState<Holiday[]>([])
    const [observanceMessage, setObservanceMessage] = useState<string>('')
    
    useEffect(() => {
        const fetchHolidays = async () => {
            try {
                const response = await fetch(`https://api.api-ninjas.com/v1/holidays?country=PL`, {
                    headers: {
                        "x-api-key": "OH+HEf/9IH2zuHR/cMO/8g==ldhBovC6Rpa1TIss"
                    }
                })
                if(response.ok) {
                    const data = await response.json()
                    setHolidays(data)
                }
            } catch (error) {
                console.log(error)
            }
        }
        
        fetchHolidays()
    }, [currentDate.getFullYear()])

    useEffect(() => {
        if (selectedDate) {
            checkForObservance(selectedDate)
        } else {
            setObservanceMessage('')
        }
    }, [selectedDate, holidays])

    const checkForObservance = (date: Date) => {
        const year = date.getFullYear()
        const month = String(date.getMonth() + 1).padStart(2, '0')
        const day = String(date.getDate()).padStart(2, '0')
        const formattedDate = `${year}-${month}-${day}`
        
        const observance = holidays.find(h => 
            h.date === formattedDate && 
            h.type === 'OBSERVANCE'
        )
        
        if (observance) {
            setObservanceMessage(`It is ${observance.name}.`)
        } else {
            setObservanceMessage('')
        }
    }

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

    const isNationalHoliday = (date: Date) => {
        const year = date.getFullYear()
        const month = String(date.getMonth() + 1).padStart(2, '0')
        const day = String(date.getDate()).padStart(2, '0')
        const formattedDate = `${year}-${month}-${day}`
        
        return holidays.some(holiday => 
            holiday.date === formattedDate && 
            holiday.type === 'NATIONAL_HOLIDAY'
        )
    }

    const isObservanceHoliday = (date: Date) => {
        const year = date.getFullYear()
        const month = String(date.getMonth() + 1).padStart(2, '0')
        const day = String(date.getDate()).padStart(2, '0')
        const formattedDate = `${year}-${month}-${day}`
        
        return holidays.some(holiday => 
            holiday.date === formattedDate && 
            holiday.type === 'OBSERVANCE'
        )
    }

    const handleDateClick = (day: number, e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault()
        const year = currentDate.getFullYear()
        const month = currentDate.getMonth()
        const date = new Date(year, month, day)
        
        if (date.getDay() !== 0 && !isNationalHoliday(date)) {
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
        
        if (dayOfWeek === 0 || isNationalHoliday(date)) {
            return 'text-[#898DA9] cursor-not-allowed'
        } else {
            return 'text-[#000853] cursor-pointer'
        }
    }

    const getHolidayName = (date: Date) => {
        const year = date.getFullYear()
        const month = String(date.getMonth() + 1).padStart(2, '0')
        const day = String(date.getDate()).padStart(2, '0')
        const formattedDate = `${year}-${month}-${day}`
        
        const holiday = holidays.find(h => 
            h.date === formattedDate && 
            h.type === 'NATIONAL_HOLIDAY'
        )
        return holiday?.name || ''
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
            const isHoliday = isNationalHoliday(date)
            const isDisabled = isSunday || isHoliday
            const holidayName = isHoliday ? getHolidayName(date) : ''
            
            const isCurrentDate = 
                selectedDate && 
                day === selectedDate.getDate() && 
                month === selectedDate.getMonth() && 
                year === selectedDate.getFullYear()
                
            days.push(
                <button 
                    key={`day-${day}`}
                    onClick={(e) => !isDisabled && handleDateClick(day, e)}
                    disabled={isDisabled}
                    aria-selected={isCurrentDate || false}
                    aria-label={`${day} ${months[month]} ${year}${holidayName ? ` - ${holidayName}` : ''}`}
                    title={holidayName || undefined}
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