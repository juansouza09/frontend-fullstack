import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Importar useNavigate para navegação
import './ListarVendas.css';

function ListarVendas() {
    const [vendas, setVendas] = useState([]);
    const navigate = useNavigate(); // Usando useNavigate para navegação programática

    // Função para buscar as vendas
    useEffect(() => {
        async function fetchVendas() {
            try {
                const response = await fetch("http://localhost:8000/api/vendas");
                const data = await response.json();
                if (response.ok) {
                    setVendas(data);
                } else {
                    console.error("Erro ao buscar vendas:", data);
                }
            } catch (error) {
                console.error("Erro na conexão com a API:", error);
            }
        }

        fetchVendas();
    }, []);

    // Função para inativar uma venda
    const handleInativar = async (id) => {
        try {
            const response = await fetch(`http://localhost:8000/api/vendas/inativar/${id}`, {
                method: 'GET', // Método GET para inativar a venda
            });

            if (response.ok) {
                // Atualiza o estado local removendo a venda inativada
                setVendas(vendas.filter((venda) => venda.id !== id));
                alert('Venda inativada com sucesso!');
            } else {
                console.error('Erro ao inativar a venda');
                alert('Erro ao inativar a venda');
            }
        } catch (error) {
            console.error('Erro na conexão com a API ao inativar a venda:', error);
            alert('Erro na conexão ao inativar a venda');
        }
    };

    return (
        <div id="listar-vendas">
            <h2>Lista de Vendas</h2>
            <table className="vendas-table">
                <thead>
                    <tr>
                        <th>ID do Usuário</th>
                        <th>ID do Produto</th>
                        <th>Quantidade</th>
                        <th>Preço</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {vendas.map((venda) => (
                        <tr key={venda.id}>
                            <td>{venda.userId}</td>
                            <td>{venda.productId}</td>
                            <td>{venda.quantity}</td>
                            <td>{venda.price.toFixed(2)}</td>
                            <td>
                                <button
                                    className="btn-inativar"
                                    onClick={() => handleInativar(venda.id)} // Chama a função handleInativar
                                >
                                    Inativar
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default ListarVendas;
