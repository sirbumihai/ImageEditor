// Obține elementul canvas și contextul său de randare 2D
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

// Obține elementul pentru afișarea conținutului JSON
const jsonContent = document.getElementById('jsonContent');

// Variabilă pentru stocarea imaginii originale
let originalImage;

// Funcție pentru încărcarea unei imagini aleatorii cu câini
async function loadDogImage() {
  try {
    // Obține o imagine aleatoare de câine de la o API
    // Afiseaza continutul JSON returnat de API
    const response = await fetch('https://dog.ceo/api/breeds/image/random');
    if (!response.ok) {
      throw new Error(`Network response was not ok: ${response.status}`);
    }

    const data = await response.json();
    const imageUrl = data.message;
    const img = new Image();

    img.crossOrigin = 'Anonymous';
    img.onload = function() {
      canvas.width = img.width;
      canvas.height = img.height;
      originalImage = img; 
      processImage();
    };
    
    img.src = imageUrl;
    const jsonContent = document.getElementById('jsonContent');
    jsonContent.innerHTML = `<pre>${JSON.stringify(data, null, 2)}</pre>`;
  } catch (error) {
    console.error('Eroare în preluarea imaginii:', error);
  }
}
// Funcție pentru desenarea unei imagini pe canvas
function drawImage(img) {
  canvas.width = img.width;
  canvas.height = img.height;

  ctx.drawImage(img, 0, 0);
}

const processingInfo = document.getElementById('processingInfo');

// Funcție pentru procesarea imaginii încărcate
async function processImage() {
  try {
    // Realizează procesarea imaginii pas cu pas și calculează timpul de procesare
    // Afiseaza informatiile de procesare pe pagina HTML
    const imageHeight = originalImage.height;

    const startProcessing = performance.now();

    // Etapa 1
    const startTimeStep1 = performance.now();
    await processStep1();
    const endTimeStep1 = performance.now();

    const timeStep1 = endTimeStep1 - startTimeStep1;
    const processingMessages1 = `
    <p><strong>Etapă 1:</strong> ${timeStep1} ms</p>
    `;

    const processingInfo1 = document.getElementById('processingInfo');
    if (processingInfo1) {
      processingInfo1.innerHTML = processingMessages1;
    } else {
      console.error('Element with id "processinginfo1" not found');
    }

    // Etapa 2
    const startTimeStep2 = performance.now();
    await processStep2();
    const endTimeStep2 = performance.now();

    const timeStep2 = endTimeStep2 - startTimeStep2;
    const processingMessages2 = `
    <p><strong>Etapă 1:</strong> ${timeStep1} ms</p>
    <p><strong>Etapă 2:</strong> ${timeStep2} ms</p>
    `;

    const processingInfo2 = document.getElementById('processingInfo');
    if (processingInfo2) {
      processingInfo2.innerHTML = processingMessages2;
    } else {
      console.error('Element with id "processinginfo2" not found');
    }

    // Etapa 3
    const startTimeStep3 = performance.now();
    await processStep3();
    const endTimeStep3 = performance.now();

    const timeStep3 = endTimeStep3 - startTimeStep3;
    const processingMessages3 = `
    <p><strong>Etapă 1:</strong> ${timeStep1} ms</p>
    <p><strong>Etapă 2:</strong> ${timeStep2} ms</p>
    <p><strong>Etapă 3:</strong> ${timeStep3} ms</p>
    `;

    const processingInfo3 = document.getElementById('processingInfo');
    if (processingInfo3) {
      processingInfo3.innerHTML = processingMessages3;
    } else {
      console.error('Element with id "processinginfo3" not found');
    }

    // Etapa 4
    const startTimeStep4 = performance.now();
    await processStep4();
    const endTimeStep4 = performance.now();

    const timeStep4 = endTimeStep4 - startTimeStep4;
    const totalTime = endTimeStep4 - startProcessing;

    const processingMessages = `
    <p><strong>Etapă 1:</strong> ${timeStep1} ms</p>
    <p><strong>Etapă 2:</strong> ${timeStep2} ms</p>
    <p><strong>Etapă 3:</strong> ${timeStep3} ms</p>
    <p><strong>Etapă 4:</strong> ${timeStep4} ms</p>
    <p><strong>Timpul total de procesare:</strong> ${totalTime} ms</p>
    `;

    const processingInfo = document.getElementById('processingInfo');
    if (processingInfo) {
      processingInfo.innerHTML = processingMessages;
    } else {
      console.error('Element with id "processinginfo4" not found');
    }
  } catch (error) {
    console.error('Eroare în procesarea imaginii:', error);
  }
}
// Funcție pentru adăugarea întârzierii între etapele de procesare
function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
// Funcție pentru desenarea unei porțiuni din imagine pe canvas
function drawImageSlice(image, startRow, endRow) {
  if (!image || !image.height) {
    console.error('Image is not loaded yet');
    return;
  }
  const canvas = document.getElementById('canvas');
  const ctx = canvas.getContext('2d');
  
  ctx.drawImage(
    image, 
    0, startRow, 
    image.width, endRow - startRow, 
    0, startRow, 
    canvas.width, endRow - startRow 
  );
}
// Funcții pentru fiecare pas de procesare (procesarePas1, procesarePas2, procesarePas3, procesarePas4)
async function processStep1() {
  const sliceHeight = Math.ceil(originalImage.height / 4);
  await delay(1000); 
  drawImageSlice(originalImage, 0, sliceHeight);
}

