import { Pedido } from "./pedido";

describe("Pedido", () => {
  let pedido;

  beforeEach(() => {
    pedido = new Pedido();
  });

  it("deve adicionar um item corretamente", () => {
    pedido.adicionarItem("cafe,2");
    expect(pedido.itens).toEqual(["cafe,2"]);
  });

  it("deve validar o código do item corretamente", () => {
    const codigoValido = "cafe";
    const codigoInvalido = "pizza";

    expect(pedido.validarCodigoItem(codigoValido)).toBe(true);
    expect(pedido.validarCodigoItem(codigoInvalido)).toBe(false);
  });

  it("deve validar o pedido com sucesso", () => {
    pedido.adicionarItem("cafe,1");
    pedido.adicionarItem("sanduiche,2");
    expect(pedido.validarPedido()).toBe(true);
  });

  it("deve verificar que item extra não pode ser pedido sem o principal", () => {
    pedido.adicionarItem("chantily,1");
    expect(pedido.validarPedido()).toBe(
      "Item extra não pode ser pedido sem o principal"
    );
  });

  it("deve verificar que não há itens no carrinho de compra", () => {
    expect(pedido.validarPedido()).toBe("Não há itens no carrinho de compra!");
  });

  it("deve verificar quantidade inválida", () => {
    pedido.adicionarItem("cafe,0");
    expect(pedido.validarPedido()).toBe("Quantidade inválida!");
  });
});
