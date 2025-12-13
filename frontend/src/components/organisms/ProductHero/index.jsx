import Button from '../../atoms/Button'
import Icon from '../../atoms/Icon'
import Text from '../../atoms/Text'


export default function ProductHero() {
    return (
        <section className="relative w-full bg-navy-900 overflow-hidden min-h-[400px] flex items-center">
            <div className="absolute inset-0 w-full h-full">
                <img
                    alt="Tech gadgets background"
                    className="absolute inset-0 w-full h-full object-cover opacity-30 mix-blend-overlay"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuBY9afqWki38RCfLpHCsZ-WcBBKC12N9UOuDCS6ZX4cqArgLNfM4JfkL-oxMaL8m7aGIQlszwg7vy1N-b6dHnRzcSHV2jQ7_8VukofogzR38DUx5-ANUD7d4fcDWRhgV2Nwr9cL9e_3LtFwvxtk3mMEFxGRZ9w4quhag0qz0Qp4yeL7LhnvcgpeFV-Y7lxpJygpBXM7hgY-1JfMVJCMpvcC1pibMvT1FNQP7U62dxXI6ceeDEpPboKgdx7CmdhvQp87PZ5684Q9oRc"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-navy-900 via-navy-900/95 to-navy-900/40 z-0"></div>
                <div className="absolute top-[-10%] right-[10%] w-[400px] h-[400px] bg-primary/20 rounded-full blur-3xl opacity-50"></div>
                <div className="absolute bottom-[-10%] left-[-5%] w-[300px] h-[300px] bg-blue-500/10 rounded-full blur-3xl opacity-40"></div>
            </div>

            <div className="relative z-10 max-w-[1200px] mx-auto px-4 md:px-8 py-12 w-full">
                <div className="w-full md:w-3/5">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-navy-800/80 border border-navy-700 mb-6 backdrop-blur-sm">
                        <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
                        <span className="text-xs font-bold text-primary tracking-wide uppercase">
                            Maior Seleção de Eletrônicos
                        </span>
                    </div>

                    <h2 className="text-4xl md:text-5xl font-bold text-white leading-[1.1] mb-6">
                        Encontre a Tecnologia<br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-yellow-200">
                            Ideal para Você
                        </span>
                    </h2>

                    <Text color="text-gray-300" className="text-lg mb-8 max-w-lg leading-relaxed font-light">
                        Explore nossa coleção com os melhores produtos em eletrônicos, garantia de qualidade e suporte especializado.
                    </Text>

                    <Button
                        variant="primary"
                        size="lg"
                        className="flex items-center gap-2 shadow-lg hover:shadow-xl hover:shadow-primary/50 hover:-translate-y-1"
                    >
                        <span className="whitespace-nowrap">Explorar Ofertas</span>
                        <Icon name="arrow_forward" size="md" />
                    </Button>


                </div>
            </div>
        </section>
    )
}
