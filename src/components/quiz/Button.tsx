'use client'
import { ReactNode, CSSProperties } from 'react'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
  onClick?: () => void
  type?: 'primary' | 'secondary' | 'danger'
  disabled?: boolean
  style?: CSSProperties
}

export default function Button({
  children,
  onClick,
  type = 'primary',
  disabled,
  style,
  className,
  ...props
}: ButtonProps) {
  const styles = {
    base: {
      padding: '0.75rem 1.5rem',
      borderRadius: '8px',
      fontSize: '1rem',
      cursor: disabled ? 'not-allowed' : 'pointer',
      opacity: disabled ? 0.6 : 1,
      border: 'none',
      margin: '0.25rem'
    },
    primary: { background: '#1e90ff', color: 'white' },
    secondary: { background: '#f0f0f0', color: '#111' },
    danger: { background: '#ff4d4f', color: 'white' }
  }

  return (
    <button
      className={className}
      style={{ ...styles.base, ...styles[type], ...style }}
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  )
}
