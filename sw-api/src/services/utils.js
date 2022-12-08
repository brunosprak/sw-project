import https from 'https';
import http from 'http';
import fs from 'fs';
import { isbn as ISBN } from 'simple-isbn';

const CANON_REGEX = /\|can\|/;
const LEGENDS_REGEX =
  /\|leg\||\|pre\||\|btr\||\|old\||\|imp\||\|reb\||\|new\||\|njo\||\|lgc\||\|inf\|/;

const ERA_LIMITS = [
  { canonicity: 'canon', start: 30, end: Number.POSITIVE_INFINITY, acronym: 'rotfo' },
  { canonicity: 'canon', start: 4, end: 30, acronym: 'tnr' },
  { canonicity: 'canon', start: -3, end: 4, acronym: 'aor' },
  { canonicity: 'canon', start: -18, end: -3, acronym: 'rote' },
  { canonicity: 'canon', start: -50, end: -18, acronym: 'fotj' },
  { canonicity: 'canon', start: Number.NEGATIVE_INFINITY, end: -50, acronym: 'thr' },
];

export const sleep = (ms) =>
  new Promise((resolve) => {
    setTimeout(resolve, ms);
  });

export const fetchUrlAsText = async (url) => {
  const response = await fetch(url);
  const pageText = await response.text();
  return pageText;
};

export const toIsbn10 = (isbn) => {
  if (!isbn) {
    return null;
  }
  let isbn10;
  if (ISBN.isValidIsbn10(isbn)) {
    isbn10 = isbn;
  } else if (ISBN.isValidIsbn13(isbn)) {
    isbn10 = ISBN.toIsbn10(isbn);
  }
  return isbn10;
};

export const toIsbn13 = (isbn) => {
  if (!isbn) {
    return null;
  }
  let isbn13;
  if (ISBN.isValidIsbn13(isbn)) {
    isbn13 = isbn;
  } else if (ISBN.isValidIsbn10(isbn)) {
    isbn13 = ISBN.toIsbn13(isbn);
  }
  return isbn13;
};

export const saveToFile = (content, filePath) => {
  fs.writeFileSync(filePath, content);
};

export const mkdirSyncNested = (dir) => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
};

export const isEmpty = (object) => Object.keys(object).length === 0;

export const mergeObjects = (object1, object2) => {
  if ((!object1 || isEmpty(object1)) && (!object2 || isEmpty(object2))) {
    return {};
  }
  if (!object1 || isEmpty(object1)) {
    return object2;
  }
  if (!object2 || isEmpty(object2)) {
    return object1;
  }

  const isObject1Map = typeof object1 === 'object' && object1 !== null && !Array.isArray(object1);
  const isObject2Map = typeof object2 === 'object' && object2 !== null && !Array.isArray(object2);

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

  throw Error('Incompatible types to merge!');
};

export const createEtagFromStats = (fsStats) => {
  if (!fsStats) {
    throw Error('Stats is null!');
  }
  const mtime = fsStats.mtime.getTime().toString(16);
  const size = fsStats.size.toString(16);
  const etag = `W/"${size}-${mtime}"`;
  return etag;
};

export const downloadUrl = (url, dest, cb) => {
  const file = fs.createWriteStream(dest);

  let httpLib = http;

  if (url.toUpperCase().indexOf('HTTPS://') !== -1) {
    httpLib = https;
  }

  const request = httpLib.get(url, (response) => {
    // check if response is success
    if (response.statusCode !== 200) {
      return cb(`Response status was ${response.statusCode}`);
    }
    response.pipe(file);
    return false;
  });

  // close() is async, call cb after close completes
  file.on('finish', () => file.close(cb));

  // check for request error too
  request.on('error', (err) => {
    fs.unlink(dest, () => cb(err.message)); // delete the (partial) file and then return the error
  });

  file.on('error', (err) => {
    // Handle errors
    fs.unlink(dest, () => cb(err.message)); // delete the (partial) file and then return the error
  });
};

export const downloadUrlx = async (url, dest, cb) => {
  const file = fs.createWriteStream(dest);

  let httpLib = http;

  if (url.toUpperCase().indexOf('HTTPS://') !== -1) {
    httpLib = https;
  }

  return new Promise((resolve, reject) => {
    const request = httpLib
      .get(url, (response) => {
        // check if response is success
        if (response.statusCode !== 200) {
          return cb(`Response status was ${response.statusCode}`);
        }
        response.pipe(file);
        // response.unpipe(file);
        file.on('finish', () => {
          file.close(cb); // close() is async, call cb after close completes.
          resolve();
        });
        // check for request error too
        request.on('error', (err) => {
          fs.unlink(dest);
          reject();
          cb(err.message);
        });
        return false;
      })
      .on('error', (err) => {
        // Handle errors
        fs.unlink(dest); // Delete the file async. (But we don't check the result)
        if (cb) cb(err.message);
        reject();
      });
  });
};

export const timelineToEraByUnit = (timeline, unit, multipler) => {
  const divisionBby = timeline.split(unit);

  if (divisionBby && divisionBby.length >= 2) {
    const divisionByDash = divisionBby[0].split('-');
    const onlyNumbersRegex = /\D+/;
    return multipler * Number.parseInt(divisionByDash[0].replace(onlyNumbersRegex, ''), 10);
  }

  return null;
};

const timelineToYearCanon = (timeline) => {
  if (!timeline) {
    return '';
  }
  let year = timelineToEraByUnit(timeline, 'BBY', -1);
  if (!year) {
    year = timelineToEraByUnit(timeline, 'ABY', +1);
  }
  return year;
};

export const templateTopToCanonicityLegends = (templateTop = '') => {
  let eraNameFound = templateTop.match(LEGENDS_REGEX);
  if (!eraNameFound) {
    return '';
  }
  eraNameFound = eraNameFound[0].replaceAll('|', '');

  if (!eraNameFound) {
    return '';
  }

  return `leg/${eraNameFound}`;
};

export const timelineToEra = (templateTop, canonicity, timeline) => {
  if (canonicity === 'legends') {
    return templateTopToCanonicityLegends(templateTop);
  }
  if (canonicity === 'canon') {
    const year = timelineToYearCanon(timeline);

    if (!year) {
      return '';
    }

    const eraName = ERA_LIMITS.find((era) => year >= era.start && year < era.end);

    if (!eraName) {
      throw Error('Canon era not found!');
    }

    return `can/${eraName.acronym}`;
  }
  return '';
};

export const templateTopToCanonicityAndEra = (templateTop, timeline) => {
  let canonicity = 'other';

  if (CANON_REGEX.test(templateTop)) {
    canonicity = 'canon';
    return [canonicity, timelineToEra(templateTop, canonicity, timeline)];
  }
  if (LEGENDS_REGEX.test(templateTop)) {
    canonicity = 'legends';
    return [canonicity, timelineToEra(templateTop, canonicity, timeline)];
  }
  return [canonicity, ''];
};
