
# 🛒 Sistema de Gestão de Supermercado

Este projeto é um sistema de gestão para supermercados desenvolvido com **HTML, CSS e JavaScript puro**, integrado com o **Supabase** para autenticação e operações de CRUD em tempo real. Foi construído para rodar diretamente no navegador, com estrutura simples e organizada, sem necessidade de frameworks ou bundlers (como React ou Vite).

---

## 📌 Funcionalidades

### 🔐 Autenticação
- Registro e login de usuários com Supabase Auth
- Redirecionamento baseado no tipo de usuário (`admin` ou não)
- Sessão persistente com `sessionStorage`
- Logout e proteção de páginas privadas

### 🧑‍💼 Módulos Gerenciais
- **Funcionários**: cadastro, listagem, pesquisa e CRUD
- **Fornecedores**: cadastro, listagem, pesquisa e CRUD
- **Produtos**: cadastro com ligação a categorias e fornecedores, pesquisa e CRUD
- **Categorias**: cadastro, exibição, contagem dinâmica de produtos, e CRUD
- **Vendas**: registro de vendas com ligação a produtos, cálculo de totais, autor e CRUD

### 📊 Dashboard (index.html)
- Totais atualizados em tempo real: vendas, lucro, despesas, produtos
- Gráficos com Chart.js:
  - Vendas por categoria
  - Produtos por categoria
- Tabela de histórico de vendas, funcionários e fornecedores
- Atividades recentes

### 🧠 Recursos inteligentes
- Preenchimento automático do valor unitário ao digitar o nome do produto
- Filtro de relatórios por data e categoria
- Exportação de relatórios para Excel e PDF

### 🚀 Deploy e Segurança
- Deploy via **GitHub Pages**
- Chaves Supabase protegidas com `env.js`, ignoradas no Git
- CORS configurado no Supabase para aceitar `localhost` e GitHub Pages
- Row-Level Security (RLS) ativado nas tabelas para segurança de dados

---

## 🗂️ Estrutura do Projeto

```
/
├── index.html
├── login.html
├── registro.html
├── categorias.html
├── funcionarios.html
├── fornecedores.html
├── produtos.html
├── registrar-vendas.html
├── style.css
├── stylePaginas.css
├── env.js               ← contém as chaves Supabase (ignorado pelo Git)
├── assets/js/
│   ├── supabase.js
│   ├── login.js
│   ├── dashboard.js
│   ├── categorias.js
│   ├── funcionarios.js
│   ├── fornecedores.js
│   ├── produtos.js
│   ├── vendas.js
│   ├── relatorios.js
│   └── exportar.js
└── .gitignore           ← inclui env.js para manter as chaves privadas
```

---

## ✅ Tecnologias Utilizadas
- HTML5, CSS3, JavaScript ES6
- [Supabase](https://supabase.com/)
- [jsPDF](https://github.com/parallax/jsPDF) + autoTable
- [SheetJS (xlsx)](https://sheetjs.com/)
- [Chart.js](https://www.chartjs.org/)

---

## 🚧 Requisitos para executar localmente

1. Clone o repositório:
   ```bash
   git clone https://github.com/Afons19/Azul.git
   ```
2. Crie um arquivo `env.js` na raiz:
   ```js
   export const SUPABASE_URL = "https://xxxxx.supabase.co";
   export const SUPABASE_ANON_KEY = "chave-publica-anon";
   ```
3. Rode com VSCode Live Server ou qualquer servidor local:
   ```
   http://127.0.0.1:5500
   ```

---

## 📦 Deploy com GitHub Pages

- Ativado em `Settings > Pages > main / (docs)`
- URLs adicionadas no painel do Supabase (Auth → Redirect URLs)
- Acesse o projeto online via:
  ```
  https://afons19.github.io/Azul/
  ```

---

## ✍️ Autor
**Afonso Aurélio**

Este projeto foi construído com foco em aprendizado e boas práticas de estrutura modular, segurança com Supabase e publicação aberta com GitHub Pages. 

---
