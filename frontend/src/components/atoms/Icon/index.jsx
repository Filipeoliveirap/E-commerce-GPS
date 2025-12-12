export default function Icon({ name, size = 'md', className = '' }) {
  const sizes = {
    sm: 'text-[16px]',
    md: 'text-[20px]',
    lg: 'text-[24px]',
    xl: 'text-[32px]',
  }

  return (
    <span className={`material-symbols-outlined ${sizes[size]} ${className}`}>
      {name}
    </span>
  )
}
