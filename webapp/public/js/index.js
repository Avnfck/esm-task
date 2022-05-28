import { readCSV } from './fileSystem.js';

const uploadButton = document.getElementById('uploadData');
uploadButton.addEventListener('change', () => {
  readCSV(uploadButton);
});