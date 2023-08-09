import {DataSource} from "typeorm";
import {DataSourceOptions} from "typeorm/data-source/DataSourceOptions";
import NoTypeormDataSource from "./no-typeorm-data-source";


let dataSources: Record<string, DataSource> = {};

export function getDataSource(key: string = "default"): DataSource | never {
    let temp: DataSource = dataSources[key];
    if (temp) {
        return temp;
    }
    throw new NoTypeormDataSource(key);
}

export async function setDataSource(key: string, ormConfig: DataSourceOptions): Promise<void> {
    dataSources[key] = await new DataSource(ormConfig).initialize();
}
