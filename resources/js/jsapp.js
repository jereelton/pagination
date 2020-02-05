
function getData(index) {

    $.ajax({
        type: "GET",
        url: "http://localhost/testes/pagination/config.php",
        data: "pagina="+index,
        dataType: "json"
    }).done(function(result){

        /*console.log("itens_por_pagina", result.itens_por_pagina);
        console.log("produto", result.produto);
        console.log("num", result.num);
        console.log("produtos", result.produtos);
        console.log("total", result.total);
        console.log("paginas", result.paginas);*/

        if(parseInt(result.num) > 0) {
            
            $('#tbody-data').html('');
            
            // Monta a lista de produtos/itens na tabela alvo
            $(result.produto).each(function(key, value) {
                
                //console.log("produto", "[", key, "]", "=>", value.id, value.descricao, value.valor, value.qtde);
                
                var dataTable = "\
                    <tr>\
                        <td>"+value.id+"</td>\
                        <td>"+value.descricao+"</td>\
                        <td>"+value.valor+"</td>\
                        <td>"+value.qtde+"</td>\
                    </tr>";

                $(dataTable).appendTo('#tbody-data');
            });

            // Para controlar o item ativo da paginacao
            var style    = '';
            var dataList = '\
                <li class="page-item">\
                  <a data-link-pag-first aria-label="Previous" class="page-link">\
                    <span aria-hidden="true">&laquo;</span>\
                  </a>\
                </li>';

            $('#ul_pagination').html(dataList);

            // Monta a lista de paginacao
            for(var n = 0; n < result.paginas; n++) {
                
                if(index > 0 && (index-1) == n || index == 0 && index == n) {
                    style = ' class="page-item active"';
                } else {
                    style = ' class="page-item"';
                }

                var dataList = "\
                    <li"+style+">\
                        <a data-link-pag class='page-link'>"+(n+1)+"</a>\
                    </li>";

                $(dataList).appendTo('#ul_pagination');

            }

            dataList = '\
                <li class="page-item">\
                  <a data-link-pag-last aria-label="Next" class="page-link">\
                    <span aria-hidden="true">&raquo;</span>\
                  </a>\
                </li>';

            $(dataList).appendTo('#ul_pagination');

            // Ativa o evento do botao que serve para acessar o primeiro indice da lista de paginacao
            $('[data-link-pag-first]').on("click", function(e){
                e.preventDefault();
                getData(0);
            });

            // Ativa o botao para todos os eventos de paginacao
            $('[data-link-pag]').on("click", function(e){
                e.preventDefault();
                getData($(this).text());
            });

            // Ativa o evento do botao que serve para acessar o ultimo indice da lista de paginacao
            $('[data-link-pag-last]').on("click", function(e){
                e.preventDefault();
                getData(result.paginas);
            });
        }

    }).fail(function(result){

        console.error(result);

    });

}

window.onload = function() {
    getData(0);
}
