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
    <title>Lista de Funcionários</title>
    <link rel="stylesheet" href="../paginas/stylePaginas.css">
</head>
<body>
    <h2 style="margin-top: 50px;">Funcionários Cadastrados</h2>

    <table border="1" cellpadding="5" cellspacing="0">
        <thead>
            <tr>
                <th>ID</th>
                <th>Nome Completo</th>
                <th>BI</th>
                <th>Data Nascimento</th>
                <th>Telefone</th>
                <th>Endereço</th>
                <th>Email</th>
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

    <br>
    <a href="../funcionarios.php">← Voltar ao cadastro</a>
</body>
</html>

<?php
$conn->close();
?>
