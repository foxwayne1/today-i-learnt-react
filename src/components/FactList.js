import Fact from './Fact'

const FactList = ({ facts, categories }) => {
  return (
    <section>
      <ul className='facts-list'>
        {facts.map(fact => (
          <Fact key={fact.id} fact={fact} categories={categories} />
        ))}
      </ul>
    </section>
  )
}

export default FactList
