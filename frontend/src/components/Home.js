import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Particles from '@tsparticles/react';
import { loadSlim } from '@tsparticles/slim';
import './Home.css';

function Home() {
  const [title, setTitle] = useState('Jhenny Nails - Beleza e Elegância');
  const [description, setDescription] = useState('Transforme suas unhas com designs únicos e profissionais.');
  const [portfolio, setPortfolio] = useState([]);

  useEffect(() => {
    const storedTitle = localStorage.getItem('title');
    const storedDesc = localStorage.getItem('description');
    if (storedTitle) setTitle(storedTitle);
    if (storedDesc) setDescription(storedDesc);
    // Always load portfolio from JSON for automatic loading
    fetch('/portfolio/images.json')
      .then(response => response.json())
      .then(data => setPortfolio(data))
      .catch(error => console.error('Error loading portfolio:', error));
  }, []);

  const particlesInit = async (engine) => {
    await loadSlim(engine);
  };

  const particlesOptions = {
    background: {
      color: {
        value: "transparent",
      },
    },
    fpsLimit: 120,
    interactivity: {
      events: {
        onClick: {
          enable: true,
          mode: "push",
        },
        onHover: {
          enable: true,
          mode: "repulse",
        },
        resize: true,
      },
      modes: {
        push: {
          quantity: 4,
        },
        repulse: {
          distance: 200,
          duration: 0.4,
        },
      },
    },
    particles: {
      color: {
        value: "#ab47bc",
      },
      links: {
        color: "#ab47bc",
        distance: 150,
        enable: true,
        opacity: 0.5,
        width: 1,
      },
      collisions: {
        enable: true,
      },
      move: {
        direction: "none",
        enable: true,
        outModes: {
          default: "bounce",
        },
        random: false,
        speed: 2,
        straight: false,
      },
      number: {
        density: {
          enable: true,
          area: 800,
        },
        value: 80,
      },
      opacity: {
        value: 0.5,
      },
      shape: {
        type: "circle",
      },
      size: {
        value: { min: 1, max: 5 },
      },
    },
    detectRetina: true,
  };

  const handleOrder = () => {
    window.open('https://wa.me/5561994018715?text=Oi%2C%20estou%20interessada...', '_blank');
  };

  return (
    <div className="home">
      <Particles
        id="tsparticles"
        init={particlesInit}
        options={particlesOptions}
        className="particles-background"
      />
      <header className="top-bar">
        <motion.h1
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          Jhenny Nails
        </motion.h1>
        <motion.button
          className="whatsapp-btn"
          onClick={handleOrder}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          📱 WhatsApp
        </motion.button>
      </header>
      <motion.section
        className="hero"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
      >
        <motion.h2
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          {title}
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.7 }}
        >
          {description}
        </motion.p>
        <motion.button
          className="cta-btn"
          onClick={handleOrder}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Peça agora a sua
        </motion.button>
      </motion.section>
      <motion.section
        className="portfolio"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
      >
        <motion.h3
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          Portfólio
        </motion.h3>
        <div className="carousel">
          {[...portfolio, ...portfolio, ...portfolio, ...portfolio].map((item, index) => (
            <motion.div
              key={index}
              className="carousel-item"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <img src={typeof item === 'string' ? item : item.image} alt={`Portfolio ${(index % portfolio.length) + 1}`} />
            </motion.div>
          ))}
        </div>
      </motion.section>
      <motion.section
        className="how-to"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
      >
        <motion.h3
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          Como Aplicar
        </motion.h3>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.4 }}
        >
          Instruções simples para cuidar das suas unhas em casa.
        </motion.p>
        <motion.div
          className="steps-grid"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.6 }}
        >
          <div className="step">
            <div className="step-icon">🧼</div>
            <h4>Passo 1</h4>
            <p>Limpe as unhas com removedor de esmalte e água morna.</p>
          </div>
          <div className="step">
            <div className="step-icon">🖌️</div>
            <h4>Passo 2</h4>
            <p>Aplique uma camada fina de base para proteger as unhas.</p>
          </div>
          <div className="step">
            <div className="step-icon">🎨</div>
            <h4>Passo 3</h4>
            <p>Pinte com a cor desejada em movimentos suaves.</p>
          </div>
          <div className="step">
            <div className="step-icon">✨</div>
            <h4>Passo 4</h4>
            <p>Finalize com top coat para brilho e durabilidade.</p>
          </div>
        </motion.div>
      </motion.section>
    </div>
  );
}

export default Home;