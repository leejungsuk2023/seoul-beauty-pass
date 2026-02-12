import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');

// Parse CSV (handle quoted fields)
function parseCSV(content) {
  const lines = [];
  let current = [];
  let inQuotes = false;
  let field = '';
  for (let i = 0; i < content.length; i++) {
    const c = content[i];
    if (c === '"') {
      inQuotes = !inQuotes;
    } else if ((c === ',' || c === '\n') && !inQuotes) {
      current.push(field);
      field = '';
      if (c === '\n') {
        lines.push(current);
        current = [];
      }
    } else {
      field += c;
    }
  }
  if (field) current.push(field);
  if (current.length) lines.push(current);
  return lines;
}

const csvPath = path.join(process.env.HOME || '', 'Downloads', '서울 뷰티 패스 번역 - 태국어수정.csv');
const csvContent = fs.readFileSync(csvPath, 'utf8');
const rows = parseCSV(csvContent);

// Build map: key -> value (use column 4 if non-empty, else column 3)
const revisions = new Map();
for (let i = 1; i < rows.length; i++) {
  const [key, ko, thOrig, thRev] = rows[i];
  if (!key) continue;
  const value = (thRev && thRev.trim()) ? thRev.trim() : (thOrig || '').trim();
  revisions.set(key, value);
}

// Load th.ts and get the ko object structure to build updated th
let thCode = fs.readFileSync(path.join(root, 'src/app/locales/th.ts'), 'utf8');
thCode = thCode.replace(/^export const th = /, 'return ').replace(/;\s*$/, '');
const th = new Function(thCode)();

function setByPath(obj, pathStr, value) {
  const parts = pathStr.split('.');
  let current = obj;
  for (let i = 0; i < parts.length - 1; i++) {
    const p = parts[i];
    const nextIdx = parts[i + 1];
    const isArray = /^\d+$/.test(nextIdx);
    if (isArray && Array.isArray(current[p])) {
      current = current[p];
    } else if (!isArray && typeof current[p] === 'object' && current[p] !== null) {
      current = current[p];
    } else if (isArray) {
      const idx = parseInt(nextIdx);
      if (current[p] && Array.isArray(current[p]) && current[p][idx]) {
        current = current[p][idx];
        i++;
      }
    }
  }
  const last = parts[parts.length - 1];
  if (current && (last in current)) {
    current[last] = value;
  }
}

// Apply revisions
for (const [key, value] of revisions) {
  setByPath(th, key, value);
}

