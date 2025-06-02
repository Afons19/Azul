<?php
$conn = new mysqli("localhost", "root", "", "azul_db");

if ($conn->connect_error) {
    die("Erro na conexão: " . $conn->connect_error);
}

$result = $conn->query("SELECT * FROM funcionarios");

if (!$result) {
    die("Erro na consulta: " . $conn->error);
}
?>

<!DOCTYPE html>
<html lang="pt">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="paginas/stylePaginas.css">
    <title>Cadastro de Funcionários</title>
</head>
<body>
    <header>
        <h1>Cadastro de Funcionários</h1>
        <menu>
            <nav aria-label="breadcrumb" id="breadcrumb">
                <ul>
                    <li><a href="index.html">Dashboard </a></li>
                    <li><a href="funcionarios.php">Cadastro de Funcionários</a></li>
                </ul>
            </nav>
        </menu>
    </header>
    <main>
        <article class="form-container">
            <h2 style="margin-top: 120px;">Novo <div>Funcionário</div></h2>
            <form action="php/salvar-funcionario.php" method="post" enctype="multipart/form-data" autocomplete="on">
                <label for="nome">Nome Completo:</label>
                <input type="text" name="nome" id="nome" autocomplete="name" required>

                <label for="bi">BI:</label>
                <input type="text" name="bi" id="bi" autocomplete="off" required>

                <label for="foto">Fotográfia do Funcionário:</label>
                <input type="file" name="foto" accept="image/*" id="foto" autocomplete="off" required>

                <label for="data_nascimento">Data de Nascimento:</label>
                <input type="date" name="data_nascimento" id="data_nascimento" autocomplete="off">

                <label for="telefone">Número de Telefone:</label>
                <input type="tel" name="telefone" id="telefone" autocomplete="tel" placeholder="923-456-234" maxlength="9" required>

                <label for="endereco">Endereço:</label>
                <input type="text" name="endereco" id="endereco" autocomplete="street-address" placeholder="Gabela, Kwanza-Sul" required>

                <label for="email">E-mail:</label>
                <input type="email" name="email" id="email" autocomplete="email" placeholder="exemplo@gmail.com" required>                

                <!-- <button type="submit">Cadastrar Funcionário</button>      -->
                <input type="submit" value="cadastrar">      
            </form>
        </article>
        
        <article class="table-container">
            <div class="table-header">
                <h2>Funcionários Cadastrados</h2>
                <div class="search-container">
                    <input type="search" id="pesquisar" placeholder="Pesquisar funcionários..." class="search-input">
                </div>
            </div>
            
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nome Completo</th>
                        <th>BI</th>
                        <th>Data Nascimento</th>
                        <th>Telefone</th>
                        <th>Endereço</th>
                        <th>E-mail</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    <?php while($row = $result->fetch_assoc()): ?>
                    <tr>
                        <td><?= $row['id'] ?></td>
                        <td><?= $row['nome'] ?></td>
                        <td><?= $row['bi'] ?></td>
                        <td><?= $row['data_nascimento'] ?></td>
                        <td><?= $row['telefone'] ?></td>
                        <td><?= $row['endereco'] ?></td>
                        <td><?= $row['email'] ?></td>
                    </tr>
                    <?php endwhile; ?>
                </tbody>
            </table>
        </article>
    </main>
    <a href="php/listar-funcionario.php"></a>
</body>
</html>

<?php
$conn->close();
?>