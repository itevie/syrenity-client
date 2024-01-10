function convertStringToInitals(text: string) {
  let words = text.split(" ");
  let result = "";

  for (let i in words) {
    result += words[i][0];
  }

  return result;
}

/**
 * Converts an avatar to an intial avatar
 * @copyright Stolen from https://github.com/musebe/Avatars-JavaScript
 * @param {string} text The text to get the initials of
 * @param {string} foregroundColor The foreground color
 * @param {string} backgroundColor The background color 
 * @returns 
 */
export default function generateAvatar(
  text: string,
  foregroundColor = "white",
  backgroundColor = "#00000000"
) {
  text = convertStringToInitals(text);
  
  // Check length
  if (text.length > 2) {
    text = text.substring(0, 2);
  }

  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d") as CanvasRenderingContext2D;

  canvas.width = 200;
  canvas.height = 200;

  // Draw background
  context.fillStyle = backgroundColor;
  context.fillRect(0, 0, canvas.width, canvas.height);

  // Draw text
  context.font = "bold 100px Arial";
  context.fillStyle = foregroundColor;
  context.textAlign = "center";
  context.textBaseline = "middle";
  context.fillText(text, canvas.width / 2, canvas.height / 2 );
  return canvas.toDataURL("image/png");
}