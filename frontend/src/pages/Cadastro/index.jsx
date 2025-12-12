import Header from '../../components/molecules/Header'
import CadastroForm from '../../components/organisms/CadastroForm'

export default function Cadastro() {
  return (
    <div className="bg-background-light dark:bg-background-dark font-display text-navy-900 dark:text-white transition-colors duration-200 min-h-screen flex flex-col">
      <Header hideOnScroll={true} />

      <main className="flex-grow flex items-center justify-center p-4 md:p-10 relative overflow-hidden">
        {/* Background decorations */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
          <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-primary/10 rounded-full blur-3xl opacity-60"></div>
          <div className="absolute bottom-[-10%] left-[-5%] w-[600px] h-[600px] bg-navy-800/5 dark:bg-primary/5 rounded-full blur-3xl opacity-60"></div>
        </div>

        {/* Form Container */}
        <div className="w-full max-w-[1000px] flex flex-col md:flex-row bg-white dark:bg-navy-800 rounded-lg shadow-xl overflow-hidden min-h-[600px]">
          {/* Left side - Info */}
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
              <h2 className="text-3xl font-bold leading-tight mb-4">A Tecnologia que Você Procura</h2>
              <p className="text-gray-300 text-sm leading-relaxed">
                Na A.J.F. Eletrônicos, conectamos você aos lançamentos mais recentes. Crie sua conta para descontos em hardware, smartphones e periféricos.
              </p>
            </div>

            <div className="relative z-10 mt-auto">
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-2 text-sm text-gray-300">
                  <span className="material-symbols-outlined text-primary text-base">local_shipping</span>
                  <span>Frete grátis em toda linha Gamer</span>
                </div>
                <div className="flex items-center gap-3 pt-2">
                  <div className="flex -space-x-3">
                    <div className="w-10 h-10 rounded-full border-2 border-navy-900 bg-primary flex items-center justify-center text-navy-900 text-xs font-bold">+2k</div>
                  </div>
                  <p className="text-xs text-gray-400">Tech Lovers conectados.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right side - Form */}
          <div className="w-full md:w-3/5 p-8 md:p-12 flex flex-col justify-center">
            <CadastroForm />
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
