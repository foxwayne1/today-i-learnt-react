import { useState } from 'react'
import supabase from '../supabaseClient'

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
  const [isUploading, setIsUploading] = useState(false)

  const textLength = text.length

  const handleFormSubmit = async e => {
    // 1. prevent browser reload
    e.preventDefault()

    // 2. check data is valid, if so, then create a new fact
    if (text && isValidHttpUrl(source) && category && textLength <= 200) {
      // 3. upload fact to supabase and recieve the new fact object
      setIsUploading(true)
      const { data: newFact, error } = await supabase
        .from('facts')
        .insert([{ text, source, category }])
        .select()

      console.log(newFact)

      // 4. add the new fact to the UI: add the fact to state
      if (!error) setFacts(facts => [newFact[0], ...facts])
      setIsUploading(false)

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
        disabled={isUploading}
      />
      <span>{200 - textLength}</span>
      <input
        type='text'
        placeholder='Trustworthy source...'
        value={source}
        onChange={e => setSource(e.target.value)}
        disabled={isUploading}
      />
      <select
        value={category}
        disabled={isUploading}
        onChange={e => setCategory(e.target.value)}
      >
        <option value={category}>
          {category ? category.toUpperCase() : 'Choose a category'}
        </option>
        {categories.map(cat => (
          <option key={cat.color} value={cat.name}>
            {cat.name.toUpperCase()}
          </option>
        ))}
      </select>
      <button className='btn btn-large' disabled={isUploading}>
        Post
      </button>
    </form>
  )
}

export default NewFactForm
