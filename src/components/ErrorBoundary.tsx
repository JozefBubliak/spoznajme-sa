'use client'
import React from 'react'

interface ErrorBoundaryState {
  hasError: boolean
}

export default class ErrorBoundary extends React.Component<React.PropsWithChildren, ErrorBoundaryState> {
  constructor(props: React.PropsWithChildren) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  componentDidCatch(error: unknown, errorInfo: unknown) {
    console.error('ErrorBoundary zachytil chybu:', error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div
          style={{
            padding: '2rem',
            textAlign: 'center',
            color: '#fff',
            background: '#ff4d4f'
          }}
        >
          <h2>⚠️ Ups, niečo sa pokazilo</h2>
          <p>Obnov stránku alebo skús znova neskôr.</p>
          <button onClick={() => window.location.reload()}>🔄 Obnoviť</button>
        </div>
      )
    }
    return this.props.children
  }
}
