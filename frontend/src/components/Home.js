import React, { useState, useEffect } from 'react';
import './Home.css';

function Home() {
  const [title, setTitle] = useState('Jhenny Nails - Beleza e Elegância');
  const [description, setDescription] = useState('Transforme suas unhas com designs únicos e profissionais.');
  const [portfolio, setPortfolio] = useState([]);

  useEffect(() => {
    const storedTitle = localStorage.getItem('title');
    const storedDesc = localStorage.getItem('description');
    const storedPortfolio = localStorage.getItem('portfolio');
    if (storedTitle) setTitle(storedTitle);
    if (storedDesc) setDescription(storedDesc);
    if (storedPortfolio) {
      setPortfolio(JSON.parse(storedPortfolio));
    } else {
      // Load default portfolio from JSON
      fetch('/portfolio/images.json')
        .then(response => response.json())
        .then(data => setPortfolio(data))
        .catch(error => console.error('Error loading portfolio:', error));
    }
  }, []);

  const handleOrder = () => {
    window.open('https://wa.me/5561994018715?text=Oi%2C%20estou%20interessada...', '_blank');
  };

  return (
    <div className="home">
      <header className="top-bar">
        <h1>Jhenny Nails</h1>
        <button className="whatsapp-btn" onClick={handleOrder}>
          📱 WhatsApp
        </button>
      </header>
      <section className="hero">
        <h2>{title}</h2>
        <p>{description}</p>
        <button className="cta-btn" onClick={handleOrder}>Peça agora a sua</button>
      </section>
      <section className="portfolio">
        <h3>Portfólio</h3>
        <div className="carousel">
          {[...portfolio, ...portfolio].map((item, index) => (
            <div key={index} className="carousel-item">
              <img src={typeof item === 'string' ? item : item.image} alt={`Portfolio ${(index % portfolio.length) + 1}`} />
            </div>
          ))}
        </div>
      </section>
      <section className="how-to">
        <h3>Como Aplicar</h3>
        <p>Instruções simples para cuidar das suas unhas em casa.</p>
        <ol>
          <li>Limpe as unhas.</li>
          <li>Aplique a base.</li>
          <li>Pinte com a cor desejada.</li>
          <li>Finalize com top coat.</li>
        </ol>
      </section>
    </div>
  );
}

export default Home;