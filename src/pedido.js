import { cardapio } from "./cardapioDB";

class Pedido {
  constructor() {
    this.itens = [];
    this.cardapio = cardapio;
  }

  adicionarItem(item) {
    this.itens.push(item);
  }

  validarCodigoItem(codigo) {
    return this.cardapio.some((item) => item.codigo === codigo);
  }

  validarPedido() {
    const quantidadePorItem = {};
    let temQueijo = false;
    let temChantily = false;
    let temSanduiche = false;
    let temCafe = false;
    let mensagemErro = "";

    this.itens.forEach((item) => {
      const [codigo, quantidade] = item.split(",");

      if (!this.validarCodigoItem(codigo)) {
        mensagemErro = "Item inválido!";
        return;
      }

      if (codigo === "queijo") temQueijo = true;
      if (codigo === "chantily") temChantily = true;
      if (codigo === "sanduiche") temSanduiche = true;
      if (codigo === "cafe") temCafe = true;

      if (!quantidadePorItem[codigo]) {
        quantidadePorItem[codigo] = 0;
      }

      quantidadePorItem[codigo] += parseInt(quantidade);

      if (parseInt(quantidade) === 0) {
        mensagemErro = "Quantidade inválida!";
      }
    });

    if (mensagemErro) {
      return mensagemErro;
    }

    if ((temQueijo && !temSanduiche) || (temChantily && !temCafe)) {
      return "Item extra não pode ser pedido sem o principal";
    }

    if (this.itens.length === 0) {
      return "Não há itens no carrinho de compra!";
    }

    return true;
  }
}

export { Pedido };
