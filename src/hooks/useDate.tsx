import React, { useState, useEffect, ReactNode } from 'react'

type Holiday = {
    country: string
    iso: string
    year: number
    date: string
    day: string
    name: string
    type: string
}

type UseDatePickerProps = {
    initialDate?: Date | null
    onDateChange: (date: Date | null) => void
    initialTime?: string
    onTimeChange?: (time: string | undefined) => void
}

export const useDate = ({
    initialDate = null,
    onDateChange,
    initialTime,
    onTimeChange
}: UseDatePickerProps) => {
    const [currentDate, setCurrentDate] = useState(new Date())
    const [selectedDate, setSelectedDate] = useState<Date | null>(initialDate)
    const [selectedTime, setSelectedTime] = useState<string | undefined>(initialTime)
    const [holidays, setHolidays] = useState<Holiday[]>([])
    const [observanceMessage, setObservanceMessage] = useState<string>('')
    
    const timeOptions = ['12:00', '14:00', '16:30', '18:30', '20:00']
    const daysOfWeek = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su']
    const months = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ]
    
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
            
            if (isObservanceHoliday(selectedDate) && onTimeChange) {
                onTimeChange(undefined)
                setSelectedTime(undefined)
            }
        } else {
            setObservanceMessage('')
        }
    }, [selectedDate, holidays])
    
    useEffect(() => {
        if (initialDate !== selectedDate) {
            setSelectedDate(initialDate)
        }
    }, [initialDate])
    
    useEffect(() => {
        if (initialTime !== selectedTime) {
            setSelectedTime(initialTime)
        }
    }, [initialTime])

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
            setSelectedDate(date)
            onDateChange(date)
        }
    }

    const handleTimeClick = (time: string, e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault()
        setSelectedTime(time)
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

    const renderCalendar = (): ReactNode[] => {
        const year = currentDate.getFullYear()
        const month = currentDate.getMonth()
        
        const daysInMonth = getDaysInMonth(year, month)
        const firstDayOfMonth = getFirstDayOfMonth(year, month)
        
        const days: ReactNode[] = []
        
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

    return {
        currentDate,
        selectedDate,
        selectedTime,
        holidays,
        observanceMessage,
        daysOfWeek,
        months,
        timeOptions,
        goToPreviousMonth,
        goToNextMonth,
        handleDateClick,
        handleTimeClick,
        renderCalendar,
        isObservanceHoliday,
        isNationalHoliday
    }
} 