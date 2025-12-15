export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  disabled = false,
  icon = null,
  className = '',
  ...props
}) {
  const variants = {
    primary: 'bg-primary text-navy-900 hover:bg-yellow-400 focus:ring-primary',
    secondary: 'border-2 border-gray-200 dark:border-navy-700 text-navy-900 dark:text-white hover:bg-gray-50 dark:hover:bg-navy-700',
    danger: 'bg-red-500 text-white hover:bg-red-600 focus:ring-red-500',
    ghost: 'text-navy-700 dark:text-gray-300 hover:text-navy-900 dark:hover:text-white border border-gray-300 dark:border-navy-700'
  }

  const sizes = {
    sm: 'py-2 px-3 text-sm',
    md: 'py-3 px-4 text-base',
    lg: 'py-4 px-6 text-lg'
  }

  const combinedClassName = `
    inline-flex items-center justify-center gap-3
    rounded-full font-bold
    transition-all duration-300
    focus:outline-none focus:ring-2 focus:ring-offset-2
    disabled:cursor-not-allowed disabled:opacity-50
    ${variants[variant]}
    ${sizes[size]}
    ${className}
  `

  return (
    <button className={combinedClassName} disabled={disabled} {...props}>
      {icon && <span className="material-symbols-outlined text-xl leading-none">{icon}</span>}
      {children}
    </button>
  )
}
