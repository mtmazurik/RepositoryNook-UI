export class NameValuePair {
    name: string;
    value: string;
}
export class Repository {
    _id: string;
    key: string;
    tags: string[];
    createdDate: string;
    createdBy: string;
    modifiedDate: string;
    modifiedBy: string;
    app: string;
    repository: string;
    collection: string;
    validate: boolean;
    schemaUri: string;
    data: string;
}
