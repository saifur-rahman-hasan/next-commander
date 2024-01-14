import ElasticsearchDBAdapter from "@/database/adapters/Elasticsearch/ElasticsearchDBAdapter";

export default abstract class ESBaseRepository {
	abstract es_index: string
	public es_client: ElasticsearchDBAdapter

	constructor() {
		this.es_client = new ElasticsearchDBAdapter(); // Creating a new instance of ElasticsearchDBAdapter.
	}
	// Define execute as an abstract method
	abstract create(data: any): any;

	abstract read(id: any): any;

	abstract update(id: any, data: any, query?: object): any;

	abstract delete(id: any, query?: object): any;

	abstract findById(id: any): any;

	abstract findByQuery(query: object): any;

	abstract getByQuery(query: object): any;
}