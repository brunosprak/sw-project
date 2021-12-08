import https from 'https';
import http from 'http';
import fs  from 'fs';

export function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export const fetchUrlAsText = async (url) => {
  const response = await fetch(url);
  const pageText = await response.text();
  return pageText;
};

export function saveToFile(content, filePath) {
  fs.writeFileSync(filePath, content);
}

export function isEmpty(object) {
  return Object.keys(object).length === 0;
}
export function mergeObjects(object1, object2) {
  if ((!object1 || isEmpty(object1)) && (!object2 || isEmpty(object2))) {
    return {};
  }
  if (!object1 || isEmpty(object1)) {
    return object2;
  }
  if (!object2 || isEmpty(object2)) {
    return object1;
  }

  const isObject1Map =
    typeof object1 === 'object' && object1 !== null && !Array.isArray(object1);
  const isObject2Map =
    typeof object2 === 'object' && object2 !== null && !Array.isArray(object2);

  if (isObject1Map && isObject2Map) {
    return { ...object1, ...object2 };
  }

  if (Array.isArray(object1) && Array.isArray(object2)) {
    return object1.concat(object2);
  }

  if (Array.isArray(object1) && isObject2Map) {
    return object1.push(object2);
  }

  if (Array.isArray(object2) && isObject1Map) {
    return object2.push(object1);
  }

  throw Exception('Incompatible types to merge!');
}

export const downloadUrl = async function (url, dest, cb) {
  var file = fs.createWriteStream(dest);

  let httpLib = http;

  if (url.toUpperCase().indexOf('HTTPS://') != -1) {
    httpLib = https;
  }

  return new Promise((resolve, reject) => {
    var request = httpLib
      .get(url, function (response) {
        // check if response is success
        if (response.statusCode !== 200) {
          return cb('Response status was ' + response.statusCode);
        }
        response.pipe(file);
        file.on('finish', function () {
          file.close(cb); // close() is async, call cb after close completes.
          resolve();
        });
        // check for request error too
        request.on('error', (err) => {
          fs.unlink(dest);
          reject();
          cb(err.message);
          return;
        });
      })
      .on('error', function (err) {
        // Handle errors
        fs.unlink(dest); // Delete the file async. (But we don't check the result)
        if (cb) cb(err.message);
        reject();
      });
  });
};