async function processStep2() {
  const sliceHeight = Math.ceil(originalImage.height / 4); 
  await delay(1000); 
  drawImageSlice(originalImage, sliceHeight, sliceHeight * 2);
}

async function processStep3() {
  const sliceHeight = Math.ceil(originalImage.height / 4);
  await delay(1000); 
  drawImageSlice(originalImage, sliceHeight * 2, sliceHeight * 3);
}

async function processStep4() {
  const imageHeight = originalImage.height;
  const sliceHeight = Math.ceil(originalImage.height / 4);
  await delay(1000); 
  drawImageSlice(originalImage, sliceHeight * 3, imageHeight);
}
// Funcție pentru aplicarea unui filtru selectat imaginii
function applySelectedFilter() {
  // Obține valoarea filtrului selectat din dropdown
  // Aplică filtrul selectat imaginii și afisează imaginea filtrată pe canvas
    const dropdown = document.getElementById('filterDropdown');
    const selectedFilter = dropdown.value;
  
    let filteredImageData;

    const translateInputs = document.getElementById('translateInputs');
    translateInputs.style.display = selectedFilter === 'translateImage' ? 'block' : 'none';

    const canvas1 = document.getElementById('canvas1');
    const canvas2 = document.getElementById('canvas2');

    canvas1.style.display = selectedFilter === 'binaryOperation' ? 'block' : 'none';
    canvas2.style.display = selectedFilter === 'binaryOperation' ? 'block' : 'none';
  
    switch (selectedFilter) {
      case 'none':
        drawImage(originalImage); 
        break;
      case 'grayscaleAverage':
        filteredImageData = colorToGrayscaleAverage(originalImage);
        break;
      case 'normalizeColors':
        filteredImageData = normalizeColors(originalImage);
        break;
      case 'sobelOperator':
        filteredImageData = sobelOperator(originalImage);
        break;
      case 'prewittOperator':
        filteredImageData = prewittOperator(originalImage);
        break;
      case 'imageSharpening':
        filteredImageData = imageSharpening(originalImage);
        break;
      case 'imageSmoothing':
        filteredImageData = imageSmoothing(originalImage);
        break;
      case 'mirrorImage':
        filteredImageData = mirrorImage(originalImage);
        break;
      case 'binaryOperation':
        filteredImageData = binaryOperation(originalImage,mirrorImage(originalImage),'AND');
        break;
      case 'grayLevelHistogramRange':
        filteredImageData = grayLevelHistogramRange(originalImage);
        break;
      case 'decreaseColorDepth':
        filteredImageData = decreaseColorDepth(originalImage,11);
        break;
      case 'rotateImage':
        filteredImageData = rotateImage(originalImage,90);
        break;
      case 'translateImage':
        filteredImageData = translateImage(originalImage,0,0);
        break;
      case 'colorToGrayscaleWeighted':
        filteredImageData = colorToGrayscaleWeighted(originalImage);
        break;
      case 'pixelReplicationZoom':
        filteredImageData = pixelReplicationZoom(originalImage,0.5);
        break;
      case 'zeroOrderHoldZoom':
        filteredImageData = zeroOrderHoldZoom(originalImage,0.5);
        break;
      case 'zoomKTimes':
        filteredImageData = zoomKTimes(originalImage,2);
        break;
      case 'adjustBrightness':
        filteredImageData = adjustBrightness(originalImage,50);
        break;
      case 'adjustContrast':
        filteredImageData = adjustContrast(originalImage,50);
        break;
      case 'linearGrayLevelTransform':
        filteredImageData = linearGrayLevelTransform(originalImage, 1.5, 20);
        break;
      case 'logarithmicGrayTransform':
        filteredImageData = logarithmicGrayTransform(originalImage, 50);
        break;
      case 'powerLawGrayTransform':
        filteredImageData = powerLawGrayTransform(originalImage, 8);
        break;
      case 'applyLaplacianOperator':
        filteredImageData = applyLaplacianOperator(originalImage);
        break;
      default:
        break;
    }
  
    if (filteredImageData) {
      drawImage(filteredImageData);
    }
  }
