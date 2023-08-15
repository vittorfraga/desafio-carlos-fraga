import { cardapio } from "./cardapioDB";
import { Pedido } from "./pedido";

class CaixaDaLanchonete {
  constructor() {
    this.cardapio = cardapio;
  }

  validarFormaDePagamento(formaDePagamento) {
    const formasValidas = ["debito", "credito", "dinheiro"];
    if (!formasValidas.includes(formaDePagamento)) {
      return "Forma de pagamento inválida!";
    }
    return true;
  }

  calcularJuros(valorTotal, formaDePagamento) {
    if (formaDePagamento === "dinheiro") {
      return valorTotal * 0.95;
    } else if (formaDePagamento === "credito") {
      return valorTotal * 1.03;
    }
    return valorTotal;
  }

  calcularValorDaCompra(formaDePagamento, itens) {
    const validacaoFormaPagamento =
      this.validarFormaDePagamento(formaDePagamento);

    if (validacaoFormaPagamento !== true) {
      return validacaoFormaPagamento;
    }

    const pedido = new Pedido();

    itens.forEach((item) => pedido.adicionarItem(item));

    const validacaoItens = pedido.validarPedido(this.cardapio);

    if (validacaoItens !== true) {
      return validacaoItens;
    }

    let valorDoPedido = 0;

    pedido.itens.forEach((item) => {
      const [codigo, quantidade] = item.split(",");
      const itemCardapio = this.cardapio.find(
        (itemCardapio) => itemCardapio.codigo === codigo
      );

      if (itemCardapio) {
        valorDoPedido += parseFloat(itemCardapio.valor) * parseInt(quantidade);
      }
    });

    const valorFinal = this.calcularJuros(valorDoPedido, formaDePagamento);

    return `R$ ${valorFinal.toFixed(2).replace(".", ",")}`;
  }
}

export { CaixaDaLanchonete };
