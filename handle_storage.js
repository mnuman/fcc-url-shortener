var allUrls = [];
const baseUrl = 'https://fcc-url-shortener-mn.herokuapp.com/';

/* Function to store the passed URL and return the shortened URL
*/
function store(aUrl) {
  // Assume single threaded ... in practice, this will be a problen :-(
  allUrls[allUrls.length] = aUrl;
  return baseUrl + (allUrls.length-1);
}

/* Retrieve the original URL from the shorted version */
function retrieve(urlNo) {
  if (isNaN(urlNo) || !(allUrls[urlNo])) {
    return null;
  }
  return allUrls[urlNo];
}

module.exports = {
  store: store,
  retrieve: retrieve
};