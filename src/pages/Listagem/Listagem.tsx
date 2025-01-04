import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MdCheckCircle, MdCancel } from 'react-icons/md'; // Importa os ícones de check e cancel

interface Produto {
  id: number;
  nome: string | null | undefined;
  descricao: string;
  valor: number;
  disponivel: string;
}

const Listagem: React.FC = () => {
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const produtosSalvos = JSON.parse(localStorage.getItem('produtos') || '[]');
    const produtosOrdenados = produtosSalvos.sort(
      (a: Produto, b: Produto) => a.valor - b.valor
    );
    setProdutos(produtosOrdenados);
  }, []);

  const handleDelete = (index: number) => {
    const produtosAtualizados = [...produtos];
    produtosAtualizados.splice(index, 1);
    localStorage.setItem('produtos', JSON.stringify(produtosAtualizados));
    setProdutos(produtosAtualizados); // Atualiza o estado com os produtos atualizados
  };

  const calcularTotal = () => {
    return produtos
      .filter((produto) => produto.disponivel === 'sim')
      .reduce((total, produto) => total + produto.valor, 0)
      .toFixed(2);
  };

  return (
    <div>
      <h1>Listagem de Produtos</h1>
      <button onClick={() => navigate('/')}>Cadastrar Novo Produto</button>

      {/* Exibindo o total dos produtos disponíveis */}
      <p>Total de Produtos Disponíveis: {calcularTotal()}</p>

      <table>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Valor</th>
            <th>Disponível</th>
            <th>Ação</th>
          </tr>
        </thead>
        <tbody>
          {produtos.map((produto, index) => (
            <tr key={produto.id}>
              <td>
                {produto.disponivel === 'sim' && (
                  <MdCheckCircle style={{ color: 'green', marginRight: '8px' }} />
                )}
                {produto.disponivel === 'nao' && (
                  <MdCancel style={{ color: 'red', marginRight: '8px' }} />
                )}
                {produto.nome ?? 'Produto não especificado'}
              </td>
              <td>{produto.valor.toFixed(2)}</td>
              <td>{produto.disponivel === 'sim' ? 'Sim' : 'Não'}</td>
              <td>
                <button onClick={() => handleDelete(index)}>Excluir</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Listagem;
