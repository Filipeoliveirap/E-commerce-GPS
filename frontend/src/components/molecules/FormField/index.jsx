import Input from '../../atoms/Input'
import Button from '../../atoms/Button'

export default function FormField({
  label,
  name,
  icon,
  type = 'text',
  value,
  onChange,
  error,
  placeholder,
  maxLength,
  required,
  toggleVisibility = null,
  showToggle = false,
}) {
  return (
    <div className="space-y-1.5">
      <Input
        label={label}
        name={name}
        icon={icon}
        type={type}
        value={value}
        onChange={onChange}
        error={error}
        placeholder={placeholder}
        maxLength={maxLength}
        required={required}
      />

      {showToggle && toggleVisibility && (
        <Button
          type="button"
          variant="ghost"
          size="md"
          icon="visibility"
          onClick={toggleVisibility}
          className="absolute inset-y-0 right-0 pr-3"
        />
      )}
    </div>
  )
}
