import BaseError from "../base-error/BaseError";


export default class NoTypeormDataSource extends BaseError {
    constructor(dataSourceName: string) {
        super(
            `Datasource: ${dataSourceName} is not set.`,
            {
                dataSourceName
            }
        );
    };
}
