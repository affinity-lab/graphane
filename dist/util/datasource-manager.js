"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.setDataSource = exports.getDataSource = void 0;
const typeorm_1 = require("typeorm");
const no_typeorm_data_source_1 = __importDefault(require("./no-typeorm-data-source"));
let dataSources = {};
function getDataSource(key = "default") {
    let temp = dataSources[key];
    if (temp) {
        return temp;
    }
    throw new no_typeorm_data_source_1.default(key);
}
exports.getDataSource = getDataSource;
async function setDataSource(key, ormConfig) {
    dataSources[key] = await new typeorm_1.DataSource(ormConfig).initialize();
}
exports.setDataSource = setDataSource;
