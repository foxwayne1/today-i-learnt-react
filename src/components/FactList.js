import Fact from './Fact'

const FactList = ({ facts, categories, setFacts }) => {
  if (facts.length === 0) {
    return <p>No Facts for this category yet, Go create one.</p>
  }

  return (
    <section>
      <ul className='facts-list'>
        {facts.map(fact => (
          <Fact
            key={fact.id}
            fact={fact}
            categories={categories}
            setFacts={setFacts}
          />
        ))}
      </ul>
    </section>
  )
}

export default FactList
