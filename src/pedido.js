import { cardapio } from "./cardapioDB.js";

class Pedido {
  constructor() {
    this.itensDoPedido = [];
    this.cardapio = cardapio;
  }

  adicionarItem(item) {
    this.itensDoPedido.push(item);
  }

  validarCodigoItem(codigo) {
    return this.cardapio.some((item) => item.codigo === codigo);
  }

  validarPedido() {
    let temQueijo = false;
    let temChantily = false;
    let temSanduiche = false;
    let temCafe = false;

    for (const item of this.itensDoPedido) {
      const [codigo, quantidade] = item.split(",");

      if (!this.validarCodigoItem(codigo)) {
        return "Item inválido!";
      }

      if (parseInt(quantidade) === 0) {
        return "Quantidade inválida!";
      }

      if (codigo === "queijo") temQueijo = true;
      if (codigo === "chantily") temChantily = true;
      if (codigo === "sanduiche") temSanduiche = true;
      if (codigo === "cafe") temCafe = true;
    }

    if ((temQueijo && !temSanduiche) || (temChantily && !temCafe)) {
      return "Item extra não pode ser pedido sem o principal";
    }

    if (this.itensDoPedido.length === 0) {
      return "Não há itens no carrinho de compra!";
    }

    return true;
  }
}

export { Pedido };
