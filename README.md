# 📈 Projeto de Otimização de Lucro – Solver Alternativo

Este é um projeto escolar desenvolvido com o objetivo de **maximizar o lucro com base em dados de uma planilha**, simulando o comportamento de ferramentas como o **Solver do Excel**, mas com uma implementação própria utilizando **Spring Boot** no backend e **React** no frontend, usando o **Vite** para build e execução.

## 🛠️ Tecnologias Utilizadas

### Backend
- **Spring Boot**
- Java 17+
- Biblioteca de otimização (OR-Tools)
- Leitura de planilhas (Apache POI)

### Frontend
- **React**
- Bootstrap

## 📂 Funcionalidades

- 📥 Upload de planilha.
- ⚙️ Processamento dos dados no backend e execução do algoritmo de otimização.
- 📊 Exibição do resultado otimizado.
- 🧮 Respeito às restrições informadas no modelo.

## 📌 Como Usar

### 1. Clonar o repositório
```bash
git clone https://github.com/DanielCarvalhoFilho/Project-Solver
```
### 2. Backend – Spring Boot
```bash
./mvnw spring-boot:run
```
A API será iniciada em: http://localhost:8080

### 3. Frontend – React (com Vite)
```bash
npm install
npm run dev
```
O frontend será iniciado em: http://localhost:5173

📎 Estrutura da Planilha
A planilha deve seguir o modelo disponibilizado.

👨‍🎓 Sobre o Projeto
Projeto desenvolvido como parte de um trabalho escolar nas áreas de:
- Otimização matemática
- Engenharia de software
- Aplicações em produção e negócios
