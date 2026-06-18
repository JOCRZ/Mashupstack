import React, { useState } from 'react';

function Navbar() {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    console.log('Searching for:', searchTerm);
  };

  return (
    <nav style={styles.nav}>
      <div style={styles.title}>StreamFe</div>

      <form onSubmit={handleSearch} style={styles.searchForm}>
        <input
          type="text"
          placeholder="Search movies..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={styles.searchInput}
        />
      </form>

      <button style={styles.watchListBtn}>Watch List</button>

      <button style={styles.signInBtn}>Sign In</button>
    </nav>
  );
}

const styles = {
  nav: {
    display: 'flex',
    alignItems: 'center',
    gap: '15px',
    padding: '15px 20px',
    background: '#232434',
    borderBottom: '1px solid #212121',
  },
  title: {
    fontSize: '24px',
    fontWeight: 700,
    color: '#ffffff',
    fontFamily: 'Source Sans Pro Topnav, sans-serif',
  },
  searchForm: {
    marginLeft: 'auto',
  },
  searchInput: {
    padding: '10px 15px',
    borderRadius: '14px',
    border: '1px solid #212121',
    background: '#000000',
    color: '#ffffff',
    fontSize: '14px',
    fontFamily: 'Source Sans Pro, sans-serif',
    outline: 'none',
    width: '200px',
  },
  watchListBtn: {
    padding: '10px 20px',
    borderRadius: '14px',
    border: '1px solid #212121',
    background: 'transparent',
    color: '#ffffff',
    fontSize: '14px',
    fontWeight: 500,
    cursor: 'pointer',
    fontFamily: 'Source Sans Pro Topnav, sans-serif',
  },
  signInBtn: {
    padding: '10px 20px',
    borderRadius: '14px',
    border: 'none',
    background: '#444444',
    color: '#ffffff',
    fontSize: '14px',
    fontWeight: 500,
    cursor: 'pointer',
    fontFamily: 'Source Sans Pro Topnav, sans-serif',
  },
};

export default Navbar;
