import React, { useEffect, useState } from 'react'
import Header from './components/Header'
import CategoryFilter from './components/CategoryFilter'
import NewFactForm from './components/NewFactForm'
import FactList from './components/FactList'
import Loader from './components/Loader'
import supabase from './supabaseClient'

// data
const CATEGORIES = [
  { name: 'technology', color: '#3b82f6' },
  { name: 'science', color: '#16a34a' },
  { name: 'finance', color: '#ef4444' },
  { name: 'society', color: '#eab308' },
  { name: 'entertainment', color: '#db2777' },
  { name: 'health', color: '#14b8a6' },
  { name: 'history', color: '#f97316' },
  { name: 'news', color: '#8b5cf6' },
]

function App() {
  const [formHidden, setFormHidden] = useState(true)
  const [facts, setFacts] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [currentCategory, setCurrentCategory] = useState('all')

  // load data
  useEffect(() => {
    async function getFacts() {
      setIsLoading(true)

      let query = supabase.from('facts').select('*')
      if (currentCategory !== 'all')
        query = query.eq('category', currentCategory)

      let { data: facts, error } = await query
        .order('votesInteresting', { ascending: false })
        .limit(999)
      setFacts(facts)

      if (!error) setFacts(facts)
      else alert('There was a problem with getting your data.')

      setIsLoading(false)
    }
    getFacts()
  }, [currentCategory])

  const handleFormHidden = () => {
    setFormHidden(formHidden => !formHidden)
  }

  return (
    <>
      <Header functionForBtn={handleFormHidden} formHidden={formHidden} />
      {!formHidden && (
        <NewFactForm
          categories={CATEGORIES}
          setFacts={setFacts}
          setFormHidden={setFormHidden}
        />
      )}
      <main className='main'>
        <CategoryFilter
          categories={CATEGORIES}
          setCurrentCategory={setCurrentCategory}
        />
        {isLoading ? (
          <Loader />
        ) : (
          <FactList facts={facts} categories={CATEGORIES} setFacts={setFacts} />
        )}
      </main>
    </>
  )
}

export default App
