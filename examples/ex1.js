var monk = require('monk')
var db = monk('localhost:27017/monk_promises_experiment');
var users = db.get('users');

// Add some data to users collection:
users.insert({firstName: 'Andreas', lastName: 'Kavountzis'});
users.insert({firstName: 'Bob', lastName: 'Ross'});
users.insert({firstName: 'Fionn', lastName: 'mac Cumhaill'});

var findPromise = promiseToFindUsers();
findPromise.then(resolve, reject);

function promiseToFindUsers() {
  return new Promise(function (onFulfilled, onRejected) {
    users.find({}, function (err, docs) {
      err ? onRejected(err) : onFulfilled(docs);
    });
  });
}

// here is it worth illustrating that a Promise is just an object:
console.log(typeof findPromise);
// whose constructor is Promise:
console.log(Object.getPrototypeOf(findPromise));

// another success case:
var insertUserPromise = users.insert({foo: 'barski'});
insertUserPromise.then(resolve, reject);

// simulate a failure using a known MongoDB issue (RegExp with nullbyte)
var willBeRejectedPromise = users.insert({somethingBroken: new RegExp('a\0b')});
willBeRejectedPromise.then(resolve, reject);

function resolve () { console.log("resolve!: ", arguments)}
function reject () { console.log("reject!: ", arguments)}
