var fs = require('fs');

// var readPromise = promiseToReadFile('first_example.js');
promiseToReadFile('first_example.js').then(logFileData, logError);

// readPromise.then(logFileData, logError);

function promiseToReadFile(fileName) {
  return new Promise(function (resolve, reject) {
    fs.readFile(fileName, function (err, data) {
      err ? reject(err) : resolve(data);
    });
  })
};

function logFileData (bufferedData) {
  console.log("File read successful, here is the data as a String:");
  console.log(bufferedData.toString());
}
function logError (err) {
  console.error("There was an error attempting to read the file: ", err);
}
