export function formatFormData(formData: FormData): string {
  return Object.entries(formData)
    .map(([key, value]) => `【${key}】\n${value}\n`)
    .join("\n")
    .replace(/^\n+|\n+$/g, "")
    .replace(/\n\n+/g, "\n\n");
}

export function parseFormData(text: string): FormData {
  const lines = text.trim().split("\n");
  const formData: FormData = {} as FormData;
  let currentKey: keyof FormData | null = null;
  let currentValue = "";
  // eslint-disable-next-line no-restricted-syntax
  for (const line of lines) {
    if (line.startsWith("【") && line.endsWith("】")) {
      if (currentKey !== null) {
        formData[currentKey] = currentValue.trim() as any;
        currentValue = "";
      }
      currentKey = line.substring(1, line.length - 1) as keyof FormData;
    } else {
      currentValue += `${line}\n`;
    }
  }
  if (currentKey !== null) {
    formData[currentKey] = currentValue.trim() as any;
  }
  return formData;
}
