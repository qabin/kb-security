export function string_escape (input) {
  return input.replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
}
