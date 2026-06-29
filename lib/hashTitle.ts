export function hashTitle(title: string): number {
  let hash = 5381;

  for (let index = 0; index < title.length; index += 1) {
    hash = (hash * 33) ^ title.charCodeAt(index);
  }

  return hash >>> 0;
}
