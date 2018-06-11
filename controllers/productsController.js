var db = require("../core/db");

exports.getProducts = function (req, res, orderBy, orderDir, pageIndex, pageSize, searchFor) {

    switch (orderBy) {
        case 'referencia':
            orderBy = "(select top (1) referencia from produtofornecedor where (produto = p.codigo) and (principal = 1))";
            break;
        case 'nomeunidade':
            orderBy = "(select top (1) nome from unidade where codigo = p.unidade)";
            break;
        case 'precoatacado':
            orderBy = "cast(dbo.isnegative(cast(isnull([preco] - (select top (1) descontoporquant from dbo.parametros_produto as pp " +
                "where (codproduto = p.codigo)) * dbo.fc_divisao_por_zero(preco) / 100, 0) as decimal(18, 6)), 0) as decimal(18, 6))";
            break;
        case 'estoquereservado':
            orderBy = "isnull((select top (1) sum(er.reservado) from dbo.estoquereservado er where (er.codproduto = p.codigo)), 0)";
            break;
        case 'estoquetotal':
            orderBy = "(p.estoque - isnull((select top (1) sum(er.reservado) from dbo.estoquereservado er where (er.codproduto = p.codigo)), 0))";
            break;
        default:
            break;
    };

    var sqlInst = "select top (" + pageSize + ") * from (select rowid = row_number() over (order by " + orderBy + " " + orderDir + "), " +
        "p.codigo, p.nome, p.cod_barras, p.estoque, p.tipo, p.preco, p.unidadedivisora, p.descrevenda, p.precoatacado, " + // , p.estoquereservado, " +
        "p.referência as referencia, p.promocaoAtivo, p.promocaoQtdeRestante " + //, totalrows = count(*) over() " +
        "from view_produto p where p.ativo = 1 and ('" + preco + "' = '' or preco = > 0) " + searchFor +
        ") a where a.rowid > ((" + pageIndex + " - 1) * " + pageSize + ")";
    sqlInst += "select count(*) as recordstotal from produto p where p.ativo = 1 " + searchFor;

    db.querySql(sqlInst,
        function (data, err) {
            if (err) {
                res.writeHead(500, "Internal Server Error", {
                    "Content-Type": "text/html"
                });
                res.write(err.toString());

                res.end();
            } else {
                res.writeHead(200, {
                    "Content-Type": "application/json"
                });

                var result = {
                    "recordsTotal": data[1][0].recordstotal,
                    "data": data[0]
                };

                res.write(JSON.stringify(result).replace(/"([\w]+)":/g, function ($0, $1) {
                    return ('"' + $1.toLowerCase() + '":');
                }));

                res.end();
            }
        }, true);
};

exports.getProduct = function (req, res, id, orderBy, orderDir) {

    if (orderBy == "referencia") {
        orderBy = "p.referência";
    }

    var sqlInst = "select p.codigo, p.nome, p.cod_barras, p.estoque, p.tipo, p.preco, p.desc_compl, p.estoquereservado, p.precoatacado, p.descrevenda, 0 as descontoporquant, p.custo_final, p.desconto, p.promocaoativo, p.precodesconto, " +
        "cast(dbo.isnegative(cast(isnull(preco - (select descontoporquant from dbo.parametros_produto as pp where (codproduto = p.codigo)) * dbo.fc_divisao_por_zero(preco) / 100, 0) as decimal(18, 6)), 0) as decimal(18, 6)) as precoatacado, " +
        "isnull((select sum(er.reservado) from dbo.estoquereservado er where (er.codproduto = p.codigo)), 0) as estoquereservado, p.promocaoativo, " +
        "(select top (1) nome from unidade where codigo = p.unidade) as nomeunidade, p.referência as referencia, p.promocaoqtderestante, " +
        "(select top 1 codigo from Produto where " + orderBy + " " + (orderDir == "asc" ? "<" : ">") + " p." + orderBy + " order by " + orderBy + (orderDir == "desc" ? "" : " desc") + ") as anterior, " +
        "(select top 1 codigo from Produto where " + orderBy + " " + (orderDir == "asc" ? ">" : "<") + " p." + orderBy + " order by " + orderBy + (orderDir == "desc" ? " desc" : "") + ") as proximo " +
        "from view_produto p where codigo = " + id;

    db.querySql(sqlInst,
        function (data, err) {
            if (err) {
                res.writeHead(500, "Internal Server Error", {
                    "Content-Type": "text/html"
                });
                res.write(err.toString());

                res.end();
            } else {
                res.writeHead(200, {
                    "Content-Type": "application/json"
                });
                res.write(JSON.stringify(data));

                res.end();
            }
        });
};