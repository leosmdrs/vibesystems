import type { CompId } from "./remotion/registry";

export type Modulo = {
  id: string;
  scene: CompId;
  nome: string;
  cor: string;
  numero: string;
  titulo: string;
  descricao: string;
  recursos: string[];
  dores: string[];
};

export const DORES = [
  {
    dor: "“Compro no achismo: ou falta, ou encalha.”",
    solucao: "Sugestão de compra pelo giro de vendas e pelo estoque máximo, somando a rede inteira.",
    cor: "var(--compras)",
  },
  {
    dor: "“Cotação é planilha e WhatsApp.”",
    solucao: "Fornecedores respondem num portal e o custo final já sai comparável, com frete e impostos.",
    cor: "var(--compras)",
  },
  {
    dor: "“O caixa nunca bate.”",
    solucao: "Fechamento às cegas: o operador conta antes de ver o esperado. Diferença exige justificativa.",
    cor: "var(--pdv)",
  },
  {
    dor: "“Está no sistema, mas não na prateleira.”",
    solucao: "Endereçamento, contagem por bipe e um painel que aponta onde contar primeiro.",
    cor: "var(--estoque)",
  },
  {
    dor: "“Uma filial sobra, a outra falta.”",
    solucao: "Transferência por cota justa, que considera a rede inteira e os blocos de venda.",
    cor: "var(--estoque)",
  },
  {
    dor: "“A taxa do cartão some no líquido.”",
    solucao: "Conciliação por operadora e CNPJ, com a taxa lançada como despesa visível.",
    cor: "var(--financeiro)",
  },
  {
    dor: "“Fechar o ponto vira um caos todo mês.”",
    solucao: "Fechamento guiado em 6 etapas e CSV pronto no layout do seu contador.",
    cor: "var(--rh)",
  },
  {
    dor: "“O preço da gôndola não é o do caixa.”",
    solucao: "Toda mudança de preço entra sozinha na fila de etiquetas da loja.",
    cor: "var(--estoque)",
  },
];