// Funcții pentru diverse filtre de procesare a imaginilor (colorToGrayscaleAverage, normalizeColors, etc.)
function colorToGrayscaleAverage(image) {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  canvas.width = image.width;
  canvas.height = image.height;
  ctx.drawImage(image, 0, 0);

  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const data = imageData.data;

  for (let i = 0; i < data.length; i += 4) {
    const avg = (data[i] + data[i + 1] + data[i + 2]) / 3;
    data[i] = avg; 
    data[i + 1] = avg; 
    data[i + 2] = avg; 
  }

  ctx.putImageData(imageData, 0, 0);
  return canvas;
}
function normalizeColors(image) {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  const width = image.width;
  const height = image.height;

  canvas.width = width;
  canvas.height = height;
  ctx.drawImage(image, 0, 0);

  const imageData = ctx.getImageData(0, 0, width, height);
  const data = imageData.data;

  let min = Infinity;
  let max = -Infinity;

  for (let i = 0; i < data.length; i += 4) {
    const brightness = data[i] + data[i + 1] + data[i + 2];
    min = Math.min(min, brightness);
    max = Math.max(max, brightness);
  }

  const scale = 255 / (max - min);

  for (let i = 0; i < data.length; i += 4) {
    const brightness = data[i] + data[i + 1] + data[i + 2];
    const ratio = (brightness - min) * scale;

    if (brightness !== 0) {
      data[i] = Math.min(255, data[i] * ratio / brightness);
      data[i + 1] = Math.min(255, data[i + 1] * ratio / brightness);
      data[i + 2] = Math.min(255, data[i + 2] * ratio / brightness);
    }
  }

  ctx.putImageData(imageData, 0, 0);
  return canvas;
}
function sobelOperator(image) {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');

  canvas.width = image.width;
  canvas.height = image.height;
  ctx.drawImage(image, 0, 0, image.width, image.height);

  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const data = imageData.data;
  const width = canvas.width;
  const height = canvas.height;

  const sobelData = [];
  const grayscaleData = [];

  function bindPixelAt(data) {
    return function(x, y, i = 0) {
      const idx = (x + y * width) * 4;
      return data[idx + i];
    };
  }

  const dataAt = bindPixelAt(data);
  const sobelDataAt = bindPixelAt(sobelData);

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const r = dataAt(x, y, 0);
      const g = dataAt(x, y, 1);
      const b = dataAt(x, y, 2);

      const avg = (r + g + b) / 3;
      grayscaleData.push(avg, avg, avg, 255);
    }
  }

  const grayscaleAt = bindPixelAt(grayscaleData);

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const xGradient = grayscaleAt(x - 1, y - 1) + 2 * grayscaleAt(x, y - 1) + grayscaleAt(x + 1, y - 1) - grayscaleAt(x - 1, y + 1) - 2 * grayscaleAt(x, y + 1) - grayscaleAt(x + 1, y + 1);
      const yGradient = grayscaleAt(x - 1, y - 1) + 2 * grayscaleAt(x - 1, y) + grayscaleAt(x - 1, y + 1) - grayscaleAt(x + 1, y - 1) - 2 * grayscaleAt(x + 1, y) - grayscaleAt(x + 1, y + 1);

      const val = Math.sqrt(xGradient * xGradient + yGradient * yGradient) >>> 0;
      sobelData.push(val, val, val, 255);
    }
  }

  sobelData.forEach((val, i) => {
    data[i] = val;
  });

  ctx.putImageData(imageData, 0, 0);
  return canvas;
}
function prewittOperator(image) {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');

  canvas.width = image.width;
  canvas.height = image.height;
  ctx.drawImage(image, 0, 0, image.width, image.height);

  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const data = imageData.data;
  const width = canvas.width;
  const height = canvas.height;

  const prewittData = [];
  const grayscaleData = [];

  function bindPixelAt(data) {
    return function(x, y, i = 0) {
      const idx = (x + y * width) * 4;
      return data[idx + i];
    };
  }

  const dataAt = bindPixelAt(data);
  const prewittDataAt = bindPixelAt(prewittData);

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const r = dataAt(x, y, 0);
      const g = dataAt(x, y, 1);
      const b = dataAt(x, y, 2);

      const avg = (r + g + b) / 3;
      grayscaleData.push(avg, avg, avg, 255);
    }
  }

  const grayscaleAt = bindPixelAt(grayscaleData);

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const xGradient = grayscaleAt(x - 1, y - 1) + grayscaleAt(x, y - 1) + grayscaleAt(x + 1, y - 1) - grayscaleAt(x - 1, y + 1) - grayscaleAt(x, y + 1) - grayscaleAt(x + 1, y + 1);
      const yGradient = grayscaleAt(x - 1, y - 1) + grayscaleAt(x - 1, y) + grayscaleAt(x - 1, y + 1) - grayscaleAt(x + 1, y - 1) - grayscaleAt(x + 1, y) - grayscaleAt(x + 1, y + 1);
  
      const val = Math.sqrt(xGradient * xGradient + yGradient * yGradient) >>> 0;
      prewittData.push(val, val, val, 255);
    }
  }

  prewittData.forEach((val, i) => {
    data[i] = val;
  });

  ctx.putImageData(imageData, 0, 0);
  return canvas;
}
function imageSharpening(image) {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');

  canvas.width = image.width;
  canvas.height = image.height;
  ctx.drawImage(image, 0, 0, image.width, image.height);

  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const data = imageData.data;
  const width = canvas.width;
  const height = canvas.height;

  const sharpenData = new Uint8ClampedArray(data);

  const sharpenKernel = [
    [0, -1, 0],
    [-1, 5, -1],
    [0, -1, 0]
  ];

  function bindPixelAt(data) {
    return function(x, y, i = 0) {
      if (x < 0 || y < 0 || x >= width || y >= height) {
        return 0;
      }
      const idx = (x + y * width) * 4;
      return data[idx + i];
    };
  }

  const dataAt = bindPixelAt(data);
  const sharpenDataAt = bindPixelAt(sharpenData);

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      let sumR = 0;
      let sumG = 0;
      let sumB = 0;

      for (let offsetY = -1; offsetY <= 1; offsetY++) {
        for (let offsetX = -1; offsetX <= 1; offsetX++) {
          const pixelR = dataAt(x + offsetX, y + offsetY, 0);
          const pixelG = dataAt(x + offsetX, y + offsetY, 1);
          const pixelB = dataAt(x + offsetX, y + offsetY, 2);

          sumR += pixelR * sharpenKernel[offsetY + 1][offsetX + 1];
          sumG += pixelG * sharpenKernel[offsetY + 1][offsetX + 1];
          sumB += pixelB * sharpenKernel[offsetY + 1][offsetX + 1];
        }
      }

      const index = (y * width + x) * 4;
      sharpenData[index] = sumR;
      sharpenData[index + 1] = sumG;
      sharpenData[index + 2] = sumB;
      sharpenData[index + 3] = 255;
    }
  }

  const sharpenedImageData = new ImageData(sharpenData, width, height);
  ctx.putImageData(sharpenedImageData, 0, 0);
  return canvas;
}
function getPixelAt(imageData, x, y) {
  const { data, width } = imageData;
  const index = (y * width + x) * 4;
  return [data[index], data[index + 1], data[index + 2], data[index + 3]];
}
function setPixelAt(imageData, x, y, [red, green, blue, alpha]) {
  const { data, width } = imageData;
  const index = (y * width + x) * 4;
  data[index] = red;
  data[index + 1] = green;
  data[index + 2] = blue;
  data[index + 3] = alpha;
}
function imageSmoothing(image) {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  canvas.width = image.width;
  canvas.height = image.height;
  ctx.drawImage(image, 0, 0);

  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const data = imageData.data;
  const width = canvas.width;
  const height = canvas.height;

  const smoothingMatrix = [
    [1, 1, 1],
    [1, 1, 1],
    [1, 1, 1]
  ];

  const factor = 1 / 9;

  for (let y = 1; y < height - 1; y++) {
    for (let x = 1; x < width - 1; x++) {
      let sumRed = 0;
      let sumGreen = 0;
      let sumBlue = 0;

      for (let j = -1; j <= 1; j++) {
        for (let i = -1; i <= 1; i++) {
          const pixel = getPixelAt(imageData, x + i, y + j);
          sumRed += pixel[0] * smoothingMatrix[j + 1][i + 1];
          sumGreen += pixel[1] * smoothingMatrix[j + 1][i + 1];
          sumBlue += pixel[2] * smoothingMatrix[j + 1][i + 1];
        }
      }

      const newRed = factor * sumRed;
      const newGreen = factor * sumGreen;
      const newBlue = factor * sumBlue;

      setPixelAt(imageData, x, y, [newRed, newGreen, newBlue, 255]);
    }
  }

  ctx.putImageData(imageData, 0, 0);
  return canvas;
}
function mirrorImage(image) {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  canvas.width = image.width;
  canvas.height = image.height;

  ctx.drawImage(image, 0, 0, image.width, image.height);

  let imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  let data = imgData.data;

  for(let y = 0; y < canvas.height; y++) {
    for(let x = canvas.width - 1; x > canvas.width / 2; x--) {
      let mirrorX = canvas.width - x - 1;

      let idx = (x + y * canvas.width) * 4;
      let mirrorIdx = (mirrorX + y * canvas.width) * 4;

      for(let i = 0; i < 3; i++) {
        let temp = data[idx + i];
        data[idx + i] = data[mirrorIdx + i];
        data[mirrorIdx + i] = temp;
      }
    }
  }

  ctx.putImageData(imgData, 0, 0);

  return canvas;
}
function binaryOperation(image1, image2, operation) {
  const canvas1 = document.getElementById('canvas1');
  const canvas2 = document.getElementById('canvas2');

  canvas1.width = image1.width;
  canvas1.height = image1.height;
  canvas2.width = image2.width;
  canvas2.height = image2.height;

  const ctx1 = canvas1.getContext('2d');
  ctx1.drawImage(image1, 0, 0, image1.width, image1.height);
  const ctx2 = canvas2.getContext('2d');
  ctx2.drawImage(image2, 0, 0, image2.width, image2.height);

  const data1 = ctx1.getImageData(0, 0, canvas1.width, canvas1.height).data;
  const data2 = ctx2.getImageData(0, 0, canvas2.width, canvas2.height).data;

  const canvasResult = document.createElement('canvas');
  canvasResult.width = image1.width;
  canvasResult.height = image1.height;
  const ctxResult = canvasResult.getContext('2d');
  const resultData = ctxResult.createImageData(canvasResult.width, canvasResult.height).data;

  for (let i = 0; i < data1.length; i += 4) {
    if (operation === 'AND') {
      resultData[i] = data1[i] & data2[i];
      resultData[i + 1] = data1[i + 1] & data2[i + 1];
      resultData[i + 2] = data1[i + 2] & data2[i + 2];
    } else if (operation === 'OR') {
      resultData[i] = data1[i] | data2[i];
      resultData[i + 1] = data1[i + 1] | data2[i + 1];
      resultData[i + 2] = data1[i + 2] | data2[i + 2];
    } else if (operation === 'XOR') {
      resultData[i] = data1[i] ^ data2[i];
      resultData[i + 1] = data1[i + 1] ^ data2[i + 1];
      resultData[i + 2] = data1[i + 2] ^ data2[i + 2];
    }
    resultData[i + 3] = 255; 
  }

  ctxResult.putImageData(new ImageData(resultData, canvas1.width, canvas1.height), 0, 0);

  return canvasResult;
}
function grayLevelHistogramRange(image) {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  const width = image.width;
  const height = image.height;

  canvas.width = width;
  canvas.height = height;
  ctx.drawImage(image, 0, 0);

  const imageData = ctx.getImageData(0, 0, width, height);
  const data = imageData.data;

  const histogram = new Array(256).fill(0);
  for (let i = 0; i < data.length; i += 4) {
    const grayscaleValue = Math.floor((data[i] + data[i + 1] + data[i + 2]) / 3);
    histogram[grayscaleValue]++;
  }

  const maxGrayLevel = histogram.reduce((maxIndex, currentValue, currentIndex, array) => {
    return currentValue > array[maxIndex] ? currentIndex : maxIndex;
  }, 0);

  const minGrayLevel = Math.max(maxGrayLevel - 5, 0);
  const maxGrayLevelRange = Math.min(maxGrayLevel + 5, 255);

  for (let i = 0; i < data.length; i += 4) {
    const grayscaleValue = Math.floor((data[i] + data[i + 1] + data[i + 2]) / 3);
    if (grayscaleValue >= minGrayLevel && grayscaleValue <= maxGrayLevelRange) {
    } else {
      data[i] = 0;
      data[i + 1] = 0;
      data[i + 2] = 0;
    }
  }

  ctx.putImageData(imageData, 0, 0);
  return canvas;
}
function decreaseColorDepth(image, levels) {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  const width = image.width;
  const height = image.height;

  canvas.width = width;
  canvas.height = height;
  ctx.drawImage(image, 0, 0);

  const imageData = ctx.getImageData(0, 0, width, height);
  const data = imageData.data;

  const factor = 255 / (levels - 1);

  for (let i = 0; i < data.length; i += 4) {
    const red = data[i];
    const green = data[i + 1];
    const blue = data[i + 2];

    const grayscaleValue = (red + green + blue) / 3;

    const newValue = Math.round(grayscaleValue / factor) * factor;

    data[i] = newValue;
    data[i + 1] = newValue; 
    data[i + 2] = newValue; 
  }

  ctx.putImageData(imageData, 0, 0);
  return canvas;
}
function rotateImage(image, angle) {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  const width = image.width;
  const height = image.height;

  canvas.width = angle % 180 === 0 ? width : height;
  canvas.height = angle % 180 === 0 ? height : width;

  ctx.translate(canvas.width / 2, canvas.height / 2);
  ctx.rotate(angle * Math.PI / 180);
  ctx.drawImage(image, -width / 2, -height / 2);

  return canvas;
}
function applyTranslation() {
  const image = document.getElementById('canvas'); 
  const translateX = parseInt(document.getElementById('translateXInput').value);
  const translateY = parseInt(document.getElementById('translateYInput').value);

  const translatedCanvas = translateImage(image, translateX, translateY); 

  const canvas = document.getElementById('canvas');
  const ctx = canvas.getContext('2d');
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(translatedCanvas, 0, 0);
}
function translateImage(image, translateX, translateY) {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');

  canvas.width = image.width;
  canvas.height = image.height;

  ctx.translate(translateX, translateY);
  ctx.drawImage(image, 0, 0);

  return canvas;
}
function colorToGrayscaleWeighted(image) {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  const width = image.width;
  const height = image.height;

  canvas.width = width;
  canvas.height = height;
  ctx.drawImage(image, 0, 0);

  const imageData = ctx.getImageData(0, 0, width, height);
  const data = imageData.data;

  for (let i = 0; i < data.length; i += 4) {
    const red = data[i];
    const green = data[i + 1];
    const blue = data[i + 2];

    const grayscale = 0.21 * red + 0.72 * green + 0.07 * blue;

    data[i] = grayscale; 
    data[i + 1] = grayscale; 
    data[i + 2] = grayscale; 
  }

  ctx.putImageData(imageData, 0, 0);
  return canvas;
}
function pixelReplicationZoom(image, zoomFactor) {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');

  const newWidth = image.width * zoomFactor;
  const newHeight = image.height * zoomFactor;

  canvas.width = newWidth;
  canvas.height = newHeight;

  ctx.drawImage(image, 0, 0, newWidth, newHeight);

  return canvas;
}
function zeroOrderHoldZoom(image, zoomFactor) {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');

  const newWidth = (image.width * zoomFactor) - (zoomFactor - 1);
  const newHeight = (image.height * zoomFactor) - (zoomFactor - 1);

  canvas.width = newWidth;
  canvas.height = newHeight;

  ctx.drawImage(image, 0, 0, newWidth, newHeight);

  return canvas;
}
function zoomKTimes(image, k) {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');

  const originalWidth = image.width;
  const originalHeight = image.height;

  let newWidth = Math.floor(originalWidth * k);
  let newHeight = Math.floor(originalHeight * k);

  canvas.width = newWidth;
  canvas.height = newHeight;

  ctx.drawImage(image, 0, 0, newWidth, newHeight);

  for (let i = 1; i < k; i++) {
    newWidth = Math.floor(newWidth / k);
    newHeight = Math.floor(newHeight / k);

    const tempCanvas = document.createElement('canvas');
    const tempCtx = tempCanvas.getContext('2d');

    tempCanvas.width = newWidth;
    tempCanvas.height = newHeight;

    tempCtx.drawImage(canvas, 0, 0, newWidth, newHeight);

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(tempCanvas, 0, 0, newWidth * k, newHeight * k);
  }

  return canvas;
}
function adjustBrightness(image, adjustment) {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  canvas.width = image.width;
  canvas.height = image.height;
  ctx.drawImage(image, 0, 0);

  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const data = imageData.data;

  for (let i = 0; i < data.length; i += 4) {
    data[i] = Math.max(0, Math.min(255, data[i] + adjustment)); 
    data[i + 1] = Math.max(0, Math.min(255, data[i + 1] + adjustment)); 
    data[i + 2] = Math.max(0, Math.min(255, data[i + 2] + adjustment));
  }

  ctx.putImageData(imageData, 0, 0);
  return canvas;
}
function clamp(value) {
  return Math.max(0, Math.min(Math.floor(value), 255));
}
function adjustContrast(image, contrast) {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  canvas.width = image.width;
  canvas.height = image.height;
  ctx.drawImage(image, 0, 0);

  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const data = imageData.data;

  const factor = (259 * (contrast + 255)) / (255 * (259 - contrast));

  for (let i = 0; i < data.length; i += 4) {
    const red = data[i];
    const green = data[i + 1];
    const blue = data[i + 2];

    const newRed = factor * (red - 128) + 128;
    const newGreen = factor * (green - 128) + 128;
    const newBlue = factor * (blue - 128) + 128;

    data[i] = clamp(newRed); 
    data[i + 1] = clamp(newGreen); 
    data[i + 2] = clamp(newBlue);
  }

  ctx.putImageData(imageData, 0, 0);
  return canvas;
}
function linearGrayLevelTransform(image, slope, intercept) {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  const width = image.width;
  const height = image.height;

  canvas.width = width;
  canvas.height = height;
  ctx.drawImage(image, 0, 0);

  const imageData = ctx.getImageData(0, 0, width, height);
  const data = imageData.data;

  for (let i = 0; i < data.length; i += 4) {
    const gray = (data[i] + data[i + 1] + data[i + 2]) / 3;
    const newValue = slope * gray + intercept;

    data[i] = newValue;
    data[i + 1] = newValue; 
    data[i + 2] = newValue;
  }

  ctx.putImageData(imageData, 0, 0);
  return canvas;
}
function logarithmicGrayTransform(imageData, factor) {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  canvas.width = imageData.width;
  canvas.height = imageData.height;
  ctx.drawImage(imageData, 0, 0);

  const imageDataCopy = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const data = imageDataCopy.data;

  for (let i = 0; i < data.length; i += 4) {
    let gray = (data[i] + data[i + 1] + data[i + 2]) / 3;
    gray = factor * Math.log(1 + gray);

    gray = Math.min(255, gray);

    data[i] = gray; 
    data[i + 1] = gray; 
    data[i + 2] = gray;
  }

  ctx.putImageData(imageDataCopy, 0, 0);
  return canvas;
}
function powerLawGrayTransform(imageData, gamma) {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  canvas.width = imageData.width;
  canvas.height = imageData.height;
  ctx.drawImage(imageData, 0, 0);

  const imageDataCopy = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const data = imageDataCopy.data;

  const factor = 255 ** (1 - gamma);

  for (let i = 0; i < data.length; i += 4) {
    let gray = (data[i] + data[i + 1] + data[i + 2]) / 3;
    gray = factor * gray ** gamma;

    gray = Math.min(255, gray);

    data[i] = gray; 
    data[i + 1] = gray; 
    data[i + 2] = gray;
  }

  ctx.putImageData(imageDataCopy, 0, 0);
  return canvas;
}
function applyLaplacianOperator(image) {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  const width = image.width;
  const height = image.height;

  canvas.width = width;
  canvas.height = height;
  ctx.drawImage(image, 0, 0);

  const imageData = ctx.getImageData(0, 0, width, height);
  const data = imageData.data;

  const laplaceKernel = [
    [0, -1, 0],
    [-1, 4, -1],
    [0, -1, 0]
  ];

  const laplaceData = new Uint8ClampedArray(data);

  function bindPixelAt(data) {
    return function(x, y, i = 0) {
      if (x < 0 || y < 0 || x >= width || y >= height) {
        return 0;
      }
      const idx = (x + y * width) * 4;
      return data[idx + i];
    };
  }

  const dataAt = bindPixelAt(data);
  const laplaceDataAt = bindPixelAt(laplaceData);

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      let sumR = 0;
      let sumG = 0;
      let sumB = 0;

      for (let offsetY = -1; offsetY <= 1; offsetY++) {
        for (let offsetX = -1; offsetX <= 1; offsetX++) {
          const pixelR = dataAt(x + offsetX, y + offsetY, 0);
          const pixelG = dataAt(x + offsetX, y + offsetY, 1);
          const pixelB = dataAt(x + offsetX, y + offsetY, 2);

          sumR += pixelR * laplaceKernel[offsetY + 1][offsetX + 1];
          sumG += pixelG * laplaceKernel[offsetY + 1][offsetX + 1];
          sumB += pixelB * laplaceKernel[offsetY + 1][offsetX + 1];
        }
      }

      const index = (y * width + x) * 4;
      laplaceData[index] = sumR;
      laplaceData[index + 1] = sumG;
      laplaceData[index + 2] = sumB;
      laplaceData[index + 3] = 255;
    }
  }

  const laplaceImageData = new ImageData(laplaceData, width, height);
  ctx.putImageData(laplaceImageData, 0, 0);
  return canvas;
}

loadDogImage();

$(document).ready(function(){
  $('.toggle').click(function(){
      $('.menu').toggleClass('active');
  });
});