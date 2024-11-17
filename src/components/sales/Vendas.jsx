import { useState } from 'react';
import './Vendas.css';

function Vendas() {
    const [vendaData, setVendaData] = useState({
        userId: '',
        productId: '',
        quantity: '',
        price: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setVendaData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    async function submitVenda(event) {
        event.preventDefault();

        if (!vendaData.userId || !vendaData.productId || !vendaData.quantity || !vendaData.price) {
            alert("Por favor, preencha todos os campos!");
            return;
        }

        try {
            const response = await fetch("http://localhost:8000/api/vendas", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(vendaData),
            });

            const data = await response.json();
            if (response.ok) {
                alert("Venda registrada com sucesso!");
                console.log(data);
            } else {
                alert("Erro ao registrar venda.");
                console.error(data);
            }
        } catch (error) {
            alert("Erro na conexão com a API.");
            console.error(error);
        }
    }

    return (
        <div id="formulario-vendas">
            <form className='form-vendas' onSubmit={submitVenda}>
                <h2>Registrar Venda</h2>

                <label htmlFor="userId">ID do Usuário</label>
                <input
                    type="number"
                    name="userId"
                    id="userId"
                    value={vendaData.userId}
                    onChange={handleChange}
                />

                <label htmlFor="productId">ID do Produto</label>
                <input
                    type="number"
                    name="productId"
                    id="productId"
                    value={vendaData.productId}
                    onChange={handleChange}
                />

                <label htmlFor="quantity">Quantidade</label>
                <input
                    type="number"
                    name="quantity"
                    id="quantity"
                    value={vendaData.quantity}
                    onChange={handleChange}
                />

                <label htmlFor="price">Preço</label>
                <input
                    type="number"
                    name="price"
                    id="price"
                    value={vendaData.price}
                    onChange={handleChange}
                />

                <button type="submit">Registrar Venda</button>
            </form>
        </div>
    );
}

export default Vendas;
