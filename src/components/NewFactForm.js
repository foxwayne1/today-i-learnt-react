import { useState } from 'react'

function isValidHttpUrl(string) {
  let url
  try {
    url = new URL(string)
  } catch (_) {
    return false
  }
  return url.protocol === 'http:' || url.protocol === 'https:'
}

const NewFactForm = ({ categories, setFacts, setFormHidden }) => {
  const [text, setText] = useState('')
  const [source, setSource] = useState('http://example.com')
  const [category, setCategory] = useState('')

  const textLength = text.length

  const handleFormSubmit = e => {
    // 1. prevent browser reload
    e.preventDefault()

    // 2. check data is valid, if so, then create a new fact
    if (text && isValidHttpUrl(source) && category && textLength <= 200) {
      // 3. Create a new fact object
      const newFact = {
        id: Math.round(Math.random() * 1000000),
        text: text,
        source: source,
        category: category,
        votesInteresting: 0,
        votesMindblowing: 0,
        votesFalse: 0,
        createdIn: new Date().getFullYear(),
      }

      // 4. add the new fact to the UI: add the fact to state
      setFacts(facts => [newFact, ...facts])

      // 5. reset input field back t empty
      setText('')
      setSource('http://example.com')
      setCategory('')

      // 6. close form after added
      setFormHidden(true)
    }
  }

  return (
    <form className='fact-form' onSubmit={e => handleFormSubmit(e)}>
      <input
        type='text'
        placeholder='Share a fact with the world...'
        value={text}
        onChange={e => setText(e.target.value)}
        maxLength='200'
      />
      <span>{200 - textLength}</span>
      <input
        type='text'
        placeholder='Trustworthy source...'
        value={source}
        onChange={e => setSource(e.target.value)}
      />
      <select value={category} onChange={e => setCategory(e.target.value)}>
        <option value={category}>
          {category ? category.toUpperCase() : 'Choose a category'}
        </option>
        {categories.map(cat => (
          <option key={cat.color} value={cat.name}>
            {cat.name.toUpperCase()}
          </option>
        ))}
      </select>
      <button className='btn btn-large'>Post</button>
    </form>
  )
}

export default NewFactForm
