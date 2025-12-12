import { useState } from 'react'
import Header from '../../components/molecules/Header'
import Input from '../../components/atoms/Input'
import Button from '../../components/atoms/Button'
import Checkbox from '../../components/atoms/Checkbox'
import { validateEmail, validatePassword } from '../../utils/validators'
import { Link, useNavigate } from 'react-router-dom'

export default function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  })

  const [errors, setErrors] = useState({})
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [successMessage, setSuccessMessage] = useState('')
  const navigate = useNavigate()

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target

    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))

    // Limpar erro ao digitar
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const newErrors = {}

    // Validar email
    if (!formData.email.trim()) {
      newErrors.email = 'E-mail é obrigatório'
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'E-mail inválido'
    }

    // Validar senha
    if (!formData.password) {
      newErrors.password = 'Senha é obrigatória'
    } else if (!validatePassword(formData.password)) {
      newErrors.password = 'Senha deve ter no mínimo 6 caracteres'
    }

    setErrors(newErrors)

    if (Object.keys(newErrors).length === 0) {
      setLoading(true)
      try {
        const response = await fetch('http://localhost:8080/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: formData.email, password: formData.password })
        })

        if (!response.ok) {
          const err = await response.json().catch(() => ({}))
          throw new Error(err.message || `Erro no login (${response.status})`)
        }

        const data = await response.json().catch(() => ({}))
        try { localStorage.setItem('user', JSON.stringify(data || { email: formData.email })) } catch(e) {}
        navigate('/produtos')
      } catch (error) {
        console.error('Erro ao fazer login:', error)
        setErrors({ submit: error.message || 'Erro ao fazer login. Tente novamente.' })
      } finally {
        setLoading(false)
      }
    }
  }

  return (
    <div className="bg-background-light dark:bg-background-dark font-display text-navy-900 dark:text-white transition-colors duration-200 min-h-screen flex flex-col">
      <Header hideOnScroll={true} />

      <main className="flex-grow flex items-center justify-center p-4 md:p-10 relative overflow-hidden">
        {/* Background decorations */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
          <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-primary/10 rounded-full blur-3xl opacity-60"></div>
          <div className="absolute bottom-[-10%] left-[-5%] w-[600px] h-[600px] bg-navy-800/5 dark:bg-primary/5 rounded-full blur-3xl opacity-60"></div>
        </div>

        {/* Login Container */}
        <div className="w-full max-w-[1000px] flex flex-col md:flex-row bg-white dark:bg-navy-800 rounded-lg shadow-xl overflow-hidden min-h-[600px]">
          
          {/* Left side - Info & Image */}
          <div className="hidden md:flex flex-col w-2/5 bg-navy-900 relative p-10 justify-between text-white">
            <img
              alt="Tech gadgets background"
              className="absolute inset-0 w-full h-full object-cover opacity-40 mix-blend-overlay"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBY9afqWki38RCfLpHCsZ-WcBBKC12N9UOuDCS6ZX4cqArgLNfM4JfkL-oxMaL8m7aGIQlszwg7vy1N-b6dHnRzcSHV2jQ7_8VukofogzR38DUx5-ANUD7d4fcDWRhgV2Nwr9cL9e_3LtFwvxtk3mMEFxGRZ9w4quhag0qz0Qp4yeL7LhnvcgpeFV-Y7lxpJygpBXM7hgY-1JfMVJCMpvcC1pibMvT1FNQP7U62dxXI6ceeDEpPboKgdx7CmdhvQp87PZ5684Q9oRc"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-navy-900/90 to-navy-900/95 z-0"></div>

            <div className="relative z-10">
              <div className="flex items-center gap-2 mb-6">
                <span className="material-symbols-outlined text-primary">headphones</span>
                <span className="text-xs font-bold uppercase tracking-wider text-gray-300">Universo Tech</span>
              </div>
              <h2 className="text-3xl font-bold leading-tight mb-4">Bem-vindo de volta!</h2>
              <p className="text-gray-300 text-sm leading-relaxed">
                Acesse sua conta na A.J.F. Eletrônicos para acompanhar seus pedidos, verificar seus pontos de fidelidade e aproveitar ofertas exclusivas.
              </p>
            </div>

            <div className="relative z-10 mt-auto">
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-2 text-sm text-gray-300">
                  <span className="material-symbols-outlined text-primary text-base">verified_user</span>
                  <span>Login seguro e criptografado</span>
                </div>
                <div className="flex items-center gap-3 pt-2">
                  <div className="flex -space-x-3">
                    <div className="w-10 h-10 rounded-full border-2 border-navy-900 bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white font-bold text-xs">JM</div>
                    <div className="w-10 h-10 rounded-full border-2 border-navy-900 bg-gradient-to-br from-purple-400 to-purple-600 flex items-center justify-center text-white font-bold text-xs">CS</div>
                    <div className="w-10 h-10 rounded-full border-2 border-navy-900 bg-primary flex items-center justify-center text-navy-900 text-xs font-bold">+2k</div>
                  </div>
                  <p className="text-xs text-gray-400">Tech Lovers conectados.</p>
                </div>
              </div>
            </div>
          </div>

          {/* lado direito form */}
          <div className="w-full md:w-3/5 p-8 md:p-12 flex flex-col justify-center">
            <div className="mb-8">
              <h3 className="text-2xl font-bold text-navy-900 dark:text-white mb-2">Login A.J.F.</h3>
              <p className="text-navy-700 dark:text-gray-400 text-sm">Insira suas credenciais para acessar sua conta.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Email */}
              <Input
                label="E-mail"
                icon="alternate_email"
                name="email"
                type="email"
                placeholder="seu@email.com"
                value={formData.email}
                onChange={handleInputChange}
                error={errors.email}
              />

              {/* Password */}
              <Input
                label="Senha"
                icon="lock"
                name="password"
                placeholder="Sua senha"
                type={showPassword ? 'text' : 'password'}
                value={formData.password}
                onChange={handleInputChange}
                error={errors.password}
                trailing={(
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="flex items-center cursor-pointer"
                    aria-label={showPassword ? 'Esconder senha' : 'Mostrar senha'}
                  >
                    <span className="material-symbols-outlined text-gray-400 hover:text-navy-700 dark:hover:text-gray-200 text-[20px]">
                      {showPassword ? 'visibility_off' : 'visibility'}
                    </span>
                  </button>
                )}
              />

              {/* Remember Me */}
              <div className="flex items-center">
                <Checkbox
                  id="rememberMe"
                  name="rememberMe"
                  checked={formData.rememberMe}
                  onChange={handleInputChange}
                />
                <label className="ml-2 block text-xs text-navy-700 dark:text-gray-400 cursor-pointer">
                  Lembrar-me neste dispositivo
                </label>
              </div>

              {/* Submit Button */}
              <div className="pt-4">
                <Button
                  type="submit"
                  disabled={loading}
                  variant="primary"
                  size="md"
                  className="group relative flex w-full justify-center"
                >
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                    <span className="material-symbols-outlined h-5 w-5 text-navy-900/60 group-hover:text-navy-900 transition-colors">
                      login
                    </span>
                  </span>
                  {loading ? 'Entrando...' : 'Entrar'}
                </Button>
              </div>

              {/* Success Message */}
              {successMessage && (
                <div className="mt-4 p-3 bg-green-100 dark:bg-green-900/30 border border-green-300 dark:border-green-700 rounded-full text-green-700 dark:text-green-400 text-sm text-center">
                  ✓ {successMessage}
                </div>
              )}

              {errors.submit && (
                <div className="mt-4 p-3 bg-red-100 dark:bg-red-900/30 border border-red-300 dark:border-red-700 rounded-full text-red-700 dark:text-red-400 text-sm text-center">
                  ✕ {errors.submit}
                </div>
              )}
            </form>

            {/* Footer Links */}
            <div className="mt-8 text-center">
              <p className="text-xs text-navy-700 dark:text-gray-400">
                Ainda não tem uma conta? 
                <Link to="/cadastro" className="ml-1 font-bold text-navy-900 dark:text-white hover:text-primary dark:hover:text-primary transition-colors">
                  Cadastre-se
                </Link>
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="absolute bottom-4 text-center w-full pointer-events-none">
          <p className="text-[10px] text-navy-700/40 dark:text-white/20">© 2024 A.J.F. Eletrônicos - Atividade Acadêmica</p>
        </div>
      </main>
    </div>
  )
}
