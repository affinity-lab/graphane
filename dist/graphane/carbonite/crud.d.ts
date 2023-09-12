import { BaseEntity, DataSource, FindManyOptions, FindOneOptions, FindOptionsWhere } from "typeorm";
import { Atom } from "./atom";
import { Storage } from "../service-interfaces";
/** Same as DeepPartial<T> but it takes in number(s) (to be used as BaseEntity id(s)) instead of BaseEntity(s)*/
export type PartialAtom<T> = T | (T extends Array<infer U> ? PartialAtom<U>[] : T extends Map<infer K, infer V> ? Map<PartialAtom<K>, PartialAtom<V>> : T extends Set<infer M> ? Set<PartialAtom<M>> : T extends object ? {
    [K in keyof T]?: (T[K] extends BaseEntity ? number : T[K] extends BaseEntity | undefined ? number | undefined : T[K] extends BaseEntity[] ? number[] : T[K] extends BaseEntity[] | undefined ? number[] | undefined : PartialAtom<T[K]>);
} : T);
export declare class BasicCrud<Entity extends Atom> {
    private readonly entity;
    private readonly dataSourceStorage;
    private readonly storageKey?;
    constructor(entity: {
        new (): Entity;
    } & typeof Atom, dataSourceStorage: Storage<DataSource>, storageKey?: string | undefined);
    readAll(options?: FindManyOptions<Entity>): Promise<Entity[]>;
    readOne(options: FindOneOptions<Entity>): Promise<Entity | undefined>;
    readOneOrFail(options: FindOneOptions<Entity>): Promise<Entity>;
    readOneBy(options: FindOptionsWhere<Entity>): Promise<Entity | undefined>;
    readOneByOrFail(options: FindOptionsWhere<Entity>): Promise<Entity>;
    readOneById(id: number): Promise<Entity | undefined>;
    readOneByIdOrFail(id: number): Promise<Entity>;
    create(data: PartialAtom<Entity>): Promise<Entity>;
    update(id: number, data: PartialAtom<Entity>): Promise<Entity>;
    delete(id: number): Promise<true>;
    private loadRelations;
}
