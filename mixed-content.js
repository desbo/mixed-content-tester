const phantom = require('phantom');
const urllib = require('url');
const results = {
  insecure: [],
  errors: []
};

if (process.argv.length === 2) {
  console.log('Usage: node mixed-content <URL>');
  return process.exit(1);
}

function onResourceRequested(req) {
  const url = urllib.parse(req.url);

  if (url.protocol === 'http:') {
    results.insecure.push(url);
  }
}

function onResourceError(err) {
  results.errors.push(err);
}

function open(url) {
  return new Promise((resolve, reject) => {
    phantom.create(session => {
      session.set('onError', reject);

      session.createPage(page => {
        page.set('onError', null); // suppress stdout
        page.set('onResourceRequested', onResourceRequested);
        page.set('onResourceError', onResourceError);
        page.set('onLoadFinished', status => {
          if (status !== 'success') return reject(status);
          resolve();
        });

        page.open(url);
      });
    });
  });
}

function isActive(url) {
  return /js|html|css|swf|eot|woff|ttf/gi.test(url.path);
}

open(process.argv[2])
  .then(() => {
    const active = results.insecure.filter(isActive);
    const passive = results.insecure.filter(url => !isActive(url));
    const ssl = results.errors.filter(err => err.errorCode === 6);

    if (active) {
      console.log('\nMixed content errors (active):');
      active.forEach(url => console.error(url.href));
    }

    if (passive) {
      console.log('\nMixed content warnings (passive):');
      passive.forEach(url => console.warn(url.href));
    }

    if (ssl) {
      console.log('\nSSL errors:');
      ssl.forEach(err => console.error(err.url, '(' + err.errorString + ')'));
    }

    process.exit(0);
  })
  .catch(e => console.trace(e));
