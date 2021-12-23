const path = require('path');
const { createCanvas, loadImage, registerFont } = require('canvas');

registerFont(path.join(__dirname, 'assets', 'coco-regular.ttf'), {
  family: 'Coco Gothic',
});
registerFont(path.join(__dirname, 'assets', 'coco-bold.ttf'), {
  family: 'Coco Gothic',
  weight: 'bold',
});

const DEFAULT_BACKGROUND = path.join(__dirname, 'assets', 'background.png');
const CARD_WIDTH = 1440;
const CARD_HEIGHT = 760;
const PADDING_Y = 126;
const PADDING_X = 80;

/**
 * cherry picked from ✨
 * and modified to curry with context because I love currying to free my mind.
 * https://codepen.io/peterhry/pen/AGIEa
 */
const wrapTextFactory = (context) => (text, x, y, maxWidth, lineHeight) => {
  var words = text.split(' '),
    line = '',
    lineCount = 0,
    i,
    test,
    metrics;

  for (i = 0; i < words.length; i++) {
    test = words[i];
    metrics = context.measureText(test);
    while (metrics.width > maxWidth) {
      // Determine how much of the word will fit
      test = test.substring(0, test.length - 1);
      metrics = context.measureText(test);
    }
    if (words[i] != test) {
      words.splice(i + 1, 0, words[i].substr(test.length));
      words[i] = test;
    }

    test = line + words[i] + ' ';
    metrics = context.measureText(test);

    if (metrics.width > maxWidth && i > 0) {
      context.fillText(line, x, y);
      line = words[i] + ' ';
      y += lineHeight;
      lineCount++;
    } else {
      line = test;
    }
  }

  context.fillText(line, x, y);
};

/**
 * Generate a card image (jpeg format)
 * by composing a background with a title
 * and an optional author.
 */
async function generateCardToBuffer({ title, author }) {
  const canvas = createCanvas(CARD_WIDTH, CARD_HEIGHT);

  const context = canvas.getContext('2d');
  const wrapText = wrapTextFactory(context);

  // draw our static background first
  const background = await loadImage(DEFAULT_BACKGROUND);
  context.drawImage(background, 0, 0, 1440, 760);

  // 1. Title
  context.font = 'bold 70pt Coco Gothic';
  context.textAlign = 'left';
  context.textBaseline = 'top';
  context.fillStyle = '#ffffff';
  wrapText(title, PADDING_X, PADDING_Y, CARD_WIDTH - PADDING_X * 2, 100);

  // 2. Author (optional)
  if (author) {
    context.font = '40pt Coco Gothic';
    context.textAlign = 'left';
    context.textBaseline = 'top';
    context.fillStyle = '#ffffff';
    wrapText(
      author,
      PADDING_X,
      PADDING_Y + 300,
      CARD_WIDTH - PADDING_X * 2,
      100,
    );
  }

  return canvas.toBuffer('image/jpeg');
}

module.exports = {
  generateCardToBuffer,
};
