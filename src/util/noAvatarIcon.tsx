import { seededRandom } from "./quick";

const colors = [
  "#ED4245", "#22943a", "#E0A800", "#5865F2", "#FFB6C1"
];

export default function setNoAvatarIcon(userId: number, element: HTMLImageElement) {
  element.style.backgroundColor = colors[Math.floor(seededRandom(userId) * colors.length)];
  element.src = "/images/logos/no_shape_logo.png";
  return colors[Math.floor(seededRandom(userId) * colors.length)];
}