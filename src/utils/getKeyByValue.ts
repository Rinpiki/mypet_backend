export function getKeyByValue(
  obj: Record<string, any>,
  value: string
): string | null {
  // Itera sobre as chaves do objeto
  for (const key in obj) {
    if (obj[key] === value) {
      return key; // Retorna a chave correspondente ao valor
    }
  }
  return null; // Retorna null se o valor não for encontrado
}
