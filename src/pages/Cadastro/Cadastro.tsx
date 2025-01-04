import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../styles/Cadastro.module.css';

const Cadastro: React.FC = () => {
  const [nome, setNome] = useState<string>('');
  const [descricao, setDescricao] = useState<string>('');
  const [valor, setValor] = useState<number>(0);
  const [disponivel, setDisponivel] = useState<string>('sim');
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const produtos = JSON.parse(localStorage.getItem('produtos') || '[]');
    const novoProduto = { nome, descricao, valor, disponivel };
    localStorage.setItem('produtos', JSON.stringify([...produtos, novoProduto]));
    navigate('/listagem'); // Navegar para a página de listagem após o cadastro
  };

  return (
    <div className={styles.formContainer}>
      <form onSubmit={handleSubmit}>
        <label>
          Nome do produto:
          <input
            type="text"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            required
          />
        </label>

        <label>
          Descrição do produto:
          <textarea
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
            required
          />
        </label>

        <label>
          Valor do produto:
          <input
            type="number"
            step="0.001"
            value={valor}
            onChange={(e) => setValor(parseFloat(e.target.value))}
            required
          />
        </label>

        <label>
          Disponível para venda:
          <select
            value={disponivel}
            onChange={(e) => setDisponivel(e.target.value)}
          >
            <option value="sim">Sim</option>
            <option value="nao">Não</option>
          </select>
        </label>

        <button type="submit">Cadastrar</button>
      </form>
    </div>
  );
};

export default Cadastro;
