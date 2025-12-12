import Icon from '../../atoms/Icon'
import Text from '../../atoms/Text'

export default function Footer() {
  return (
    <footer className="bg-navy-800 text-gray-300">
      <div className="max-w-[1200px] mx-auto px-4 md:px-8 py-12">
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* About */}
          <div>
            <Text variant="h5" className="mb-4">E-Commerce GPS</Text>
            <Text variant="caption" className="mb-4 leading-relaxed">
              Sua loja de tecnologia online de confiança. Produtos de qualidade com melhor preço do mercado.
            </Text>
            <div className="flex gap-3 items-center">
              <a href="#" aria-label="Facebook" className="hover:text-primary transition-colors">
                <Icon name="facebook" size="md" />
              </a>
              <a href="#" aria-label="Instagram" className="hover:text-primary transition-colors">
                <Icon name="instagram" size="md" />
              </a>
              <a href="#" aria-label="YouTube" className="hover:text-primary transition-colors">
                <Icon name="youtube" size="md" />
              </a>
              <a href="#" aria-label="Twitter" className="hover:text-primary transition-colors">
                <Icon name="twitter" size="md" />
              </a>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-white font-bold mb-4">Navegação</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="/" className="hover:text-primary transition-colors">Home</a></li>
              <li><a href="/produtos" className="hover:text-primary transition-colors">Smartphones</a></li>
              <li><a href="/produtos" className="hover:text-primary transition-colors">Computadores</a></li>
              <li><a href="/produtos" className="hover:text-primary transition-colors">Acessórios</a></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-white font-bold mb-4">Suporte</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-primary transition-colors">Central de Ajuda</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Meus Pedidos</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Devoluções</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Termos e Condições</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <Text variant="h6" color="text-white" className="font-bold mb-4">Contato</Text>
            <ul className="space-y-3 text-sm">
              <li className="flex gap-2">
                <Icon name="location_on" size="md" className="text-primary flex-shrink-0" />
                <span>Rua das Tecnologias, 123<br/>São Paulo - SP</span>
              </li>
              <li className="flex gap-2">
                <Icon name="mail" size="md" className="text-primary flex-shrink-0" />
                <span>contato@ecommercegps.com</span>
              </li>
              <li className="flex gap-2">
                <Icon name="phone" size="md" className="text-primary flex-shrink-0" />
                <span>(11) 9999-9999</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-navy-700 my-8"></div>

        {/* Bottom */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-xs">
          <p>&copy; 2024 E-Commerce GPS. Todos os direitos reservados.</p>
          <div className="flex gap-4">
            <span>Formas de Pagamento:</span>
            <span className="material-symbols-outlined">credit_card</span>
            <span className="material-symbols-outlined">account_balance</span>
            <span className="material-symbols-outlined">phone_iphone</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
