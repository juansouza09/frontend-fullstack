import { useState } from 'react';
import './CadastroProduto.css';

function CadastroProduto() {

    const [formData, setFormData] = useState({
        name: '',
        quantity: '',
        price: '',
        userId: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    async function enviarProduto(event) {
        event.preventDefault();

        if (!formData.name || !formData.quantity || !formData.price || !formData.userId) {
            alert("Por favor, preencha todos os campos!");
            return;
        }

        const productData = {
            ...formData,
            quantity: parseInt(formData.quantity, 10), // Converte para número inteiro.
            price: parseFloat(formData.price)         // Converte para número de ponto flutuante.
        };

        try {
            const response = await fetch("http://localhost:8000/api/produtos", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(productData),
            });

            const data = await response.json();
            if (response.ok) {
                alert("Produto cadastrado com sucesso!");
                console.log(data);
            } else {
                alert("Erro ao cadastrar o produto.");
                console.error(data);
            }
        } catch (error) {
            alert("Erro na conexão com a API.");
            console.error(error);
        }
    }

    return (
        <div id="formulario-produto">
            <form className='forms' onSubmit={enviarProduto}>
                <h2>Cadastro de Produto</h2>

                <label htmlFor="name">Nome</label>
                <input
                    type="text"
                    name="name"
                    id="name"
                    value={formData.name}
                    onChange={handleChange}
                />

                <label htmlFor="quantity">Quantidade</label>
                <input
                    type="number"
                    name="quantity"
                    id="quantity"
                    value={formData.quantity}
                    onChange={handleChange}
                />

                <label htmlFor="price">Preço</label>
                <input
                    type="number"
                    step="0.01"
                    name="price"
                    id="price"
                    value={formData.price}
                    onChange={handleChange}
                />
                
                <label htmlFor="userId">ID do Usuário</label>
                <input
                    type="text"
                    name="userId"
                    id="userId"
                    value={formData.userId}
                    onChange={handleChange}
                />

                <button type="submit">Cadastrar Produto</button>
            </form>
        </div>
    );
}

export default CadastroProduto;
