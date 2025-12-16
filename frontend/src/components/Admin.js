import React, { useState, useEffect } from 'react';
import './Admin.css';

function Admin() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [title, setTitle] = useState('Jhenny Nails - Beleza e Elegância');
  const [description, setDescription] = useState('Transforme suas unhas com designs únicos e profissionais.');
  const [portfolio, setPortfolio] = useState([]);
  const [newImage, setNewImage] = useState(null);
  const [newTitle, setNewTitle] = useState('');
  const [newDesc, setNewDesc] = useState('');

  useEffect(() => {
    const loggedIn = localStorage.getItem('adminLoggedIn');
    if (loggedIn === 'true') setIsLoggedIn(true);

    const storedTitle = localStorage.getItem('title') || title;
    const storedDesc = localStorage.getItem('description') || description;
    const storedPortfolio = localStorage.getItem('portfolio');
    setTitle(storedTitle);
    setDescription(storedDesc);
    if (storedPortfolio) setPortfolio(JSON.parse(storedPortfolio));
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    if (email === 'jhennynails@gmail.com' && password === 'Analise@23') {
      setIsLoggedIn(true);
      localStorage.setItem('adminLoggedIn', 'true');
    } else {
      alert('Credenciais inválidas');
    }
  };

  const handleSave = () => {
    localStorage.setItem('title', title);
    localStorage.setItem('description', description);
    localStorage.setItem('portfolio', JSON.stringify(portfolio));
    alert('Alterações salvas!');
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setNewImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const addPortfolioItem = () => {
    if (newImage && newTitle && newDesc) {
      const newItem = { image: newImage, title: newTitle, description: newDesc };
      setPortfolio([...portfolio, newItem]);
      setNewImage(null);
      setNewTitle('');
      setNewDesc('');
    }
  };

  const removeItem = (index) => {
    const updated = portfolio.filter((_, i) => i !== index);
    setPortfolio(updated);
  };

  if (!isLoggedIn) {
    return (
      <div className="admin-login">
        <h2>Admin Login</h2>
        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">Entrar</button>
        </form>
      </div>
    );
  }

  return (
    <div className="admin">
      <h2>Painel Administrativo</h2>
      <div className="edit-section">
        <h3>Editar Página Inicial</h3>
        <label>Título:</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <label>Descrição:</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <div className="portfolio-section">
        <h3>Gerenciar Portfólio</h3>
        <input type="file" accept="image/*" onChange={handleImageUpload} />
        <input
          type="text"
          placeholder="Título da imagem"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
        />
        <textarea
          placeholder="Descrição"
          value={newDesc}
          onChange={(e) => setNewDesc(e.target.value)}
        />
        <button onClick={addPortfolioItem}>Adicionar</button>
        <div className="portfolio-list">
          {portfolio.map((item, index) => (
            <div key={index} className="portfolio-item">
              <img src={item.image} alt={item.title} />
              <p>{item.title}</p>
              <button onClick={() => removeItem(index)}>Remover</button>
            </div>
          ))}
        </div>
      </div>
      <button className="save-btn" onClick={handleSave}>Salvar Alterações</button>
    </div>
  );
}

export default Admin;