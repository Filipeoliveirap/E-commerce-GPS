import Icon from '../../atoms/Icon'

export default function BenefitsBar() {
  const benefits = [
    {
      icon: 'local_shipping',
      title: 'Frete Grátis Brasil*',
    },
    {
      icon: 'credit_card',
      title: 'Até 12x Sem Juros',
    },
    {
      icon: 'verified',
      title: 'Garantia Estendida',
    },
    {
      icon: 'package_2',
      title: 'Troca Facilitada',
    }
  ]

  return (
    <section className="bg-primary py-5">
      <div className="max-w-[1200px] mx-auto px-4 md:px-8">
        <div className="flex flex-wrap justify-between items-center gap-6 text-navy-900 font-bold text-sm md:text-base">
          {benefits.map((benefit, index) => (
            <div key={index} className="flex items-center gap-3">
              <div className="bg-navy-900/10 p-2 rounded-full">
                <Icon name={benefit.icon} size="md" />
              </div>
              <span>{benefit.title}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
