const express = require('express');
const passport = require("passport");
const ensureAuthenticated = require('../config/ensureAuthenticated');

const router = express.Router();

/* GET products page. */
router.get('/', ensureAuthenticated, function (req, res, next) {
    res.render('products', {
        title: 'Produtos :: Softek - SGI',
        css: [
            '/plugins/bootstrap-switch/bootstrap-switch.min.css',
            '/css/pages/products.css'
        ],
        script: [
            '/plugins/bootstrap-switch/bootstrap-switch.min.js',
            '/js/app/utilities.js',
            '/js/pages/products.js'
        ]
    });
});

/* GET product page. */
router.get('/:id/:orderBy/:orderDir', function (req, res, next) {
    var productId = req.params.id,
        orderBy = req.params.orderBy,
        orderDir = req.params.orderDir;

    if (orderBy == "referencia") {
        orderBy = "p.referência";
    }

    var sqlInst = "select p.codigo, p.nome, p.cod_barras, p.estoque, p.tipo, p.preco, p.desc_compl, p.estoquereservado, p.precoatacado, p.descrevenda, " +
        "cast(dbo.isnegative(cast(isnull(preco - (select descontoporquant from dbo.parametros_produto as pp where (codproduto = p.codigo)) * dbo.fc_divisao_por_zero(preco) / 100, 0) as decimal(18, 6)), 0) as decimal(18, 6)) as precoatacado, " +
        "isnull((select sum(er.reservado) from dbo.estoquereservado er where (er.codproduto = p.codigo)), 0) as estoquereservado, p.promocaoativo, p.foto, " +
        "(select top (1) nome from unidade where codigo = p.unidade) as nomeunidade, p.referência as referencia, p.promocaoqtderestante, " +
        "(select top 1 codigo from Produto where " + orderBy + " " + (orderDir == "asc" ? "<" : ">") + " p." + orderBy + " order by " + orderBy + (orderDir == "desc" ? "" : " desc") + ") as anterior, " +
        "(select top 1 codigo from Produto where " + orderBy + " " + (orderDir == "asc" ? ">" : "<") + " p." + orderBy + " order by " + orderBy + (orderDir == "desc" ? " desc" : "") + ") as proximo " +
        "from view_produto p where codigo = " + productId;

    db.querySql(sqlInst,
        function (data, err) {
            if (err) {
                res.writeHead(500, "Internal Server Error", {
                    "Content-Type": "text/html"
                });
                res.write(err.toString());

                res.end();
            } else {
                res.render('product', {
                    title: 'Produto',
                    css: [
                        '/css/pages/products.css'
                    ],
                    script: [
                        '/plugins/JsBarcode/JsBarcode.all.min.js',
                        '/js/pages/product.js'
                    ],
                    product: data[0]
                });
            }
        });
});

module.exports = router;