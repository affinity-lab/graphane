"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BasicCrud = void 0;
const graphane_error_1 = require("../graphane-error");
const typeorm_1 = require("typeorm");
class BasicCrud {
    constructor(entity, dataSourceStorage, storageKey) {
        this.entity = entity;
        this.dataSourceStorage = dataSourceStorage;
        this.storageKey = storageKey;
    }
    ;
    async readAll(options) {
        return await this.entity.find(options);
    }
    ;
    async readOne(options) {
        return await this.entity.findOne(options) ?? undefined;
    }
    ;
    async readOneOrFail(options) {
        return await this.entity.findOneOrFail(options);
    }
    ;
    async readOneBy(options) {
        return await this.entity.findOneBy(options) ?? undefined;
    }
    ;
    async readOneByOrFail(options) {
        return await this.entity.findOneByOrFail(options);
    }
    ;
    async readOneById(id) {
        return await this.entity.findOneBy({ id }) ?? undefined;
    }
    ;
    async readOneByIdOrFail(id) {
        return await this.entity.findOneByOrFail({ id });
    }
    ;
    async create(data) {
        return await this.entity.create(await this.loadRelations(data)).save();
    }
    ;
    async update(id, data) {
        return Object.assign(await this.entity.findOneByOrFail({ id }), await this.loadRelations(data)).save();
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
        for (rel of this.dataSourceStorage.getOrFail(this.storageKey).getMetadata(this.entity).relations) {
            const target = rel.inverseEntityMetadata.target;
            if (typeof target === "string") {
                throw graphane_error_1.GraphaneError.crud.unrealEntityTarget(rel.inverseEntityMetadata.target);
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
                throw graphane_error_1.GraphaneError.crud.badRelationType();
            }
        }
        return data;
    }
    ;
}
exports.BasicCrud = BasicCrud;
