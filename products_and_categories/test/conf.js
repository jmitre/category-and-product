exports.config ={
  specs:['acceptance/*.js'],
  baseUrl:'http://localhost:8080',
  framework: 'mocha',
  mochaOpts:{
    reporter: 'spec',
    slow: 3000,
    enableTimeouts: false
  },
  capabilities:{
    'browserName': 'chrome'
  },
  directConnect: true
};
