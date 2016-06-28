var fs = require('fs');

function promiseToReadFile (fileName) {
  return new Promise(function (resolve, reject) {
    fs.readFile(fileName, function (err, data) {
      err ? reject(err) : resolve(data);
    });
  })
};

var readPromise = promiseToReadFile(__filename);

readPromise
  .then(logFileData, logError)
  .then(lineCount)
  .then(averageLineLength);

function logFileData (bufferedData) {
  return bufferedData.toString().split('\n');
}

function logError (err) {
  console.error("There was an error attempting to read the file: ", err);
}

function lineCount (lines) {
  console.log("num lines is", lines.length);
  return lines;
}

function averageLineLength (lines) {
  var averageLineLength = lines.reduce(function (output, line) {
    return output + line.length
  }, 0) / lines.length;
  console.log("By line the averageLineLength are: ", averageLineLength);
}
