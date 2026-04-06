const https = require('https');

https.get('https://pet-checker.vercel.app/assets/index-BY5NLXHy.js', (res) => {
  let data = '';
  res.on('data', (chunk) => {
    data += chunk;
  });
  res.on('end', () => {
    // Look for generateContent and the surrounding 500 characters
    const regex = /.{0,500}generateContent.{0,500}/gi;
    const matches = data.match(regex);
    if (matches) {
      console.log("Found generateContent references:");
      matches.slice(0, 3).forEach(m => console.log(m));
    }
  });
}).on('error', (err) => {
  console.error(err);
});
