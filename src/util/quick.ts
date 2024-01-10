export function modifyUrl(newURL: string): void {
  window.history.pushState("Syrenity", "", newURL);
}

export function disable(element: HTMLElement | null): void {
  if (element) (element as any).disabled = true;
}

export function enable(element: HTMLElement | null): void {
  if (element) (element as any).disabled = false;
}

export function getUrl(): string {
  const url = new URL(window.location.href);
  return `${url.protocol}//${url.host}`;
}

const urlRegex = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/g
export function extractUrls(contents: string): string[] {
  const matches = contents.match(urlRegex);
  return matches || [];
}

export function extractImageUrls(contents: string): string[] {
  const urls = extractUrls(contents);
  const images: string[] = [];

  for (const i in urls) {
    const url = new URL(urls[i]);
    if (url.pathname.match(/(\.(png|jpe?g|gif|webm|webp))$/))
      images.push(urls[i]);
  }

  return images;
}

/**
 * 
 * @copyright https://stackoverflow.com/a/19303725/20022509
 * @param {number} seed The seed
 * @returns {number} The result
 */
export function seededRandom(seed: number): number {
  let x = Math.sin(seed++) * 10000;
  return x - Math.floor(x);
}