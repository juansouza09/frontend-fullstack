import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./AtualizarProduto.css";

function AtualizarProduto() {
  const { id } = useParams();
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    quantity: "",
    price: "",
    userId: "",
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProduto() {
      try {
        const response = await fetch(
          `http://localhost:8080/api/produtos/produto/${id}`
        );
        if (response.ok) {
          const data = await response.json();
          console.log(data)
          setFormData(data);
        } else {
          alert("Erro ao buscar o produto.");
        }
      } catch (error) {
        alert("Erro na conexão com a API.");
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    if (id) {
      fetchProduto();
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  async function atualizarProduto(event) {
    event.preventDefault();

    if (
      !formData.name ||
      !formData.quantity ||
      !formData.price ||
      !formData.userId
    ) {
      alert("Por favor, preencha todos os campos!");
      return;
    }

    const updatedProduto = {
      ...formData,
      quantity: parseInt(formData.quantity, 10),
      price: parseFloat(formData.price),
    };

    try {
      const response = await fetch(
        `http://localhost:8080/api/produtos/produto/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedProduto),
        }
      );

      if (response.ok) {
        alert("Produto atualizado com sucesso!");
      } else {
        alert("Erro ao atualizar o produto.");
      }
    } catch (error) {
      alert("Erro na conexão com a API.");
      console.error(error);
    }
  }

  if (loading) {
    return <p>Carregando...</p>;
  }

  return (
    <div className="atualizar-produto">
      <h2>Atualizar Produto</h2>
      <form className="forms" onSubmit={atualizarProduto}>
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

        <button type="submit">Atualizar Produto</button>
      </form>
    </div>
  );
}

export default AtualizarProduto;
