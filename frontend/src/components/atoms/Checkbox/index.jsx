export default function Checkbox({ id, name, checked = false, onChange, label = '', className = '', ...props }) {
  return (
    <div className={`flex items-center ${className}`}>
      <input
        id={id}
        name={name}
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary dark:border-navy-600 dark:bg-navy-800"
        {...props}
      />
      {label && (
        <label htmlFor={id} className="ml-2 block text-xs text-navy-700 dark:text-gray-400 cursor-pointer">
          {label}
        </label>
      )}
    </div>
  )
}
