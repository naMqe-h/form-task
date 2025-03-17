import { useState } from 'react'

export const DateInput = () => {
    const [currentDate, setCurrentDate] = useState(new Date())
    const [selectedDate, setSelectedDate] = useState<Date | null>(null)

    const daysOfWeek = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su']
    const months = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ]

    const getDaysInMonth = (year: number, month: number) => {
        return new Date(year, month + 1, 0).getDate()
    }

    const getFirstDayOfMonth = (year: number, month: number) => {
        const day = new Date(year, month, 1).getDay()
        return day === 0 ? 6 : day - 1
    }

    const goToPreviousMonth = () => {
        setCurrentDate(prev => {
            const newDate = new Date(prev)
            newDate.setMonth(prev.getMonth() - 1)
            return newDate
        })
    }

    const goToNextMonth = () => {
        setCurrentDate(prev => {
            const newDate = new Date(prev)
            newDate.setMonth(prev.getMonth() + 1)
            return newDate
        })
    }

    const handleDateClick = (day: number) => {
        const year = currentDate.getFullYear()
        const month = currentDate.getMonth()
        const date = new Date(year, month, day)
        
        if (date.getDay() !== 0) {
            setSelectedDate(date)
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
            days.push(<div key={`empty-${i}`} className="w-6 h-6 text-center"></div>)
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
                <div 
                    key={`day-${day}`}
                    onClick={() => !isSunday && handleDateClick(day)}
                    className={`
                        w-6 h-6 flex items-center justify-center 
                        ${isCurrentDate 
                            ? 'bg-[#761BE4] text-white rounded-full' 
                            : getDayStyle(day)}
                        text-base
                    `}
                >
                    {day}
                </div>
            )
        }
        
        return days
    }

    return (
        <div className="w-[326px] h-[312px] flex flex-col gap-2">
            <h3 className="text-[#000853]">Date</h3>

            <div className="w-[326px] h-[292px] bg-white border border-[#CBB6E5] rounded-lg flex flex-col items-center py-1">
                <div className="w-[278px] flex justify-between items-center mb-2">
                    <button 
                        onClick={goToPreviousMonth}
                        className="text-[#CBB6E5] flex items-center justify-center text-4xl cursor-pointer"
                        aria-label="Previous month"
                        >
                        ◂
                    </button>
                    <div className="font-medium text-[#000853] text-center text-base">
                        {months[currentDate.getMonth()]} {currentDate.getFullYear()}
                    </div>
                    <button 
                        onClick={goToNextMonth}
                        className="text-[#CBB6E5] flex items-center justify-center text-4xl cursor-pointer"
                        aria-label="Next month"
                    >
                        ▸
                    </button>
                </div>
                
                <div className="w-[278px] grid grid-cols-7 gap-y-3">
                    {daysOfWeek.map(day => (
                        <div key={day} className="w-6 h-4 flex items-center justify-center font-medium text-sm text-[#000853]">
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
            />
        </div>
    )
}