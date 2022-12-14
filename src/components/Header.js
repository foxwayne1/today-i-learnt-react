const Header = ({ functionForBtn, formHidden }) => {
  return (
    <header className='header'>
      <div className='logo'>
        <img src='./logo.png' alt='Logo for Today i Learnt' />
        <h1>Today I Learnt</h1>
      </div>
      <button className='btn btn-large btn-open' onClick={functionForBtn}>
        {formHidden ? 'Share a fact' : 'Close'}
      </button>
    </header>
  )
}

export default Header
