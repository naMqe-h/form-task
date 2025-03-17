import React from 'react';

type PropsType = {
    label: string
    type?: "text" | "email"
    name: string
    value: string
    onChange: (name: string, value: string, email_error?: boolean) => void
}

export const TextField = ({ label, type = "text", name, value, onChange }: PropsType) => {
    const id = `field-${name || label.toLowerCase().replace(/\s+/g, '-')}`
    const [error, setError] = React.useState<boolean>(false);

    const validateEmail = (email: string): boolean => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value;
        
        if (type === "email" && newValue) {
            if (!validateEmail(newValue)) {
                setError(true);
                onChange(name, newValue, true);
            } else {
                setError(false);
                onChange(name, newValue, false);
            }
        } else {
            setError(false);
            onChange(name, newValue, false);
        }
        
    };

    return (
        <div className="w-[426px] h-auto flex flex-col gap-2">
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
                className={`w-full h-[48px] font-medium rounded-lg ${error ? 'border-[2px] border-red-500 bg-[#FEECEC]' : 'border-[1px] border-[#CBB6E5] bg-white'} outline-none focus:border-[2px] focus:border-[#761BE4] focus:bg-[#FAF9FA]`}
            />
            {error && (
                <div className="flex items-center gap-2">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M8 0C6.41775 0 4.87104 0.469192 3.55544 1.34824C2.23985 2.22729 1.21447 3.47672 0.608967 4.93853C0.00346629 6.40034 -0.15496 8.00887 0.153721 9.56072C0.462403 11.1126 1.22433 12.538 2.34315 13.6569C3.46197 14.7757 4.88743 15.5376 6.43928 15.8463C7.99113 16.155 9.59966 15.9965 11.0615 15.391C12.5233 14.7855 13.7727 13.7602 14.6518 12.4446C15.5308 11.129 16 9.58225 16 8C16 5.87827 15.1571 3.84344 13.6569 2.34315C12.1566 0.842855 10.1217 0 8 0ZM7.00667 4C7.00667 3.73478 7.11203 3.48043 7.29956 3.29289C7.4871 3.10536 7.74145 3 8.00667 3C8.27189 3 8.52624 3.10536 8.71378 3.29289C8.90131 3.48043 9.00667 3.73478 9.00667 4V8.59333C9.00667 8.72465 8.9808 8.85469 8.93055 8.97602C8.88029 9.09734 8.80664 9.20758 8.71378 9.30044C8.62092 9.3933 8.51068 9.46696 8.38935 9.51721C8.26803 9.56747 8.13799 9.59333 8.00667 9.59333C7.87535 9.59333 7.74531 9.56747 7.62399 9.51721C7.50266 9.46696 7.39242 9.3933 7.29956 9.30044C7.2067 9.20758 7.13305 9.09734 7.08279 8.97602C7.03254 8.85469 7.00667 8.72465 7.00667 8.59333V4ZM8 13C7.77321 13 7.55152 12.9327 7.36295 12.8068C7.17438 12.6808 7.02741 12.5017 6.94062 12.2921C6.85383 12.0826 6.83113 11.8521 6.87537 11.6296C6.91961 11.4072 7.02882 11.2029 7.18919 11.0425C7.34955 10.8822 7.55387 10.7729 7.7763 10.7287C7.99873 10.6845 8.22929 10.7072 8.43881 10.794C8.64834 10.8807 8.82743 11.0277 8.95342 11.2163C9.07942 11.4048 9.14667 11.6265 9.14667 11.8533C9.14667 12.1574 9.02586 12.4491 8.81082 12.6641C8.59578 12.8792 8.30412 13 8 13Z" fill="#ED4545"/>
                    </svg>
                    <div className='flex flex-col'>
                        <span className="text-sm">Please use correct formatting.</span>
                        <span className="text-sm">Example: address@email.com</span>

                    </div>
                </div>
            )}
        </div>
    )
}