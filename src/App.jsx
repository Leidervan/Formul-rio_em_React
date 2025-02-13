import { useState } from "react";
import './App.css';

export default function FormularioADS() {
  const [formData, setFormData] = useState({
    fullName: "",
    dateOfBirth: "",
    cpf: "",
    landline: "",
    cellPhone: "",
    isMinor: false,
    fatherName: "",
    motherName: "",
    zipCode: "",
    address: "",
    number: "",
    addOn: "",
    city: "",
    state: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  const handleChange = (e) => {
    const { id, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: type === "checkbox" ? checked : value,
      isMinor: id === "dateOfBirth" ? new Date().getFullYear() - new Date(value).getFullYear() < 18 : prev.isMinor
    }));
  };

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const validateCPF = (cpf) => /\d{11}/.test(cpf);
  const validatePhone = (phone) => /\d{10,11}/.test(phone);
  const validateCEP = (cep) => /\d{8}/.test(cep);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateEmail(formData.email)) return alert("E-mail inválido!");
    if (!validateCPF(formData.cpf)) return alert("CPF inválido!");
    if (!validatePhone(formData.landline)) return alert("Telefone fixo inválido!");
    if (!validatePhone(formData.cellPhone)) return alert("Celular inválido!");
    if (formData.password !== formData.confirmPassword) return alert("Senhas não coincidem!");
    if (formData.isMinor && !validateCEP(formData.zipCode)) return alert("CEP inválido!");

    console.log("Dados do Formulário:", formData);
    alert("Formulário enviado com sucesso!");
  };

  return (
    <div className="container">
      <h1>FORMULÁRIO ACADÊMICO ADS</h1>
      <form onSubmit={handleSubmit}>
        <section>
          <h2>Informações Pessoais</h2>
          <div className="form-group">
            <label htmlFor="fullName">Nome Completo:</label>
            <input type="text" id="fullName" value={formData.fullName} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label htmlFor="dateOfBirth">Data de Nascimento:</label>
            <input type="date" id="dateOfBirth" value={formData.dateOfBirth} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label htmlFor="cpf">CPF:</label>
            <input type="text" id="cpf" value={formData.cpf} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label htmlFor="landline">Telefone Fixo:</label>
            <input type="text" id="landline" value={formData.landline} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label htmlFor="cellPhone">Número de Celular:</label>
            <input type="text" id="cellPhone" value={formData.cellPhone} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label htmlFor="isMinor">Menor de 18 anos?</label>
            <input type="checkbox" id="isMinor" checked={formData.isMinor} onChange={handleChange} disabled />
          </div>
        </section>

        {formData.isMinor && (
          <section>
            <h2>Informações Adicionais (Para Menores de 18)</h2>
            <div className="form-group">
              <label htmlFor="fatherName">Nome do Pai:</label>
              <input type="text" id="fatherName" value={formData.fatherName} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label htmlFor="motherName">Nome da Mãe:</label>
              <input type="text" id="motherName" value={formData.motherName} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label htmlFor="zipCode">CEP:</label>
              <input type="text" id="zipCode" value={formData.zipCode} onChange={handleChange} required />
            </div>
            <div className="form-group">
            <label htmlFor="address">Endereço:</label>
            <input type="text" id="address" value={formData.address} onChange={handleChange} required />
            </div>
            <div className="form-group">
            <label htmlFor="number">Número:</label>
            <input type="text" id="number" value={formData.number} onChange={handleChange} required />
            </div>
            <div className="form-group">
            <label htmlFor="addOn">Complemento:</label>
            <input type="text" id="addOn" value={formData.addOn} onChange={handleChange} />
            </div>
            <div className="form-group">
            <label htmlFor="city">Cidade:</label>
            <input type="text" id="city" value={formData.city} onChange={handleChange} required />
            </div>
            <div className="form-group">
            <label htmlFor="state">Estado:</label>
            <input type="text" id="state" value={formData.state} onChange={handleChange} required />
            </div>
          </section>
        )}

        <section>
          <h2>Informações da Conta</h2>
          <div className="form-group">
            <label htmlFor="email">E-mail:</label>
            <input type="email" id="email" value={formData.email} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label htmlFor="password">Senha:</label>
            <input type="password" id="password" value={formData.password} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label htmlFor="confirmPassword">Confirmação de Senha:</label>
            <input type="password" id="confirmPassword" value={formData.confirmPassword} onChange={handleChange} required />
          </div>
        </section>

        <button type="submit" className="submit-button">Finalizar</button>
      </form>
    </div>
  );
}
