'use client'
import { ReactNode, CSSProperties } from 'react'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
  variant?: 'primary' | 'secondary' | 'danger' | 'outline'
  style?: CSSProperties
}

export default function Button({
  children,
  variant = 'primary',
  style,
  className,
  ...props
}: ButtonProps) {
  const styles = {
    base: {
      padding: '0.75rem 1.5rem',
      borderRadius: '8px',
      fontSize: '1rem',
      cursor: props.disabled ? 'not-allowed' : 'pointer',
      opacity: props.disabled ? 0.6 : 1,
      border: 'none',
      margin: '0.25rem'
    },
    primary: { background: '#1e90ff', color: 'white' },
    secondary: { background: '#f0f0f0', color: '#111' },
    danger: { background: '#ff4d4f', color: 'white' },
    outline: { background: 'transparent', color: '#1e90ff', border: '1px solid #1e90ff' }
  }

  return (
    <button
      className={className}
      style={{ ...styles.base, ...styles[variant], ...style }}
      {...props}
    >
      {children}
    </button>
  )
}
