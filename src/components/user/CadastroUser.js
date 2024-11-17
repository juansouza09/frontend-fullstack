import { useState } from 'react';
import './CadastroUser.css';

function CadastroUser() {

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        cpf_cnpj: '',
        is_active: false,  
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    async function VendinhaApi(event) {
        event.preventDefault(); 

        
        if (!formData.name || !formData.email || !formData.password || !formData.cpf_cnpj) {
            alert("Por favor, preencha todos os campos!");
            return;
        }

        
        const updatedFormData = {
            ...formData,
            is_active: true  
        };

        try {
            const response = await fetch("http://localhost:8000/api/users", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(updatedFormData),
            });

            const data = await response.json();
            if (response.ok) {
                alert("Cadastro realizado com sucesso!");
                console.log(data);
            } else {
                alert("Erro ao cadastrar.");
                console.error(data);
            }
        } catch (error) {
            alert("Erro na conexão com a API.");
            console.error(error);
        }
    }

    return (
        <div id="formulario">
            <form className='forms' onSubmit={VendinhaApi}>
                <h2>Cadastre-se</h2>

                <label htmlFor="name">Nome</label>
                <input 
                    type="text" 
                    name="name" 
                    id="name" 
                    value={formData.name} 
                    onChange={handleChange}
                /><br></br>

                <label htmlFor="email">Email</label><br></br>
                <input 
                    type="email" 
                    name="email" 
                    id="email" 
                    value={formData.email} 
                    onChange={handleChange}
                />

                <label htmlFor="cpf_cnpj"> <br/> CPF / CNPJ</label>
                <input 
                    type="text" 
                    name="cpf_cnpj" 
                    id="cpf_cnpj" 
                    value={formData.cpf_cnpj} 
                    onChange={handleChange}
                />

                <label htmlFor="senha">Senha</label>
                <input 
                    type="password" 
                    name="password" 
                    id="senha" 
                    value={formData.password} 
                    onChange={handleChange}
                />

                <button type="submit">Cadastre-se</button>
            </form>
        </div>
    );
}

export default CadastroUser;