// Serialize th to JS/TS source
function serialize(obj, indent = '  ') {
  if (typeof obj === 'string') {
    return "'" + obj.replace(/\\/g, '\\\\').replace(/'/g, "\\'").replace(/\n/g, '\\n') + "'";
  }
  if (Array.isArray(obj)) {
    return '[\n' + obj.map((v, i) => 
      indent + (typeof v === 'object' ? serialize(v, indent + '  ') : serialize(v, indent))
    ).join(',\n') + '\n' + indent.slice(0, -2) + ']';
  }
  const entries = Object.entries(obj);
  return '{\n' + entries.map(([k, v]) => {
    const val = typeof v === 'string' ? serialize(v) : serialize(v, indent + '  ');
    return indent + k + ': ' + val;
  }).join(',\n') + '\n' + indent.slice(0, -2) + '}';
}

// Simpler: use JSON.stringify and fix for TS (quote style)
function toSource(obj) {
  if (typeof obj === 'string') {
    return `'${obj.replace(/\\/g, '\\\\').replace(/'/g, "\\'").replace(/\n/g, '\\n')}'`;
  }
  if (Array.isArray(obj)) {
    return '[' + obj.map(v => toSource(v)).join(', ') + ']';
  }
  const pairs = Object.entries(obj).map(([k, v]) => `${k}: ${toSource(v)}`);
  return '{ ' + pairs.join(', ') + ' }';
}

// Better: format like the original file - multi-line with proper indentation
function formatValue(val, indent) {
  if (typeof val === 'string') {
    const escaped = val.replace(/\\/g, '\\\\').replace(/'/g, "\\'").replace(/\n/g, '\\n');
    return `'${escaped}'`;
  }
  if (Array.isArray(val)) {
    return '[\n' + val.map((v, i) => {
      if (typeof v === 'object' && v !== null && !Array.isArray(v)) {
        return indent + '  {\n' + Object.entries(v).map(([k, v2]) => 
          indent + '    ' + k + ': ' + formatValue(v2, indent + '    ')
        ).join(',\n') + '\n' + indent + '  }';
      }
      return indent + '  ' + formatValue(v, indent + '  ');
    }).join(',\n') + '\n' + indent + ']';
  }
  if (typeof val === 'object' && val !== null) {
    return '{\n' + Object.entries(val).map(([k, v]) => 
      indent + '  ' + k + ': ' + formatValue(v, indent + '  ')
    ).join(',\n') + '\n' + indent + '}';
  }
  return String(val);
}

// Actually the simplest: use a proper JS object stringify that produces readable output
// Let me try a different approach - use replace for each changed value
// First, let's get the list of all keys and values from the CSV
// Then we do a single replace in the th.ts - but that's complex for nested structure.

// Simpler approach: build the entire th object as a JS structure, then use a formatter
// Node's util.inspect could work but output format may differ

// Let me just do manual search_replace for each key. Given the number, I'll do it in batches.
// Actually - the best approach: read th.ts, for each key in revisions, find the exact line
// and replace. The th.ts has one assignment per line for leaf values. So I can do:
// For "nav.shop": find "shop: 'ร้านค้า'" in nav section and replace with "shop: 'NEW'"
// The problem is the same translation might appear in multiple places.

// Safer: build the full output. I'll use a recursive function to output the object.
function stringifyObj(obj, depth = 0) {
  const pad = '  '.repeat(depth);
  const pad2 = '  '.repeat(depth + 1);
  if (typeof obj === 'string') {
    return `'${obj.replace(/\\/g, '\\\\').replace(/'/g, "\\'").replace(/\n/g, '\\n')}'`;
  }
  if (Array.isArray(obj)) {
    const items = obj.map((v, i) => {
      if (typeof v === 'object' && v !== null && !Array.isArray(v)) {
        return pad2 + '{\n' + Object.entries(v).map(([k, v2]) =>
          pad2 + '  ' + k + ': ' + stringifyObj(v2, depth + 2)
        ).join(',\n') + '\n' + pad2 + '}';
      }
      return pad2 + stringifyObj(v, depth + 1);
    });
    return '[\n' + items.join(',\n') + '\n' + pad + ']';
  }
  if (typeof obj === 'object' && obj !== null) {
    const entries = Object.entries(obj).map(([k, v]) =>
      pad2 + k + ': ' + stringifyObj(v, depth + 1)
    );
    return '{\n' + entries.join(',\n') + '\n' + pad + '}';
  }
  return String(obj);
}

// Fix setByPath - it has bugs. Let me use a simpler recursive setter.
function setNested(obj, pathStr, value) {
  const parts = pathStr.split('.');
  let cur = obj;
  const last = parts[parts.length - 1];
  let i = 0;
  while (i < parts.length - 1) {
    const p = parts[i];
    const next = parts[i + 1];
    if (Array.isArray(cur?.[p]) && /^\d+$/.test(next)) {
      if (i + 1 === parts.length - 1) {
        cur = cur[p];
        cur[parseInt(next)] = value;
        return;
      }
      cur = cur[p][parseInt(next)];
      i += 2;
    } else {
      cur = cur[p];
      i++;
    }
  }
  if (cur && typeof cur === 'object') {
    if (/^\d+$/.test(last) && Array.isArray(cur)) {
      cur[parseInt(last)] = value;
    } else if (last in cur) {
      cur[last] = value;
    }
  }
}

// Re-apply with correct setter
for (const [key, value] of revisions) {
  try {
    setNested(th, key, value);
  } catch (e) {
    console.error('Failed for key:', key, e.message);
  }
}

const out = 'export const th = ' + stringifyObj(th) + ';\n';
fs.writeFileSync(path.join(root, 'src/app/locales/th.ts'), out, 'utf8');
console.log('Applied', revisions.size, 'Thai translations.');
