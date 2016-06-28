require('../helper');

var http = require('http'),
    server;

// before(function() {
//   server = http.createServer(require('../../app'));
//   server.listen(0);
//   browser.baseUrl = 'http://localhost:' + server.address().port;
// });
//
beforeEach(function() {
  return browser.ignoreSynchronization = true;
});

// after(function(){
//   server.close();
// });

describe('Categories And Products CRUD', function(){
  describe('Given I visit /', function () {
    describe('When I am on the homepage', function(){
      it('Then I can see a product form', function(done){
        browser.get('/');
        element(by.id('product_form')).getText().then(function(text){
          expect(text).to.equal('Hey')
        })
        done()
      })
    });
  });
});
