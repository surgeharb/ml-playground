import fs from 'fs';
import brain from 'brain.js';

const inputWord = process.argv[2];

const trainedDataPath = './data/text-prediction/trained-net.json';
const trainingDataPath = './data/text-prediction/training.json';

const net = new brain.recurrent.LSTM();

if (fs.existsSync(trainedDataPath)) {
  const json = JSON.parse(fs.readFileSync(trainedDataPath));
  net.fromJSON(json);
} else {
  console.log('No Previous Training Model Found!');
  const trainingData = JSON.parse(fs.readFileSync(trainingDataPath));
  console.log('Training...');
  net.train(trainingData, trainingOptions);
  console.log('Saving...');
  fs.writeFileSync(trainedDataPath, JSON.stringify(net.toJSON()), 'utf8');
}

const outputWord = net.run(inputWord);

console.log('inputWord', inputWord);
console.log('outputWord', outputWord);
