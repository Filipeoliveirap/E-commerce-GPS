export default function Text({ 
  variant = 'body', 
  size = 'base', 
  weight = 'normal',
  color = 'text-navy-900 dark:text-white',
  className = '',
  children,
  ...props
}) {
  const variants = {
    h1: 'text-4xl',
    h2: 'text-3xl',
    h3: 'text-2xl',
    h4: 'text-xl',
    h5: 'text-lg',
    h6: 'text-base',
    body: 'text-base',
    caption: 'text-xs',
  }

  const weights = {
    light: 'font-light',
    normal: 'font-normal',
    medium: 'font-medium',
    semibold: 'font-semibold',
    bold: 'font-bold',
  }

  const Tag = variant.startsWith('h') ? variant : 'p'

  return (
    <Tag 
      className={`${variants[variant]} ${weights[weight]} ${color} ${className}`}
      {...props}
    >
      {children}
    </Tag>
  )
}
