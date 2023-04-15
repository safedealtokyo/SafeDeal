export function formatFormData(formData: FormData): string {
  return Object.entries(formData)
    .map(([key, value]) => `【${key}】\n${value}\n`)
    .join("\n")
    .replace(/^\n+|\n+$/g, "")
    .replace(/\n\n+/g, "\n\n");
}
