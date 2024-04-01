import React, { useState, useEffect } from 'react';

function App() {
  const [emojis, setEmojis] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetch('https://my-json-server.typicode.com/hiktoras/siliconmade-odev/emojis')
      .then(async (response) => {
        let responseJson = await response.json()
        console.log(responseJson)
        return responseJson;
      })
      .then(data => setEmojis(data));
  }, []);



  function handleSearch(e) {
    setSearch(e.target.value);
  }

  function handleEmojiClick(emojiSymbol) {
    navigator.clipboard.writeText(emojiSymbol)
      .then(() => alert(`${emojiSymbol} emojisi panoya kopyalandı!`))
      .catch(err => console.error('Emoji kopyalanamadı:', err));
  }

  const filteredEmojis = emojis.filter(emoji =>
    emoji.name.includes(search.toLowerCase())
  );

  return (
    <div>
  
      <h3 className='header'> 🐺 Emoji Arama Motoru 🐺</h3>
     
      <input className='input' type="text" placeholder="Emoji ara..." onChange={handleSearch} />
      <div>
        {filteredEmojis.map(emoji => (
          <div className='emoji' key={emoji.id}>
            {emoji.symbol} {emoji.name}
            <button className="button" onClick={() => handleEmojiClick(emoji.symbol)} style={{ cursor: 'pointer' }}>Emojiyi kopyalayin</button>
          </div>

        ))}

      </div>
    </div>
  );
}

export default App;
