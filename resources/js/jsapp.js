
function createPagination(pages, page) {

    var style    = '';
    var dataList = '\
        <li class="page-item">\
          <a data-link-pag-first aria-label="Previous" class="page-link">\
            <span aria-hidden="true">&laquo;</span>\
          </a>\
        </li>';

    $('#ul_pagination').html(dataList);

    // Monta a lista de paginacao
    for(var n = 0; n < pages; n++) {
        
        if(page > 0 && (page-1) == n || page == 0 && page == n) {
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
        requester(0);
    });

    // Ativa o botao para todos os eventos de paginacao
    $('[data-link-pag]').on("click", function(e){
        e.preventDefault();
        requester($(this).text());
    });

    // Ativa o evento do botao que serve para acessar o ultimo indice da lista de paginacao
    $('[data-link-pag-last]').on("click", function(e){
        e.preventDefault();
        requester(pages);
    });

}

function createTable(params) {
    
    $('#tbody-data').html('');

    $(params).each(function(key, value) {
        
        var dataTable = "\
            <tr>\
                <td>"+value.id+"</td>\
                <td>"+value.descricao+"</td>\
                <td>"+value.valor+"</td>\
                <td>"+value.qtde+"</td>\
            </tr>";

        $(dataTable).appendTo('#tbody-data');

    });

}

function messeger(msg) {
    $('#ul_pagination').html("<p class='text-center' style='width: 100%;'>"+msg+"</p>");
}

function requester(page) {

    $.ajax({
        
        type: "GET",
        url: "http://localhost/testes/pagination/resources/app/response.php",
        data: "pagina="+page,
        dataType: "json"

    }).done(function(datadone){

        if(parseInt(datadone.num) > 0) {
            
            // Lista de Itens encontrados no base de dados    
            createTable(datadone.produto);

            // Paginacao dos itens encontrados na base de dados
            createPagination(datadone.paginas, page);

        } else {
            
            messeger("Nenhum registro encontrado !");

        }

    }).fail(function(datafail){

        console.error(datafail);

    });

}

window.onload = function() {
    messeger("Carregando...");
    requester(0);
}
