import Header from '../../components/molecules/Header'
import Button from '../../components/atoms/Button'
import Icon from '../../components/atoms/Icon'
import Text from '../../components/atoms/Text'
import { Link } from 'react-router-dom'

export default function Home() {
  return (
    <div className="bg-background-light dark:bg-background-dark font-display text-navy-900 dark:text-white transition-colors duration-200 min-h-screen flex flex-col">
      <Header hideOnScroll={true} />

      <main className="flex-grow flex flex-col items-center justify-center p-4 md:p-10 relative overflow-hidden">
        {/* Background decorations */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
          <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-primary/10 rounded-full blur-3xl opacity-60"></div>
          <div className="absolute bottom-[-10%] left-[-5%] w-[600px] h-[600px] bg-navy-800/5 dark:bg-primary/5 rounded-full blur-3xl opacity-60"></div>
        </div>

        {/* Hero Section */}
        <div className="w-full max-w-4xl text-center relative z-10 py-20">
          <div className="flex items-center justify-center mb-6">
            <div className="flex items-center justify-center size-16 rounded-full bg-primary/20 text-navy-900 dark:text-primary">
              <Icon name="shopping_cart" size="xl" />
            </div>
          </div>

          <Text variant="h1" className="mb-6">
            Bem-vindo à A.J.F. Eletrônicos
          </Text>

          <Text variant="body" color="text-navy-700 dark:text-gray-300" className="text-lg md:text-xl mb-12 max-w-2xl mx-auto">
            Sua loja online de eletrônicos com os melhores produtos em tecnologia, smartphones, computadores e muito mais.
          </Text>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Link to="/cadastro">
              <Button variant="primary" size="lg" icon="person_add">
                Criar Conta
              </Button>
            </Link>
            <Link to="/login">
              <Button variant="secondary" size="lg" icon="login">
                Fazer Login
              </Button>
            </Link>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
            <div className="bg-white dark:bg-navy-800 rounded-lg p-6 shadow-md hover:shadow-lg transition-all">
              <div className="flex justify-center mb-4">
                <Icon name="local_shipping" size="xl" className="text-primary" />
              </div>
              <Text variant="h5" className="mb-2">Frete Grátis</Text>
              <Text variant="caption" color="text-navy-700 dark:text-gray-400">Frete grátis em toda linha Gamer e eletrônicos.</Text>
            </div>

            <div className="bg-white dark:bg-navy-800 rounded-lg p-6 shadow-md hover:shadow-lg transition-all">
              <div className="flex justify-center mb-4">
                <Icon name="security" size="xl" className="text-primary" />
              </div>
              <Text variant="h5" className="mb-2">Compra Segura</Text>
              <Text variant="caption" color="text-navy-700 dark:text-gray-400">Seus dados são protegidos com criptografia SSL.</Text>
            </div>

            <div className="bg-white dark:bg-navy-800 rounded-lg p-6 shadow-md hover:shadow-lg transition-all">
              <div className="flex justify-center mb-4">
                <Icon name="headset_mic" size="xl" className="text-primary" />
              </div>
              <Text variant="h5" className="mb-2">Suporte 24/7</Text>
              <Text variant="caption" color="text-navy-700 dark:text-gray-400">Estamos sempre prontos para ajudar você.</Text>
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