export const MODULOS: Modulo[] = [
  {
    id: "compras",
    scene: "Compras",
    nome: "Compras",
    cor: "var(--compras)",
    numero: "01",
    titulo: "Compre o que vende, pelo melhor custo real.",
    descricao:
      "Do cálculo da necessidade ao título no contas a pagar, num fluxo só. Seus fornecedores respondem num portal, o sistema normaliza o custo final e você escolhe o vencedor item a item.",
    recursos: [
      "Sugestão de compra automática em 3 modos: até o estoque máximo, pelo giro de vendas ou giro limitado ao máximo. Soma todas as filiais e o que já está em trânsito.",
      "Cotação multi-fornecedor em matriz item × fornecedor, com histórico de custos e gráfico de movimento de cada produto.",
      "Custo final realmente comparável: desconto, IPI, ST, CBS/IBS e frete rateado proporcionalmente entre os itens.",
      "Portal do Representante com proposta fechada: ninguém vê o preço do concorrente. O convite sai por e-mail automaticamente.",
      "Pedidos gerados sozinhos em lotes por fornecedor, a partir dos vencedores de cada item.",
      "Conferência de recebimento com avaria, corte, faltante e excedente, tudo valorizado em reais.",
      "Precificação pós-compra por canal (varejo, atacado, oficina…): mantenha o preço ou o markup, com markup mínimo e arredondamento.",
      "Duplicatas nascem amarradas ao pedido. Devolução ao fornecedor com “encontrar origem” da compra.",
    ],
    dores: ["Ruptura e estoque parado", "Cotações perdidas no WhatsApp", "Divergências de entrega que somem"],
  },
  {
    id: "pdv",
    scene: "Pdv",
    nome: "PDV",
    cor: "var(--pdv)",
    numero: "02",
    titulo: "Um balcão que vende rápido e não erra.",
    descricao:
      "Busca que entende o vendedor, estoque da rede ao vivo e fiscal integrado. O caixa fecha certo, a comissão vai para quem atendeu e o cliente sai com a nota na mão.",
    recursos: [
      "Busca por qualquer código (interno, fabricante, fornecedor, EAN) e tolerante a erro de digitação: “kit amort siena” já encontra.",
      "Estoque da loja e das outras filiais lado a lado. Venda do estoque de outra loja com retirada, transferência ou entrega.",
      "Aviso ao vivo quando outra filial ou vendedor leva a última unidade enquanto o cliente está no balcão.",
      "Pagamentos combinados na mesma venda: dinheiro, débito, crédito, parcelado, Pix, boleto com limite de crédito, cheque e vale.",
      "NFC-e e NF-e direto do pedido, com cancelamento, carta de correção, inutilização e guarda automática dos XMLs.",
      "Fechamento de caixa às cegas, sangria, suprimento e justificativa obrigatória quando há diferença.",
      "Cupom de atendimento: o caixa bipa o código e a comissão vai para quem realmente atendeu.",
      "Devoluções e garantias com destino de estoque item a item, vale-crédito, cashback e integração com e-commerce.",
    ],
    dores: ["Filas e busca lenta", "Caixa com diferença “misteriosa”", "Venda sem comissão justa"],
  },
  {
    id: "estoque",
    scene: "Estoque",
    nome: "Estoque",
    cor: "var(--estoque)",
    numero: "03",
    titulo: "Estoque em que você confia, em todas as filiais.",
    descricao:
      "Cada movimento fica registrado e nada é apagado. O sistema diz onde a peça está guardada, quanto transferir e por onde começar a contar.",
    recursos: [
      "Multi-filial com locais por filial (operacional, em trânsito, correção e avariados). Só o operacional conta como disponível para venda.",
      "Saldo derivado de um livro de movimentações que não aceita edição nem exclusão, com reconciliação automática toda noite.",
      "Endereçamento livre em cada filial (A-03-07, 2.4.B16…) e vários endereços por item.",
      "Inventário cego sem fechar a loja: o sistema congela o saldo e desconta o que foi vendido durante a contagem.",
      "Contagem por bipe com a câmera do celular ou leitor, na ordem do corredor, com aprovação do gerente.",
      "Painel “onde contar”: um índice de risco por evidência aponta as 100 peças mais suspeitas, cada uma com o motivo.",
      "Transferência por cota justa: considera a rede inteira, respeita blocos de venda e o que já está a caminho.",
      "Fila automática de etiquetas a cada mudança de preço, resolução de avariados com foto e trilha de auditoria completa.",
    ],
    dores: ["Furo de estoque", "Inventário que fecha a loja", "Filial sobrando, filial faltando"],
  },
  {
    id: "financeiro",
    scene: "Financeiro",
    nome: "Financeiro",
    cor: "var(--financeiro)",
    numero: "04",
    titulo: "Cada centavo da rede, visível e conciliado.",
    descricao:
      "Contas a pagar e a receber, extratos, fluxo de caixa e conciliação de cartões num painel só, cobrindo todas as filiais e CNPJs do grupo.",
    recursos: [
      "Contas a pagar e a receber por parcela: pagamento parcial, em lote e com comprovante anexado.",
      "Financeiro centralizado da rede, com filtro por filial. Cada título sabe de onde veio.",
      "Saldos sempre calculados a partir dos lançamentos. Nada muda de lugar sem deixar rastro.",
      "Fluxo de caixa com duas curvas: conservadora (o que está agendado) e projetiva (recorrências dos últimos 3 meses).",
      "Conciliação de cartões por dia, operadora e CNPJ. A taxa vira despesa própria e para de se esconder no líquido.",
      "Maquininhas com taxas por bandeira e modalidade, e uma mesma máquina atendendo mais de uma loja.",
      "Conferência diária de caixa por operador e trava rígida de limite de crédito no boleto.",
      "Comissões por faixa e meta com simulação ao vivo. Dinheiro nunca é apagado, só estornado.",
    ],
    dores: ["Taxas de cartão invisíveis", "Boleto acima do crédito", "Fluxo de caixa no escuro"],
  },
  {
    id: "rh",
    scene: "Rh",
    nome: "RH",
    cor: "var(--rh)",
    numero: "05",
    titulo: "Ponto, folha e desempenho sem planilha e sem passivo.",
    descricao:
      "Do ponto no celular ao arquivo pronto para o contador, com as regras da CLT aplicadas pelo sistema e cada registro protegido contra alteração.",
    recursos: [
      "Ponto no celular com foto, GPS e cerca da filial, sempre no horário do servidor. Modo quiosque para máquina compartilhada.",
      "Batidas imutáveis: correções entram como ajustes auditados, em linha com a Portaria 671/2021.",
      "Tolerâncias, horas extras de 50% e 100% e intervalo suprimido calculados automaticamente.",
      "Escalas de domingo e feriado com troca entre colegas, aceite e aprovação do gestor.",
      "Fechamento mensal guiado em 6 etapas, com folha congelada por hash e assinatura do colaborador.",
      "Banco de horas dentro da CLT e exportação CSV no layout aprovado pelo seu contador.",
      "Pré-folha integrada: horas extras, DSR, INSS, prêmio, comissão e adiantamentos viram títulos no financeiro.",
      "Premiação por produtividade com projeção ao vivo, recrutamento com prova online e trilhas de treinamento por função.",
    ],
    dores: ["Risco trabalhista", "Fechamento de mês caótico", "Variáveis em planilhas soltas"],
  },
];

