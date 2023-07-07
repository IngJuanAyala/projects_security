require('dotenv').config({ path: './.envMock' });
const chai = require('chai');
const expect = chai.expect;
const sinon = require('sinon');
process.env.NODE_ENV = 'development';
global.chai = chai;
global.expect = expect;
global.sinon = sinon;
