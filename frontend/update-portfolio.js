const fs = require('fs');
const path = require('path');

const portfolioDir = path.join(__dirname, 'public', 'portfolio');
const imagesJson = path.join(portfolioDir, 'images.json');

fs.readdir(portfolioDir, (err, files) => {
  if (err) {
    console.error('Error reading portfolio directory:', err);
    return;
  }

  const imageFiles = files.filter(file => /\.(jpg|jpeg|png|gif)$/i.test(file));
  const imagePaths = imageFiles.map(file => `/portfolio/${file}`);

  fs.writeFile(imagesJson, JSON.stringify(imagePaths, null, 2), (err) => {
    if (err) {
      console.error('Error writing images.json:', err);
      return;
    }
    console.log('images.json updated with', imagePaths.length, 'images');
  });
});