var fs = require('fs');

var readFilePromise = promiseToReadFile('hello.txt');

readFilePromise.then(appendWorldFile, logError)
  .then(console.log);

function promiseToReadFile(fileName) {
  return new Promise(function (resolve, reject) {
    fs.readFile(fileName, function (err, data) {
      err ? reject(err) : resolve(data);
    });
  })
};

function appendWorldFile (bufferedData) {
  return new Promise(function (resolve, reject) {
      fs.readFile('world.txt', function (err, data) {
        err ? reject(err) : resolve(bufferedData.toString() + ' ' + data.toString());
      });
    })
}

function logError (err) {
  console.error("There was an error attempting to read the file: ", err);
}
