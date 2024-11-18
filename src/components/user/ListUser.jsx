// ListUser.jsx
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/listUser.css";

function ListUser() {
  const [dados, setDados] = useState([]);
  const navigate = useNavigate(); // Hook para navegação

  // Função para buscar dados dos usuários
  const listagemUser = () => {
    fetch("http://localhost:8080/api/users/users")
      .then((response) => response.json())
      .then((data) => setDados(data))
      .catch((error) => console.error("Erro ao buscar dados:", error));
  };

  // useEffect para chamar listagemUser ao montar o componente
  useEffect(() => {
    listagemUser();
  }, []);

  return (
    <div>
      <h3>Listagem de Usuários</h3>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>CPF/CNPJ</th>
            <th>Email</th>
            <th>editar</th>
          </tr>
        </thead>
        <tbody>
          {dados.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.cpf_cnpj}</td>
              <td>{user.email}</td>

              <td>
                {/* Navega para a rota de atualização ao clicar no botão Editar */}
                <button onClick={() => navigate(`/update_user/${user.id}`)}>
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

export default ListUser;
