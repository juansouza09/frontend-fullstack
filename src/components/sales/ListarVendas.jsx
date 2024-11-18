import { useEffect, useState } from 'react';
import './ListarVendas.css';

function ListarVendas() {
    const [vendas, setVendas] = useState([]);

    useEffect(() => {
        async function fetchVendas() {
            try {
                const response = await fetch("http://localhost:8080/api/vendas");
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
                    </tr>
                </thead>
                <tbody>
                    {vendas.map((venda) => (
                        <tr key={venda.id}>
                            <td>{venda.userId}</td>
                            <td>{venda.productId}</td>
                            <td>{venda.quantity}</td>
                            <td>{venda.price.toFixed(2)}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default ListarVendas;
