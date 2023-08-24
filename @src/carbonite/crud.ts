import GraphaneError from "../error/graphane-error";
import {BaseEntity, DataSource, DeepPartial, FindManyOptions, FindOneOptions, FindOptionsWhere, In} from "typeorm";
import {RelationMetadata} from "typeorm/metadata/RelationMetadata";
import Atom from "./atom";
import Storage from "../util/storage";


/**
 * Same as DeepPartial<T> but it takes in number(s) (to be used as BaseEntity id(s)) instead of BaseEntity(s).
 */
export type PartialAtom<T> =
	T
	| (T extends Array<infer U> ? PartialAtom<U>[] : T extends Map<infer K, infer V> ? Map<PartialAtom<K>, PartialAtom<V>> : T extends Set<infer M> ? Set<PartialAtom<M>> : T extends object ? { [K in keyof T]?: (T[K] extends BaseEntity ? number : T[K] extends BaseEntity | undefined ? number | undefined : T[K] extends BaseEntity[] ? number[] : T[K] extends BaseEntity[] | undefined ? number[] | undefined : PartialAtom<T[K]>) } : T);

export class BasicCrud<Entity extends Atom> {
	constructor(
		private readonly entity: {new(): Entity} & typeof Atom,
		private readonly dataSourceStorage: Storage<DataSource>,
		private readonly storageKey?: string
	) {
	};

	async readAll(options?: FindManyOptions<Entity>): Promise<Entity[]> {
		return await this.entity.find<Entity>(options);
	};

	async readOne(options: FindOneOptions<Entity>): Promise<Entity | undefined> {
		return await this.entity.findOne<Entity>(options) ?? undefined;
	};

	async readOneOrFail(options: FindOneOptions<Entity>): Promise<Entity> {
		return await this.entity.findOneOrFail<Entity>(options);
	};

	async readOneBy(options: FindOptionsWhere<Entity>): Promise<Entity | undefined> {
		return await this.entity.findOneBy<Entity>(options) ?? undefined;
	};

	async readOneByOrFail(options: FindOptionsWhere<Entity>): Promise<Entity | undefined> {
		return await this.entity.findOneByOrFail<Entity>(options) ?? undefined;
	};

	async readOneById(id: number): Promise<Entity | undefined> {
		return await this.entity.findOneBy<Entity>({id} as FindOptionsWhere<Entity>) ?? undefined;
	};

	async readOneByIdOrFail(id: number): Promise<Entity> {
		return await this.entity.findOneByOrFail<Entity>({id} as FindOptionsWhere<Entity>);
	};

	async create(data: PartialAtom<Entity>): Promise<Entity> {
		return await this.entity.create<Entity>(await this.loadRelations(data)).save();
	};

	async update(id: number, data: PartialAtom<Entity>): Promise<Entity> {
		let value: Entity = await this.entity.findOneByOrFail<Entity>({id} as FindOptionsWhere<Entity>);
		return Object.assign(value, await this.loadRelations(data)).save();
	};

	async delete(id: number): Promise<true> {
		let value: Entity = await this.entity.findOneByOrFail<Entity>({id} as FindOptionsWhere<Entity>);
		await value.remove();
		return true;
	};

	private async loadRelations(data: Record<string, any>): Promise<DeepPartial<Entity>> {
		let rel: RelationMetadata;
		for (rel of this.dataSourceStorage.getOrFail(this.storageKey).getMetadata(this.entity).relations) {
			const target: string | Function = rel.inverseEntityMetadata.target;
			if (typeof target === "string") {
				throw GraphaneError.crud.unrealEntityTarget(rel.inverseEntityMetadata.target);
			}
			const inverseEntity = target as typeof Atom;
			if (rel.isOneToOne || rel.isManyToOne) {
				if (data[rel.propertyName]) {
					data[rel.propertyName] = await inverseEntity.findOneByOrFail({id: data[rel.propertyName]});
				}
			} else if (rel.isOneToMany || rel.isManyToMany) {
				if (data[rel.propertyName]) {
					data[rel.propertyName] = await inverseEntity.findBy({id: In(data[rel.propertyName])});
				}
			} else {
				throw GraphaneError.crud.badRelationType();
			}
		}
		return data as DeepPartial<Entity>;
	};

	// async softDelete(id: number): Promise<true> {
	//     let value: Entity = await this.entity.findOneByOrFail<Entity>({id} as FindOptionsWhere<Entity>);
	//     await value.softRemove();
	//     return true;
	// };
}
