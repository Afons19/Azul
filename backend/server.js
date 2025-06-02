// Banco de dados simulado (posteriormente pode ser substituído por um banco real)
const db = {
    usuarios: [],
    funcionarios: [],
    fornecedores: [],
    produtos: [],
    categorias: [],
    vendas: []
};

// Login
function iniciarSessao(event) {
    event.preventDefault();
    const email = document.getElementById('ilogin').value;
    const senha = document.getElementById('isenha').value;

    if (email && senha) {
        // Aqui você pode adicionar a lógica de autenticação
        console.log('Tentativa de login:', { email, senha });
        window.location.href = 'index.html';
    } else {
        alert('Por favor, preencha todos os campos!');
    }
}

// Funcionários
function cadastrarFuncionario(event) {
    event.preventDefault();
    const funcionario = {
        nome: document.getElementById('funcionario-nome').value,
        bi: document.getElementById('funcionario-bi').value,
        foto: document.getElementById('funcionario-foto').files[0],
        dataNascimento: document.getElementById('funcionario-data').value,
        telefone: document.getElementById('funcionario-telefone').value,
        endereco: document.getElementById('funcionario-endereco').value,
        email: document.getElementById('funcionario-email').value,
        dataCadastro: new Date().toISOString()
    };

    console.log('Novo funcionário:', funcionario);
    db.funcionarios.push(funcionario);
    alert('Funcionário cadastrado com sucesso!');
    event.target.reset();
}

// Fornecedores
function cadastrarFornecedor(event) {
    event.preventDefault();
    const fornecedor = {
        nome: document.getElementById('fornecedor-nome').value,
        nif: document.getElementById('fornecedor-nif').value,
        foto: document.getElementById('imagem').files[0],
        telefone: document.getElementById('fornecedor-telefone').value,
        endereco: document.getElementById('fornecedor-endereco').value,
        estabelecimento: document.getElementById('fornecedor-estabelecimento').value,
        email: document.getElementById('fornecedor-email').value,
        dataCadastro: new Date().toISOString()
    };

    console.log('Novo fornecedor:', fornecedor);
    db.fornecedores.push(fornecedor);
    alert('Fornecedor cadastrado com sucesso!');
    event.target.reset();
}

// Produtos
function cadastrarProduto(event) {
    event.preventDefault();
    const produto = {
        nome: document.getElementById('pnome').value,
        categoria: document.getElementById('pcategoria').value,
        fornecedor: document.getElementById('pfornecedor').value,
        preco: parseFloat(document.getElementById('ppreco').value),
        precoAquisicao: parseFloat(document.getElementById('pvalorAd').value),
        dataEntrega: document.getElementById('pdata_entrega').value,
        quantidade: parseInt(document.getElementById('pquantidade').value),
        dataCadastro: new Date().toISOString()
    };

    console.log('Novo produto:', produto);
    db.produtos.push(produto);
    alert('Produto cadastrado com sucesso!');
    event.target.reset();
}

// Categorias
function cadastrarCategoria(event) {
    event.preventDefault();
    const categoria = {
        nome: document.getElementById('nome').value,
        descricao: document.getElementById('descricao').value,
        codigo: 'CAT' + (db.categorias.length + 1).toString().padStart(3, '0'),
        dataCadastro: new Date().toISOString()
    };

    console.log('Nova categoria:', categoria);
    db.categorias.push(categoria);
    atualizarTabelaCategorias();
    alert('Categoria cadastrada com sucesso!');
    event.target.reset();
}

function excluirCategoria(codigo) {
    const index = db.categorias.findIndex(cat => cat.codigo === codigo);
    if (index !== -1) {
        db.categorias.splice(index, 1);
        atualizarTabelaCategorias();
    }
}

function editarCategoria(codigo) {
    const categoria = db.categorias.find(cat => cat.codigo === codigo);
    if (categoria) {
        document.getElementById('nome').value = categoria.nome;
        document.getElementById('descricao').value = categoria.descricao;
        // Mudar o botão para modo de edição
        const form = document.getElementById('formCategoria');
        form.dataset.editando = codigo;
    }
}

// Vendas
function registrarVenda(event) {
    event.preventDefault();
    const venda = {
        produto: document.getElementById('produto').value,
        quantidade: parseInt(document.getElementById('quantidade').value),
        valorUnitario: parseFloat(document.getElementById('valor').value),
        data: document.getElementById('data').value,
        formaPagamento: document.getElementById('formaPagamento').value,
        valorTotal: parseFloat(document.getElementById('quantidade').value) * parseFloat(document.getElementById('valor').value),
        dataRegistro: new Date().toISOString()
    };

    console.log('Nova venda:', venda);
    db.vendas.push(venda);
    atualizarTabelaVendas();
    alert('Venda registrada com sucesso!');
    event.target.reset();
}

// Funções auxiliares para atualizar as tabelas
function atualizarTabelaCategorias() {
    const tbody = document.querySelector('#tabelaCategorias tbody');
    if (!tbody) return;

    tbody.innerHTML = db.categorias.map(cat => `
        <tr>
            <td>${cat.codigo}</td>
            <td>${cat.nome}</td>
            <td>${cat.descricao}</td>
            <td>0</td>
            <td class="actions">
                <button class="btn-icon" onclick="editarCategoria('${cat.codigo}')" title="Editar">
                    <i class="fas fa-edit"></i>
                </button>
                <button class="btn-icon" onclick="excluirCategoria('${cat.codigo}')" title="Excluir">
                    <i class="fas fa-trash"></i>
                </button>
            </td>
        </tr>
    `).join('');
}

function atualizarTabelaVendas() {
    const tbody = document.querySelector('#tabelaVendas');
    if (!tbody) return;

    tbody.innerHTML = db.vendas.map(venda => `
        <tr>
            <td>${venda.produto}</td>
            <td>-</td>
            <td>${venda.quantidade}</td>
            <td>${new Date(venda.data).toLocaleDateString('pt-BR')}</td>
            <td>${venda.valorUnitario.toLocaleString('pt-BR', { style: 'currency', currency: 'AOA' })}</td>
            <td>${venda.valorTotal.toLocaleString('pt-BR', { style: 'currency', currency: 'AOA' })}</td>
            <td>${venda.formaPagamento}</td>
        </tr>
    `).join('');
}

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
    // Login
    const formLogin = document.querySelector('form[action="#"]');
    if (formLogin) formLogin.addEventListener('submit', iniciarSessao);

    // Funcionários
    const formFuncionario = document.getElementById('cadastrado-funcionario');
    if (formFuncionario) formFuncionario.addEventListener('submit', cadastrarFuncionario);

    // Fornecedores
    const formFornecedor = document.getElementById('cadastrado-fornecedor');
    if (formFornecedor) formFornecedor.addEventListener('submit', cadastrarFornecedor);

    // Produtos
    const formProduto = document.getElementById('cadastro-produto');
    if (formProduto) formProduto.addEventListener('submit', cadastrarProduto);

    // Categorias
    const formCategoria = document.getElementById('formCategoria');
    if (formCategoria) {
        formCategoria.addEventListener('submit', cadastrarCategoria);
        atualizarTabelaCategorias();
    }

    // Vendas
    const formVenda = document.getElementById('formVenda');
    if (formVenda) {
        formVenda.addEventListener('submit', registrarVenda);
        atualizarTabelaVendas();
    }
});

