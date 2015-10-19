# Mixed content tester
Reports mixed content warnings for a URL. Requires [PhantomJS](http://phantomjs.org).

## Example usage
```
$ node mixed-content https://googlesamples.github.io/web-fundamentals/samples/fundamentals/security/prevent-mixed-content/active-mixed-content.html

Mixed content errors (active):
http://googlesamples.github.io/web-fundamentals/samples/discovery-and-distribution/avoid-mixed-content/simple-example.js
http://googlesamples.github.io/web-fundamentals/samples/discovery-and-distribution/avoid-mixed-content/style.css
http://googlesamples.github.io/web-fundamentals/samples/discovery-and-distribution/avoid-mixed-content/image-gallery-example.html
http://googlesamples.github.io/web-fundamentals/samples/discovery-and-distribution/avoid-mixed-content/xmlhttprequest-data.js

Mixed content warnings (passive):
http://googlesamples.github.io/web-fundamentals/samples/discovery-and-distribution/avoid-mixed-content/puppy-thumb.jpg

SSL errors:
https://storage.googleapis.com/code.getmdl.io/1.0.5/material.indigo-pink.min.css (SSL handshake failed)
https://storage.googleapis.com/code.getmdl.io/1.0.5/material.min.js (SSL handshake failed)
https://www.google-analytics.com/analytics.js (SSL handshake failed)
```
