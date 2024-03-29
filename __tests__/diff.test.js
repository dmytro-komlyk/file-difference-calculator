import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import genDiff from '../src/index';

const typeFormat = ['json', 'yml', 'ini'];
const styleFormat = ['stylish', 'plain', 'json'];

const filename = fileURLToPath(import.meta.url);
const getPath = (fileName, type) => path.join(path.dirname(filename), '..', `__fixtures__/${fileName}.${type}`);

const getFilesPaths = (type) => (
  [getPath('before', type), getPath('after', type)]
);

const readResultFile = (fileName, type) => fs.readFileSync(getPath(fileName, type), 'utf-8');

styleFormat.forEach((style) => {
  test.each(typeFormat)(`diff_${style}_%s`, (type) => {
    const [before, after] = getFilesPaths(type);
    const diff = genDiff(before, after, style);
    expect(diff).toEqual(readResultFile(style, 'txt'));
  });
});
