var request = require('supertest');
var db = require('../../config/database');
var app = require('../../app');
var expect = require('chai').expect;

var productsCollection = db.get('products');


describe('products', function() {
    var product = {
        name: 'Fallout 4',
        price: '60',
        category: {
            name: 'game'
        },
        description: 'rpg shooter',
        _id: 1
    };

    var productId;

    beforeEach(function(done) {
        productsCollection.insert(product, done);
    });

    afterEach(function(done) {
        productsCollection.remove({}, done)
    });

    describe('GET /products', function() {
        it('responds with a 200', function(done) {
            request(app).get('/products').expect(200, done);
        });
        it('retrieves a product', function(done) {
            request(app).get('/products').expect(function(result) {
                expect(result.body[0].name).to.equal('Fallout 4');
            }).end(done);
        });
    });

    describe('POST /products', function() {
        it('responds with a 200', function(done) {
            request(app).post('/products').expect(200, done);
        });
        it('create a new product', function(done) {
            var newProduct = {
                name: 'Skyrim',
                price: '20',
                category: {
                    name: 'game'
                },
                description: 'Fantasy rpg'
            }
            request(app).post('/products').send(newProduct).then(function(response) {
                productsCollection.find({}, function(err, data) {
                    expect(data[1].name).to.equal('Skyrim');
                    done();
                })
            })
        });
    })

    describe('PUT /products/:id', function() {
        it('responds with a 200', function(done) {
            request(app).put('/products/1').expect(200, done);
        });
        it('updates an existing product', function(done) {
            var modifyProduct = {
                name: 'Fallout 4',
                price: '20',
                category: {
                    name: 'game'
                },
                description: 'rpg shooter'
            }

            request(app).put('/products/1').send(modifyProduct).then(function(results) {
                productsCollection.findOne({
                    _id: 1
                }, function(err, product) {
                    expect(product.price).to.equal('20')
                    done()
                });
            })
        });
    })
})
