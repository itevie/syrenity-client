interface Coordinate {
  x: number;
  y: number;
}

function getFor (element: HTMLElement): Coordinate {
  // I don't know what any of this does, I stole it from somewhere
  const box = element.getBoundingClientRect();

  const body = document.body;
  const docEl = document.documentElement;

  const scrollTop = window.pageYOffset || docEl.scrollTop || body.scrollTop;
  const scrollLeft = window.pageXOffset || docEl.scrollLeft || body.scrollLeft;

  const clientTop = docEl.clientTop || body.clientTop || 0;
  const clientLeft = docEl.clientLeft || body.clientLeft || 0;

  const top  = box.top +  scrollTop - clientTop;
  const left = box.left + scrollLeft - clientLeft;

  return { y: Math.round(top), x: Math.round(left) };
}

/**
 * Bounds a coordinate to the window width & height meaning it will not be able to overflow
 * @param x Coordinate X
 * @param y Coordinate Y
 * @param element The element to bound
 * @returns The bounded coordinate
 */
function bound(coordinate: Coordinate, element: DOMRect): Coordinate {
  const padding = 20;
  // Check if they go out of bounds

  // OOB right
  if (window.innerWidth - coordinate.x - element.width - padding < 0)
    coordinate.x = window.innerWidth - element.width - padding;

  // OOB bottom
  if (window.innerHeight - coordinate.y - element.height - padding < 0)
    coordinate.y = window.innerHeight - element.height - padding;

  return coordinate;
}

/**
 * Checks if given X Y coordinates are inside an element
 * @param x The X coordinate
 * @param y The Y coordinate
 * @param element The element to check
 * @returns True or false whether the element contains the coordinates
 */
function isIn (x: number, y: number, element: HTMLElement): boolean {
  const rect = element.getBoundingClientRect();

  return (
    x > rect.x &&
    y > rect.y &&
    x < rect.x + element.offsetWidth &&
    y < rect.y + element.offsetHeight
  );
}

function getCoords(elem: HTMLElement) {
  var box = elem.getBoundingClientRect();

  var body = document.body;
  var docEl = document.documentElement;

  var scrollTop = window.pageYOffset || docEl.scrollTop || body.scrollTop;
  var scrollLeft = window.pageXOffset || docEl.scrollLeft || body.scrollLeft;

  var clientTop = docEl.clientTop || body.clientTop || 0;
  var clientLeft = docEl.clientLeft || body.clientLeft || 0;

  var top  = box.top +  scrollTop - clientTop;
  var left = box.left + scrollLeft - clientLeft;

  return { top: Math.round(top), left: Math.round(left) };
}

export {getFor, bound, isIn, getCoords};