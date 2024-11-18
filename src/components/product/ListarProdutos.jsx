import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './ListarProdutos.css';

function ListarProdutos() {
    const [produtos, setProdutos] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate(); // Hook para navegação.

    useEffect(() => {
        async function fetchProdutos() {
            try {
                const response = await fetch("http://localhost:8080/api/produtos/produtos");
                if (response.ok) {
                    const data = await response.json();
                    console.log(data)
                    setProdutos(data);
                } else {
                    alert("Erro ao buscar os produtos.");
                }
            } catch (error) {
                alert("Erro na conexão com a API.");
                console.error(error);
            } finally {
                setLoading(false);
            }
        }

        fetchProdutos();
    }, []);

    const handleEdit = (id) => {
        navigate(`/update_product/${id}`); // Redireciona para a página de atualização do produto.
    };

    if (loading) {
        return <p>Carregando...</p>;
    }

    return (
        <div className="listar-produtos">
            <h2>Lista de Produtos</h2>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nome</th>
                        <th>Quantidade</th>
                        <th>Preço</th>
                        <th>ID do Usuário</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {produtos.map((produto) => (
                        <tr key={produto.id}>
                            <td>{produto.id}</td>
                            <td>{produto.name}</td>
                            <td>{produto.quantity}</td>
                            <td>R$ {produto.price.toFixed(2)}</td>
                            <td>{produto.userId}</td>
                            <td>
                                <button
                                    className="btn-editar"
                                    onClick={() => handleEdit(produto.id)}
                                >
                                    Editar
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default ListarProdutos;
