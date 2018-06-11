var db = require("../core/db");
var util = require("util");
var _ = require("lodash");

exports.getSales = function (req, res, orderBy, orderDir, pageIndex, pageSize, sgiId, searchFor) {
    try {
        switch (orderBy) {
            case "nomecliente":
                orderBy = "(select nome from cliente c where c.codigo = d.codcliente)";
                break;
            case "fantasiacliente":
                orderBy = "(select fantasia from cliente c where c.codigo = d.codcliente)";
                break;
            case "Vendedor":
                orderBy = "(select nome from funcionario c where c.codigo = d.codcliente)";
                break;
            default:
                break;
        }

        // if (searchFor.indexOf("nomecliente", StringComparison.Ordinal) > 0) {
        //     searchFor = searchFor.replace("nomecliente", "(select nome from cliente c where c.codigo = d.codcliente)");
        // }

        var sqlInst = "select top(" + pageSize + ") * from (select rowid = row_number() over (order by " + orderBy + " " + orderDir + "), d.* " +
            ", nomecliente = (select nome from cliente c where c.codigo = d.codcliente) " +
            ", fantasiaCliente = (select fantasia from cliente c where c.codigo = d.codcliente) " +
            ", vendedor = (select nome from funcionario c where c.codigo = d.codcliente) " +
            ", totalrows = count(*) over() " +
            " from dav_cab d " +
            " left outer join fisica f on f.pessoa = " + sgiId +
            " where 1 = 1 " +
            " and (isnull(d.cod_funcionario, 0) = 0 or ((select top 1 1 from usuario where adm = 1 and funcionario = " + sgiId + ") = 1 or " +
            " (f.supervisor = 1 and f.coddepartamento = (select top 1 coddepartamento from fisica where pessoa = d.cod_funcionario))) " +
            " or isnull(d.cod_funcionario, 0) = " + sgiId + ") " + searchFor +
            " ) a where a.rowid > ((" + pageIndex + " - 1) * " + pageSize + ") ";
        sqlInst += " select count(*) as recordstotal from dav_cab d left outer join fisica f on f.pessoa = " + sgiId + " where 1 = 1 and ";
        sqlInst += " (isnull(d.cod_funcionario, 0) = 0 or ((select top 1 1 from usuario where adm = 1 and funcionario = " + sgiId + ") = 1 or ";
        sqlInst += " (f.supervisor = 1 and f.coddepartamento = (select top 1 coddepartamento from fisica where pessoa = d.cod_funcionario))) ";
        sqlInst += " or d.cod_funcionario = " + sgiId + ") " + searchFor + " ";

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
    } catch (ex) {
        res.send(ex);
    }
};

exports.getSaleItems = function (req, res, id) {
    try {
        var sqlInst = "select di.*, p.nome, p.estoque from dav_itens di left outer join produto p on p.codigo = di.codproduto where di.numdav = " + id

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

                    // data[0].telfones = data[1];
                    // var result = '{ "data": ' + data + '}';

                    res.write(JSON.stringify(data).replace(/"([\w]+)":/g, function ($0, $1) {
                        return ('"' + $1.toLowerCase() + '":');
                    }));

                    res.end();
                }
            });
    } catch (ex) {
        res.send(ex);
    }
};

exports.getSale = function (req, res, saleId, sgiId) {
    try {
        var sqlInst = "select d.*, c.nome as nomecliente, c.fantasia as fantasiacliente, c.ativo, v.nome as vendedor, " +
            "o.cartao as operadora, e.fantasia as empresa, e.cnpj, cp.nome as condPagto, cp.acrescimo, c.email, c.cpf_cnpj, " +
            // "o.cartao as operadora, e.fantasia as empresa, e.cnpj, cp.nome + (case when isnull(cp.acrescimo, 0) > 0 then ' (' + cast(cp.acrescimo as varchar) + '%)' end)  as condPagto, c.email, c.cpf_cnpj, " +
            "e.cep as enderecoempresa, c.cep as enderecocliente, " +
            "(select top 1 telefone from telefone where pessoa = c.codigo and padrao = 1) as telefonecliente, " +
            "(select top 1 dbo.asstring(v.tipo_logradouro) + ': ' + dbo.asstring(v.logradouro) + ', nº' + dbo.asstring(e.num) + ' - bairro: ' + dbo.asstring(v.bairro) + ' - ' + dbo.asstring(v.cidade) from view_endereco_completo v) as enderecoempresa, " +
            "dbo.fc_endereco(c.codigo, c.tipo) as enderecocliente, e.fone as telefoneempresa, " +
            "e.e_mail as emailEmpresa from dav_cab d cross join empresa e " +
            "left outer join cliente c on d.codcliente = c.codigo " +
            "left outer join funcionario v on v.codigo = d.codvendedor " +
            "left outer join CondicaoPagto cp on cp.codigo = d.codCondPagto " +
            "left outer join operadora o on o.codigo = d.CodOperadora " +
            "left outer join fisica f on f.pessoa = " + sgiId +
            " where d.numdav = " + saleId +
            " and (isnull(d.cod_funcionario, 0) = 0 or ((select top 1 1 from Usuario where adm = 1 and funcionario = " + sgiId + ") = 1 or " +
            "(f.supervisor = 1 and f.coddepartamento = (select top 1 coddepartamento from fisica where pessoa = d.cod_funcionario))) " +
            "or d.cod_funcionario = " + sgiId + ")";

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

                    // data[0].telfones = data[1];
                    // var result = '{ "data": ' + data + '}';

                    res.write(JSON.stringify(data).replace(/"([\w]+)":/g, function ($0, $1) {
                        return ('"' + $1.toLowerCase() + '":');
                    }));

                    res.end();
                }
            });
    } catch (ex) {
        res.send(ex);
    }
};

