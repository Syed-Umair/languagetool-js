const process = require('process');
console.log('Testing...');
require('.').smoketest().then(
  () => { console.log('Success'); process.exit(0); },
  err => { console.error(err); process.exit(1); }
);
