import { DataSource } from "typeorm";
import { DataSourceOptions } from "typeorm/data-source/DataSourceOptions";
export declare function getDataSource(key?: string): DataSource | never;
export declare function setDataSource(key: string, ormConfig: DataSourceOptions): Promise<void>;