exports.addSale = function (req, res, reqBody) {
    try {
        if (!reqBody) throw new Error("Input not valid");
        var sale = reqBody;
        if (sale) {
            var sqlInst = "";
            sqlInst += "declare @codigo int insert into dav_cab (codCliente, codVendedor, valorTotal, dataVenda, [status], codCondPagto, valorDinheiro, " +
                "valorCartao, valorCrediario, convenio, descontoValor, descontoPerc, observacao, codOperadora, cod_funcionario, cheque, " +
                "orcamento, pedido, condicional ";
            sqlInst += util.format(") values(%d, %d, %d, getdate(), null, %d, %d, %d, %d, '%s', %d, %d, '%s', " +
                "%d, %d, '%s', '%s', '%s', '%s') set @codigo = scope_identity(); ",
                sale.codCliente, sale.codVendedor, sale.valorTotal, sale.codCondPagto, sale.valorDinheiro, sale.valorCartao,
                sale.valorCrediario, sale.convenio, sale.descontoValor, sale.descontoPerc, sale.observacao, sale.codOperadora,
                sale.cod_Funcionario, sale.cheque, sale.orcamento, sale.pedido, sale.condicional);

            if (sale.saleItems.length) {
                _.forEach(sale.saleItems, function (item) {
                    sqlInst += "insert into dav_itens (numdav, codProduto, quantidade, valorUnitario, descontoPerc, valorTotal) ";
                    sqlInst += util.format("values(@codigo, %d, %d, %d, %d, %d); ",
                        item.codProduto, item.quantidade, item.valorUnitario, item.descontoPerc,
                        (parseFloat(item.quantidade) * item.valorUnitario) * (1 - item.descontoPerc / 100));
                });
            }

            sqlInst += "update dav_cab set [status] = 1 where numdav = @codigo; ";

            if (sale.pedido) {
                sqlInst += "exec spExportaDavEmPedido @codigo; ";
            }

            sqlInst += "select numdav, sequenciadav, numdoc from dav_cab where numdav = @codigo ";

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

                        res.write(JSON.stringify(data[1]).replace(/"([\w]+)":/g, function ($0, $1) {
                            return ('"' + $1.toLowerCase() + '":');
                        }));

                        res.end();
                    }
                }, true);
        }
    } catch (ex) {
        res.send(ex);
    }
};

exports.updateSale = function (req, res, reqBody) {
    try {
        if (!reqBody) throw new Error("Input not valid");
        var client = reqBody;
        if (client) {
            var sqlInst = "update pessoas set nome = '" + client.nome + "', fantasia = '" + client.fantasia + "'";
            sqlInst += ", natureza = '" + client.natureza + "', numero = '" + client.numero + "', complemento = '" + client.complemento + "'";
            sqlInst += ", email = '" + client.email + "', ativo = '" + client.ativo + "', cpf_cnpj = '" + client.cpf_Cnpj + "'";
            sqlInst += ", rg_insc_est = '" + client.rg_Insc_Est + "', insc_municipal = '" + client.insc_Municipal + "'";
            sqlInst += ", observacao = '" + client.observacao + "'";

            if (client.classe) sqlInst += ", classe = " + client.classe;
            if (client.codCep) sqlInst += ", cep = " + client.codCep;
            if (client.regiao) sqlInst += ", regiao = " + client.regiao;
            if (client.nascimento) sqlInst += ", nascimento = " + client.nascimento;

            sqlInst += " where codigo = " + client.codigo;
            sqlInst += " update fisica set sexo = '" + client.sexo + "', nacionalidade = '" + client.nacionalidade + "'";
            sqlInst += ", estado_civil = '" + client.estado_Civil + "', local_Trabalho = '" + client.local_Trabalho + "'";
            sqlInst += ", numero_Trabalho = '" + client.numero_Trabalho + "', complemento_trabalho = '" + client.complemento_Trabalho + "'";
            sqlInst += ", filiacao = '" + client.filiacao + "'";

            if (client.naturalidade) sqlInst += ", naturalidade = " + client.naturalidade;
            if (client.codCepTrabalho) sqlInst += ", cep_trabalho = " + client.codCepTrabalho;
            if (client.profissao) sqlInst += ", profissao = " + client.profissao;

            sqlInst += " where pessoa = " + client.codigo;

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
                        res.write('{ "result": "success" }');

                        res.end();
                    }
                });
        }
    } catch (ex) {
        res.send(ex);
    }
};

exports.removeSale = function (req, res, id) {
    try {
        var sqlInst = "delete from pessoas where codigo = " + id;

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
                    res.write('{ "result": "success" }');

                    res.end();
                }
            });
    } catch (ex) {
        res.send(ex);
    }
};