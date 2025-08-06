
import React, { useState } from 'react'
import { useAuth } from '@/hooks/useAuth'
import { Button } from '@/components/ui/button'
import { Brain, Menu, X, User, LogOut, Heart, History, Settings } from 'lucide-react'
import { useNavigate, useLocation } from 'react-router-dom'

interface LayoutProps {
  children: React.ReactNode
}

export default function Layout({ children }: LayoutProps) {
  const { user, profile, signOut, isPaid } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const menuItems = [
    { path: '/', label: 'Domov', icon: Brain },
    { path: '/app', label: 'Otázky', icon: Brain },
    ...(user ? [
      { path: '/favorites', label: 'Obľúbené', icon: Heart },
      { path: '/history', label: 'História', icon: History },
    ] : []),
  ]

  const handleSignOut = async () => {
    await signOut()
    navigate('/')
    setMobileMenuOpen(false)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div 
              className="flex items-center gap-2 cursor-pointer"
              onClick={() => navigate('/')}
            >
              <Brain className="text-pink-500 h-8 w-8" />
              <span className="text-xl font-bold text-purple-700">Spoznajme sa</span>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-6">
              {menuItems.map((item) => (
                <Button
                  key={item.path}
                  variant={location.pathname === item.path ? "default" : "ghost"}
                  onClick={() => navigate(item.path)}
                  className="flex items-center gap-2"
                >
                  <item.icon className="h-4 w-4" />
                  {item.label}
                </Button>
              ))}
            </nav>

            {/* User Actions */}
            <div className="hidden md:flex items-center gap-4">
              {user ? (
                <div className="flex items-center gap-3">
                  <div className="text-sm">
                    <div className="font-medium">{user.email}</div>
                    <div className="text-gray-500">
                      {isPaid ? '✨ Plný prístup' : '🆓 Základný'}
                    </div>
                  </div>
                  <Button variant="outline" size="sm" onClick={handleSignOut}>
                    <LogOut className="h-4 w-4" />
                  </Button>
                </div>
              ) : (
                <div className="flex gap-2">
                  <Button variant="outline" onClick={() => navigate('/login')}>
                    Prihlásenie
                  </Button>
                  <Button onClick={() => navigate('/upgrade')}>
                    Plný prístup
                  </Button>
                </div>
              )}
            </div>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="sm"
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X /> : <Menu />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-t">
            <div className="px-4 py-2 space-y-2">
              {menuItems.map((item) => (
                <Button
                  key={item.path}
                  variant={location.pathname === item.path ? "default" : "ghost"}
                  onClick={() => {
                    navigate(item.path)
                    setMobileMenuOpen(false)
                  }}
                  className="w-full justify-start flex items-center gap-2"
                >
                  <item.icon className="h-4 w-4" />
                  {item.label}
                </Button>
              ))}
              
              <div className="border-t pt-2 mt-2">
                {user ? (
                  <div className="space-y-2">
                    <div className="px-3 py-2 text-sm">
                      <div className="font-medium">{user.email}</div>
                      <div className="text-gray-500">
                        {isPaid ? '✨ Plný prístup' : '🆓 Základný'}
                      </div>
                    </div>
                    <Button
                      variant="outline"
                      onClick={handleSignOut}
                      className="w-full justify-start"
                    >
                      <LogOut className="h-4 w-4 mr-2" />
                      Odhlásiť sa
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <Button
                      variant="outline"
                      onClick={() => {
                        navigate('/login')
                        setMobileMenuOpen(false)
                      }}
                      className="w-full"
                    >
                      Prihlásenie
                    </Button>
                    <Button
                      onClick={() => {
                        navigate('/upgrade')
                        setMobileMenuOpen(false)
                      }}
                      className="w-full"
                    >
                      Plný prístup
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="flex-1">
        {children}
      </main>
    </div>
  )
}
