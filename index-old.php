<?php 

//require_once("config.php");
$num = 30;
$produto = [
	'id' => '1',
	'descricao' => 'Teste',
	'valor' => 'R$ 45,00',
	'qtde' => '1'
];
$pagina = 1;
$paginas = 7;

?>

<!DOCTYPE html>
<html lang="pt-br">
<head>
<meta charset="utf-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta name="viewport" content="width=device-width, initial-scale=1">

<title>Pagination Template</title>

<link href="bootstrap/css/bootstrap.min.css" rel="stylesheet" />

</head>
<body>

<div class="container-fluid">
	<div class="row">
		<div class="col-lg-12">
			<h1 class="">Produtos</h1>

			<?php if($num > 0) { ?>

			<table class="table table-striped table-hover bg-light">
				<thead class="bg-dark text-light">
					<tr>
						<td>ID</td>
						<td>DESCRIÇÃO</td>
						<td>VALOR</td>
						<td>QTDE</td>
					</tr>
				</thead>
				<tbody>
					<?php foreach ($produto as $key => $value) { ?>
					<tr>
						<td><?php echo $produto[$key]['id']; ?></td>
						<td><?php echo $produto[$key]['descricao']; ?></td>
						<td><?php echo $produto[$key]['valor']; ?></td>
						<td><?php echo $produto[$key]['qtde']; ?></td>
					</tr>
					<?php } ?>
				</tbody>
			</table>

			<nav aria-label="Page navigation">
			  <ul class="pagination justify-content-center" style="margin:20px 0">
			    <li class="page-item">
			      <a href="?pagina=0" aria-label="Previous" class="page-link">
			        <span aria-hidden="true">&laquo;</span>
			      </a>
			    </li>
				
			<?php
				
				for($i = 0; $i < $paginas; $i++) {

					if($pagina == $i) {
						$estilo = "class=\"page-item active\"";
					} else {
						$estilo = "class=\"page-item\"";
					}

				?>

			    <li <?php echo $estilo; ?> ><a data-link-pag href="?pagina=<?php echo $i; ?>" class="page-link"><?php echo $i+1; ?></a></li>
				
				<?php } ?>

			    <li class="page-item">
			      <a class="page-link" href="?pagina=<?php echo $paginas-1; ?>" aria-label="Next">
			        <span aria-hidden="true">&raquo;</span>
			      </a>
			    </li>
			  </ul>
			</nav>

    		<?php } ?>
    	</div>
    </div>
</div>

<script src="vendor/jquery/jquery.js"></script>
<script src="bootstrap/js/bootstrap.min.js"></script>

<script type="text/javascript">
window.onload = function() {
	$('[data-link-pag]').on("click", function(e){
		
		e.preventDefault();
		
		console.log("teste", $(this).text());

		$.ajax({
	        type: "GET",
	        url: "http://localhost/testes/pagination/config.php?pagina=" + $(this).text(),
	        data: $(this).text(),
	        dataType: "json"
		}).done(function(result){
			console.log(result);
		}).fail(function(result){
			console.error(result);
		});

	});
}
</script>
</body>
</html> 


