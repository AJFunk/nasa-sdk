import {
  expect,
  assert,
} from 'chai';
import { addPath } from 'app-module-path';
import path from 'path';

global.expect = expect;
global.assert = assert;

addPath(path.resolve(__dirname, '../src'));
