var request = require('supertest');
var db = require('../../config/database');
var app = require('../../app');
var expect = require('chai').expect;


var categoriesCollection = db.get('categories');


describe('categories', function() {

    beforeEach(function(done) {
        categoriesCollection.remove({}, function(err) {
            if (err) done(err);
            done();
        });
    });

    function resolve() {
        console.log('the insert was successful', arguments);
        return arguments;
    }

    function reject() {
        console.log('there was an error', arguments);
    }

    describe('GET /categories', function() {
        it('responds with a 200', function(done) {
            request(app).get('/categories').expect(200, done);
        });
        it('returns category object', function(done) {
            var cat = {
                name: 'Animals'
            }

            function promiseToInsert() {
                return new Promise(function(onResolved, onReject) {
                    categoriesCollection.insert(cat, function(err, data) {
                        err ? onReject(err) : onResolved(data)
                    });
                })
            }

            function promiseToGet() {
                return new Promise(function(data) {
                    request(app).get('/categories').expect(function(response) {
                        expect(response.body[0].name).to.equal('Animals');
                    }).end(done);
                })
            }

            var promise = promiseToInsert();
            var getPromise = promiseToGet();
            promise.then(resolve, reject).then(getPromise);

        });
    });

    describe('POST /categories', function() {
        it('responds with a 200', function(done) {
            request(app).post('/categories').expect(200, done);
        });

        it('allows us to create a category object', function(done) {
            var cat = {
                name: 'Animals'
            }

            request(app).post('/categories').send(cat)
                .then(function(response) {
                    categoriesCollection.find({}, function(err, data) {
                        expect(data[0].name).to.equal('Animals');
                        done();
                    })
                })
        });

    });

});
