<?php
$conn = new mysqli("localhost", "root", "", "azul_db");

if ($conn->connect_error) {
    die("Erro de conexão: " . $conn->connect_error);
}

$nome = $_POST['nome'];
$bi = $_POST['bi'];
$data = $_POST['data_nascimento'];
$telefone = $_POST['telefone'];
$endereco = $_POST['endereco'];
$email = $_POST['email'];

$stmt = $conn->prepare("INSERT INTO funcionarios (nome, bi, data_nascimento, telefone, endereco, email) VALUES (?, ?, ?, ?, ?, ?)");
$stmt->bind_param("ssssss", $nome, $bi, $data, $telefone, $endereco, $email);

if ($stmt->execute()) {
    echo "Funcionário cadastrado com sucesso!<br>";
    echo '<a href="../funcionarios.php">Voltar</a> | <a href="lista-funcionarios.php">Ver lista</a>';
} else {
    echo "Erro ao cadastrar: " . $stmt->error;
}

$stmt->close();
$conn->close();
?>
