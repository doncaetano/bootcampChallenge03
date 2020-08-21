import React from "react";

import "./styles.css";
import { useState, useEffect } from "react";
import api from './services/api';

function App() {

  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get('repositories')
      .then(response => {
        setRepositories(response.data);
      })
  }, []);

  async function handleAddRepository() {
    const result = await api.post('repositories', {
      title: 'Testando add',
      url: 'https://oi.com.br',
      techs: ['nodejs', 'postgresql']
    })
    
    setRepositories([...repositories, result.data]);
  }

  async function handleRemoveRepository(id) {
    api.delete(`repositories/${id}`)
      .then(() => {
        const newRepo = repositories.filter(x => x.id !== id);
        setRepositories(newRepo);
      })
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repository =>
          <li key={repository.id}>{repository.title}
            <button onClick={() => handleRemoveRepository(repository.id)}>Remover</button>
          </li>
        )}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
