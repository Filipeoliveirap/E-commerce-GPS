export default function Input({
  label,
  name,
  icon,
  error,
  value,
  onChange,
  trailing = null,
  ...props
}) {
  return (
    <div className="space-y-1.5">
      {label && (
        <label className="block text-sm font-medium text-navy-900 dark:text-gray-200">
          {label}
        </label>
      )}
      
      <div className="relative">
        {icon && (
          <span className="material-symbols-outlined absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400 text-[20px] pointer-events-none">
            {icon}
          </span>
        )}

        <input
          className={`
            block w-full rounded-full border
            ${error ? 'border-red-500 focus:ring-red-500' : 'border-gray-200 dark:border-navy-700 focus:ring-primary'}
            bg-gray-50 dark:bg-navy-900
            py-3 ${icon ? 'pl-10' : 'pl-4'} ${trailing ? 'pr-10' : 'pr-4'}
            text-navy-900 dark:text-white
            placeholder-gray-400
            focus:border-primary focus:bg-white
            dark:focus:bg-navy-800
            focus:ring-1
            sm:text-sm
            transition-all outline-none
          `}
          name={name}
          value={value}
          onChange={onChange}
          {...props}
        />

        {trailing && (
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
            {trailing}
          </div>
        )}
      </div>

      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  )
}
