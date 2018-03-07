'use strict';

import chai from 'chai';
import mongoose from 'mongoose';
const expect = chai.expect;

chai.use(require('chai-http'));

import expressSetting from '../src/app';
import db from '../src/config/database';
let app;
let token;

global.app = app;
global.mongoose = mongoose;
global.expressSetting = expressSetting;
global.request = chai.request;
global.expect = chai.expect;
global.token = token;
