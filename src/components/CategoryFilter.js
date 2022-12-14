const CategoryFilter = ({ categories }) => {
  return (
    <aside>
      <ul>
        <li className='category'>
          <button className='btn btn-all-categories'>All</button>
        </li>
        {categories.map(cat => (
          <li key={cat.color} className='category'>
            <button
              className='btn btn-category'
              style={{ backgroundColor: cat.color }}
            >
              {cat.name}
            </button>
          </li>
        ))}
      </ul>
    </aside>
  )
}

export default CategoryFilter
