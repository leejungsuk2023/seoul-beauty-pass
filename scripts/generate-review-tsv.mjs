import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');

// Read ko.ts and extract the ko object by eval (it's valid JS)
let koCode = fs.readFileSync(path.join(root, 'src/app/locales/ko.ts'), 'utf8');
koCode = koCode.replace(/^export const ko = /, 'return ').replace(/;\s*$/, '');
const ko = new Function(koCode)();

function flatten(obj, prefix = '') {
  const result = {};
  for (const [key, value] of Object.entries(obj)) {
    const fullKey = prefix ? `${prefix}.${key}` : key;
    if (value !== null && typeof value === 'object' && !Array.isArray(value)) {
      if (value.question !== undefined && value.answer !== undefined) {
        result[`${fullKey}.question`] = value.question;
        result[`${fullKey}.answer`] = value.answer;
      } else {
        Object.assign(result, flatten(value, fullKey));
      }
    } else if (Array.isArray(value)) {
      value.forEach((v, i) => {
        if (typeof v === 'string') {
          result[`${fullKey}.${i}`] = v;
        } else if (v && typeof v === 'object' && v.question !== undefined && v.answer !== undefined) {
          result[`${fullKey}.${i}.question`] = v.question;
          result[`${fullKey}.${i}.answer`] = v.answer;
        }
      });
    } else {
      result[fullKey] = String(value ?? '');
    }
  }
  return result;
}

const koFlat = flatten(ko);

function getKo(key) {
  return koFlat[key] ?? '';
}

// Process TH file
const thLines = fs.readFileSync(path.join(root, 'th-translations-for-sheets.tsv'), 'utf8').trim().split('\n');
const thOut = ['키\t한국어\t태국어\t번역(감수)'];
for (let i = 1; i < thLines.length; i++) {
  const parts = thLines[i].split('\t');
  const key = parts[0];
  const thVal = parts.slice(1).join('\t') || '';
  const koVal = getKo(key);
  thOut.push([key, koVal, thVal, ''].join('\t'));
}
fs.writeFileSync(path.join(root, 'th-translations-for-sheets.tsv'), thOut.join('\n') + '\n', 'utf8');

// Process VI file
const viLines = fs.readFileSync(path.join(root, 'vi-translations-for-sheets.tsv'), 'utf8').trim().split('\n');
const viOut = ['키\t한국어\t베트남어\t번역(감수)'];
for (let i = 1; i < viLines.length; i++) {
  const parts = viLines[i].split('\t');
  const key = parts[0];
  const viVal = parts.slice(1).join('\t') || '';
  const koVal = getKo(key);
  viOut.push([key, koVal, viVal, ''].join('\t'));
}
fs.writeFileSync(path.join(root, 'vi-translations-for-sheets.tsv'), viOut.join('\n') + '\n', 'utf8');

console.log('Done. th-translations-for-sheets.tsv and vi-translations-for-sheets.tsv updated.');
