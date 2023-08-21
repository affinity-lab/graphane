"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BasicCrud = void 0;
const graphane_error_1 = __importDefault(require("@src/error/graphane-error"));
const typeorm_1 = require("typeorm");
class BasicCrud {
    constructor(entity, getDataSource) {
        this.entity = entity;
        this.getDataSource = getDataSource;
    }
    ;
    async readAll(options) {
        return await this.entity.find(options);
    }
    ;
    async readOneOrFail(options) {
        return await this.entity.findOneOrFail(options);
    }
    ;
    async readOne(options) {
        return await this.entity.findOne(options);
    }
    ;
    async readOneByIdOrFail(id) {
        return await this.entity.findOneByOrFail({ id });
    }
    ;
    async readOneById(id) {
        return await this.entity.findOneBy({ id });
    }
    ;
    async create(data) {
        return await this.entity.create(await this.loadRelations(data)).save();
    }
    ;
    async update(id, data) {
        let value = await this.entity.findOneByOrFail({ id });
        return Object.assign(value, await this.loadRelations(data)).save();
    }
    ;
    async delete(id) {
        let value = await this.entity.findOneByOrFail({ id });
        await value.remove();
        return true;
    }
    ;
    async loadRelations(data) {
        let rel;
        for (rel of this.getDataSource().getMetadata(this.entity).relations) {
            const target = rel.inverseEntityMetadata.target;
            if (typeof target === "string") {
                throw graphane_error_1.default.crud.unrealEntityTarget(rel.inverseEntityMetadata.target);
            }
            const inverseEntity = target;
            if (rel.isOneToOne || rel.isManyToOne) {
                if (data[rel.propertyName]) {
                    data[rel.propertyName] = await inverseEntity.findOneByOrFail({ id: data[rel.propertyName] });
                }
            }
            else if (rel.isOneToMany || rel.isManyToMany) {
                if (data[rel.propertyName]) {
                    data[rel.propertyName] = await inverseEntity.findBy({ id: (0, typeorm_1.In)(data[rel.propertyName]) });
                }
            }
            else {
                throw graphane_error_1.default.crud.badRelationType();
            }
        }
        return data;
    }
    ;
}
exports.BasicCrud = BasicCrud;
