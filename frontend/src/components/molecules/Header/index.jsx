import { useState, useEffect, useRef } from 'react'
import Icon from '../../atoms/Icon'
import Button from '../../atoms/Button'
import { Link, useLocation } from 'react-router-dom'

export default function Header({ hideOnScroll = true }) {
  const [hideHeader, setHideHeader] = useState(false)
  const [lastScrollY, setLastScrollY] = useState(0)
  const [searchQuery, setSearchQuery] = useState('')
  const [cartCount, setCartCount] = useState(0)
  const [settingsOpen, setSettingsOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    if (!hideOnScroll) return

    const handleScroll = () => {
      const currentScrollY = window.scrollY
      setHideHeader(currentScrollY > lastScrollY && currentScrollY > 50)
      setLastScrollY(currentScrollY)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [lastScrollY, hideOnScroll])

  const handleLogout = () => {
    localStorage.removeItem('user')
    setSettingsOpen(false)
    window.location.href = '/login'
  }

  const settingsBtnRef = useRef(null)
  const settingsDropdownRef = useRef(null)

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!settingsOpen) return
      if (
        settingsBtnRef.current && !settingsBtnRef.current.contains(e.target) &&
        settingsDropdownRef.current && !settingsDropdownRef.current.contains(e.target)
      ) {
        setSettingsOpen(false)
      }
    }
    document.addEventListener('click', handleClickOutside)
    return () => document.removeEventListener('click', handleClickOutside)
  }, [settingsOpen])

  return (
    <header
      className={`
        w-full bg-white dark:bg-navy-800 shadow-sm border-b border-gray-100 dark:border-navy-700
        sticky top-0 z-50 transition-transform duration-300
        ${hideHeader ? '-translate-y-full' : 'translate-y-0'}
      `}
    >
      <div className="max-w-[1200px] mx-auto px-4 md:px-8 py-4 flex items-center justify-between gap-4">
        {/* Logo */}
        <div>
          <Link to="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
            <div className="flex items-center justify-center size-10 rounded-full bg-primary/20 text-navy-900 dark:text-primary">
              <Icon name="devices" size="lg" />
            </div>
            <div className="flex flex-col">
              <h2 className="text-xl font-bold tracking-tight text-navy-900 dark:text-white leading-none">
                A.J.F.
              </h2>
              <span className="text-[10px] uppercase font-bold text-navy-700 dark:text-gray-400 tracking-widest">
                Eletrônicos
              </span>
            </div>
          </Link>
        </div>

        {/* Search Bar */}
        <div className="hidden md:block flex-1 max-w-md mx-4 relative">
            <input
              type="text"
              placeholder="Buscar produtos..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-full bg-gray-100 dark:bg-navy-900 border-none focus:ring-2 focus:ring-primary text-sm text-navy-900 dark:text-white placeholder-gray-400 outline-none transition-shadow"
            />
            <Icon name="search" size="md" className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
        </div>

        {/* Navigation */}
        <nav className="hidden lg:flex items-center gap-6">
          <Link to="/" className="text-sm font-bold text-primary hover:text-yellow-600 transition-colors">
            Home
          </Link>
          <Link to="/produtos" className="text-sm font-medium text-navy-700 dark:text-gray-300 hover:text-navy-900 dark:hover:text-white transition-colors">
            Produtos
          </Link>
          <a href="#" className="text-sm font-medium text-navy-700 dark:text-gray-300 hover:text-navy-900 dark:hover:text-white transition-colors cursor-not-allowed opacity-50">
            Computadores
          </a>
          <a href="#" className="text-sm font-medium text-navy-700 dark:text-gray-300 hover:text-navy-900 dark:hover:text-white transition-colors cursor-not-allowed opacity-50">
            Acessórios
          </a>
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="md" icon="shopping_cart" className="relative text-navy-900 dark:text-white">
            {cartCount > 0 && (
              <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-primary rounded-full border-2 border-white dark:border-navy-800"></span>
            )}
          </Button>

          {/* Settings Dropdown */}
          <div className="relative settings-dropdown" ref={settingsDropdownRef}>
            <div ref={settingsBtnRef} className="inline-block">
              <Button 
                variant="ghost"
                size="md"
                icon="settings"
                onClick={() => setSettingsOpen(!settingsOpen)}
                className="settings-btn text-navy-900 dark:text-white"
              />
            </div>

            {settingsOpen && (
              <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-navy-800 border border-gray-200 dark:border-navy-700 rounded shadow-xl overflow-hidden z-50">
                <div className="px-4 py-3 border-b border-gray-200 dark:border-navy-700">
                  <p className="text-xs font-semibold text-navy-900 dark:text-gray-300 uppercase tracking-wide">Minha Conta</p>
                </div>
                <ul className="divide-y divide-gray-200 dark:divide-navy-700">
                  <li>
                    <a href="#" className="block px-4 py-2.5 text-sm text-navy-900 dark:text-white hover:bg-gray-50 dark:hover:bg-navy-700 transition-colors">
                      Perfil
                    </a>
                  </li>
                  <li>
                    <a href="#" className="block px-4 py-2.5 text-sm text-navy-900 dark:text-white hover:bg-gray-50 dark:hover:bg-navy-700 transition-colors">
                      Meus Pedidos
                    </a>
                  </li>
                  <li>
                    <a href="#" className="block px-4 py-2.5 text-sm text-navy-900 dark:text-white hover:bg-gray-50 dark:hover:bg-navy-700 transition-colors">
                      Endereços
                    </a>
                  </li>
                </ul>
                <div className="border-t border-gray-200 dark:border-navy-700">
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2.5 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-navy-700 transition-colors flex items-center gap-2"
                  >
                    <Icon name="logout" size="sm" />
                    Sair da Conta
                  </button>
                </div>
              </div>
            )}
          </div>

          {location.pathname === '/login' ? (
            <Link to="/cadastro" className="hidden md:block">
              <Button variant="secondary" size="md">
                Criar Conta
              </Button>
            </Link>
          ) : (
            <Link to="/login" className="hidden md:block">
              <Button variant="secondary" size="md">
                Login
              </Button>
            </Link>
          )}
          <Button variant="ghost" size="md" icon="menu" className="md:hidden" />
        </div>
      </div>
    </header>
  )
}
