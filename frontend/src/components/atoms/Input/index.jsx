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
  const handleInputChange = (event) => {
    if (!onChange) return;

    const inputType = props.type ?? "text";
    const shouldTrimLeadingSpace = ["text", "email", "password", "search", "tel", "url"].includes(inputType);

    if (shouldTrimLeadingSpace && typeof event.target?.value === "string") {
      const sanitizedValue = event.target.value.replace(/^\s+/, "");
      if (sanitizedValue !== event.target.value) {
        event.target.value = sanitizedValue;
      }
    }

    onChange(event);
  };

  return (
    <div className="space-y-1.5">
      {label && (
        <label className="block text-sm font-medium text-navy-900 dark:text-gray-200">
          {label}
        </label>
      )}
      
      <div className="relative">
        {icon && (
          <span className="ajf-input-icon material-symbols-outlined absolute inset-y-0 left-0 w-12 flex items-center justify-center text-gray-400 text-[20px] pointer-events-none">
            {icon}
          </span>
        )}

        <input
          className={`
            ajf-form-input ${icon ? 'has-leading-icon' : ''} block w-full rounded-full border
            ${error ? 'border-red-500 focus:ring-red-500' : 'border-gray-200 dark:border-gray-300 focus:ring-primary'}
            bg-gray-50 dark:bg-gray-100
            py-3 ${icon ? 'pl-14' : 'pl-4'} ${trailing ? 'pr-10' : 'pr-4'}
            text-navy-900 dark:text-navy-900
            placeholder-gray-400
            focus:border-primary focus:bg-white
            focus:ring-1
            sm:text-sm
            transition-all outline-none
          `}
          name={name}
          value={value}
          onChange={handleInputChange}
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