export const ETAPAS = [
  {
    t: "Diagnóstico do gargalo",
    d: "A gente entra na sua operação, acompanha o balcão, o estoque e o financeiro e mapeia onde você perde tempo e dinheiro.",
  },
  {
    t: "Implantação pela maior dor",
    d: "Começamos pelo módulo que mais dói. Os outros entram no ritmo da sua equipe, sem parar a loja.",
  },
  {
    t: "Treinamento por função",
    d: "Trilhas para caixa, vendedor, estoquista e gerente. Cada um aprende só o que usa no dia a dia.",
  },
  {
    t: "Evolução contínua",
    d: "Sua operação muda e o sistema acompanha. Regra nova, filial nova, gargalo novo: a gente ajusta.",
  },
];

export const GARANTIAS = [
  {
    t: "Regras que protegem o dono",
    d: "Ninguém aprova a própria ocorrência, margem abaixo do mínimo só com senha de gerente, e dinheiro nunca é apagado, só estornado.",
  },
  {
    t: "Multi-filial e multi-CNPJ de verdade",
    d: "Estoque, caixa, financeiro e equipe de todas as lojas num só lugar, sem relatórios para juntar no fim do mês.",
  },
  {
    t: "Auditoria de ponta a ponta",
    d: "Quem fez, o quê, quando e em qual filial. Cada tela tem permissão própria e cada movimento deixa rastro.",
  },
];

export const FAQ = [
  {
    q: "Preciso trocar tudo de uma vez?",
    a: "Não. A implantação é por módulo, começando pela dor mais urgente. Os módulos se conectam conforme entram.",
  },
  {
    q: "Funciona para o meu segmento de varejo?",
    a: "Os fundamentos (compras, PDV, estoque multi-filial, financeiro e RH) valem para qualquer varejo. O que é específico do seu negócio, a gente desenvolve.",
  },
  {
    q: "E a parte fiscal?",
    a: "NFC-e e NF-e são emitidas direto do pedido, com cancelamento, carta de correção, inutilização e arquivamento automático dos XMLs.",
  },
  {
    q: "Meu problema não está nesta página. E agora?",
    a: "É exatamente para isso que a gente existe. Conte o gargalo: se ele trava sua operação, a gente constrói a solução.",
  },
];
