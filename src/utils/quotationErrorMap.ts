interface ErrorMap {
  [key: string]: string;
}

export function QuotationErrorMap(error?: string): string {
  const errorMap: ErrorMap = {
    "MinLimitExceded": "O valor mínimo para compra é de $ 1000,00",
  };

  return errorMap[error as string] || "Erro ao comprar criptomoeda";
} 