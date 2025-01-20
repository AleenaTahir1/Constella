import { forwardRef } from 'react'

const DatePicker = forwardRef(({ value, onChange, className = '', ...props }, ref) => {
  return (
    <input
      type="date"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className={`px-4 py-3 rounded-lg bg-constellation-dark/50 border border-white/10 text-white 
        placeholder-gray-400 focus:outline-none focus:border-constellation-accent/50 
        transition-colors ${className}`}
      placeholder="dd/mm/yyyy"
      ref={ref}
      {...props}
    />
  )
})

DatePicker.displayName = 'DatePicker'

export default DatePicker
