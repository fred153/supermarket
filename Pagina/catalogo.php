<?php
$host = 'localhost';
$dbname = 'Supermercado';
$user = 'postgres';
$password = '1234';

try {
    $dsn = "pgsql:host=$host;dbname=$dbname";
    $pdo = new PDO($dsn, $user, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // Consulta SQL para obtener los datos de la base de datos
    $query = "SELECT * FROM producto";
    $stmt = $pdo->query($query);
    $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
} catch (PDOException $e) {
    echo "Error de conexión: " . $e->getMessage();
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="styles/normalize.css">
    <link rel="stylesheet" href="styles/index.css">
    <script defer src="js/slider.js"></script>
    <title>Document</title>
</head>
<body>
    <header class="header">
        <a href="index.html" alt="logo de la compania" class="logo.img">
            <h2 class ="logo-nombre"> Nombre compañia</h2>
            </a>
            <nav>
                <a href="index.html" class="nav-link"> Inicio</a>
                <a href="catalogo.html" class="nav-link"> Catologo</a>
                <a href="contacto.html" class="nav-link"> Contacto</a>
            </nav>
        <nav class="navigation-general"></nav>
    </header>
    <main class="main-container">
        <section class="primary-section">
            <article class="slider-container" id="slider-left">
            </article>
            <article class="contact-container" id="">
                <div class="buscar">
                    <input type="text" placeholder="Buscar" required>
                    <div class="btn">
                    </div>
                </div>
                <table class="tabla-datos">
                    <thead>
                        <tr>
                            <th>Productos</th>
                            <th>Marca</th>
                            <th>Precio</th>
                            <th>Tipo</th>
                            <th>Cantidad</th>
                        </tr>
                    </thead>
                    <tbody>
                        <?php foreach ($result as $row): ?>
                            <tr>
                                <td><?php echo $row['producto'] ?? ''; ?></td>
                                <td><?php echo $row['marca']  ?? ''; ?></td>
                                <td><?php echo $row['precio']  ?? ''; ?></td>
                                <td><?php echo $row['tipo']  ?? ''; ?></td>
                                <td><?php echo $row['cantidad']  ?? ''; ?></td>
                            </tr>
                        <?php endforeach; ?>
                    </tbody>
                </table>
            </article>
            <article class="slider-container" id="slider-right">
            </article>
        </section>
    </main>
</body>
</html>