import { ItemCardapio } from "./itemCardapio";
import { Pedido } from "./pedido";

class CaixaDaLanchonete {
  constructor() {
    this.cardapio = [
      new ItemCardapio("cafe", "Café", 3.0),
      new ItemCardapio("chantily", "Chantily (extra do Café)", 1.5),
      new ItemCardapio("suco", "Suco Natural", 6.2),
      new ItemCardapio("sanduiche", "Sanduíche", 6.5),
      new ItemCardapio("queijo", "Queijo (extra do Sanduíche)", 2.0),
      new ItemCardapio("salgado", "Salgado", 7.25),
      new ItemCardapio("combo1", "1 Suco e 1 Sanduíche", 9.5),
      new ItemCardapio("combo2", "1 Café e 1 Sanduíche", 7.5),
    ];
  }

  validarCodigoItem(codigo) {
    return this.cardapio.some((item) => item.codigo === codigo);
  }

  validarFormaDePagamento(formaDePagamento) {
    const formasValidas = ["debito", "credito", "dinheiro"];
    if (!formasValidas.includes(formaDePagamento)) {
      return "Forma de pagamento inválida!";
    }
    return true;
  }

  calcularValorDaCompra(formaDePagamento, itens) {
    const validacaoFormaPagamento =
      this.validarFormaDePagamento(formaDePagamento);

    if (validacaoFormaPagamento !== true) {
      return validacaoFormaPagamento;
    }

    const pedido = new Pedido();

    itens.forEach((item) => pedido.adicionarItem(item));

    const validacaoItens = pedido.validarPedido(this);

    if (validacaoItens !== true) {
      return validacaoItens;
    }

    let valorTotal = 0;

    pedido.itens.forEach((item) => {
      const [codigo, quantidade] = item.split(",");
      const itemCardapio = this.cardapio.find(
        (itemCardapio) => itemCardapio.codigo === codigo
      );

      if (itemCardapio) {
        valorTotal += itemCardapio.valor * parseInt(quantidade);
      }
    });

    if (formaDePagamento === "dinheiro") {
      valorTotal *= 0.95;
    } else if (formaDePagamento === "credito") {
      valorTotal *= 1.03;
    }
    return `R$ ${valorTotal.toFixed(2).replace(".", ",")}`;
  }
}

export { CaixaDaLanchonete };
