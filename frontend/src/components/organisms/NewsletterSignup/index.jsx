import { useState } from 'react'
import Button from '../../atoms/Button'
import Icon from '../../atoms/Icon'
import Text from '../../atoms/Text'

export default function NewsletterSignup() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setLoading(true)
    
    // Simular envio
    setTimeout(() => {
      setLoading(false)
      setEmail('')
      alert('Email cadastrado com sucesso! Aproveite 10% OFF')
    }, 1000)
  }

  return (
    <section className="bg-navy-900 py-12">
      <div className="max-w-[1200px] mx-auto px-4 md:px-8">
        <div className="text-center mb-8">
          <Text variant="h2" className="mb-2">
            Ganhe 10% OFF na primeira compra
          </Text>
          <Text color="text-gray-400">
            Inscreva-se na nossa newsletter e receba promoções exclusivas
          </Text>
        </div>

        <div className="flex justify-center">
          <form onSubmit={handleSubmit} className="w-full max-w-md">
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="flex-1 relative">
                <Icon name="mail" size="md" className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="email"
                  placeholder="seu@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full bg-white text-navy-900 rounded-lg pl-12 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary placeholder:text-gray-400"
                />
              </div>
              <Button
                type="submit"
                variant="primary"
                size="md"
                disabled={loading}
                className="whitespace-nowrap"
              >
                {loading ? 'Cadastrando...' : 'Cadastrar'}
              </Button>
            </div>
            <Text variant="caption" color="text-gray-400" className="mt-3 text-center">
              Ao se cadastrar, você concorda com nossa <a href="#" className="text-primary hover:underline">política de privacidade</a>
            </Text>
          </form>
        </div>
      </div>
    </section>
  )
}
