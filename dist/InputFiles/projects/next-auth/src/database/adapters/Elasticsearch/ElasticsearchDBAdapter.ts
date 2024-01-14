import { Client } from "@elastic/elasticsearch";
import collect from "collect.js";

class ElasticsearchDBAdapter {
	private readonly indexPrefix: string;
	public client: Client;
	private indexName: any;

	/**
	 * Construct the ElasticService class
	 *
	 * @param indexPrefix
	 */
	constructor(indexPrefix = 'advertising_england') {
		this.indexPrefix = indexPrefix
		this.client = new Client({
			node: 'add your elastic node',
		})

		this.indexName = null
	}

	async setIndexName(indexName: string) {
		const indexExist = await this.indexExists(indexName)

		if(indexExist){
			this.indexName = indexName
		}else{
			this.indexName = null
		}

		return this
	}

	/**
	 * Check the Given indexName is exists on connected ES
	 *
	 * @param indexName
	 * @param forceCreate
	 */
	async indexExists(indexName: string, forceCreate = false) {
		try {
			const index = await this.client.indices.exists({
				index: `${this.indexPrefix}${indexName}`,
			})

			return Promise.resolve(true)
		}catch (e) {
			if(forceCreate){
				await this.createIndex(indexName)
				return Promise.reject(true)
			}
			return Promise.reject(false)
		}
	}

	/**
	 * Create new Index
	 *
	 * @param indexName
	 * @param mapping
	 */
	async createIndex(indexName: string, mapping = null) {
		try {
			if(mapping){
				const indexSettings = {
					mappings: {
						properties: mapping
					}
				};

				return await this.client.indices.create({
					index: `${this.indexPrefix}${indexName}`,
					settings: indexSettings
				});

			}else{
				return await this.client.indices.create({
					index: `${this.indexPrefix}${indexName}`,
				});
			}


		}catch (e) {

		}
	}

	/**
	 * Create a new Document in to the given indexName on connected ES
	 *
	 * @param indexName
	 * @param document
	 * @returns {Promise<WriteResponseBase>}
	 */
	async createDocument(indexName: string, document: any) {
		return await this.client.index({
			index: `${this.indexPrefix}${indexName}`,
			body: document,
		});
	}

	async createDocumentById(data: any) {
		return await this.client.index({
			id: data?.id,
			index: `${this.indexPrefix}${data?.indexName}`,
			body: data?.document,
		});
	}

	/**
	 *
	 * @param indexName
	 * @param document
	 * @returns {Promise<unknown>}
	 */
	async createAndGetDocument(indexName: string, document: any) {
		try {
			const indexKey = `${this.indexPrefix}${indexName}`
			const documentBody = {
				...document,
				createdAt: document?.createdAt || new Date(),
				updatedAt: document?.updatedAt || new Date()
			}

			let createObject = {
				index: indexKey,
				body: documentBody,
			}

			const createResult = await this.client.index(createObject);

			// Fetch the inserted document from Elasticsearch and return it in the response
			const createdDoc: any = await this.findDocumentById(indexName, createResult._id)

			return Promise.resolve(createdDoc)

		}catch (e: any) {
			console.log('Failed to create new document', e.message)
			return Promise.reject(e)
		}
	}

	/**
	 * Searches for a document in an Elasticsearch index by its ID and returns the first matching record.
	 * @param {string} indexName - The name of the Elasticsearch index.
	 * @param {string} id - The ID of the document to find.
	 * @returns {Promise<SearchResponse<unknown>>} - A promise that resolves to the search response containing the first matching record.
	 */
	async findDocumentById(indexName: string, id: string) {
		try {
			const queryResult = await this.client.get({
				index: `${this.indexPrefix}${indexName}`,
				id,
			});

			const promiseData = this.getFormattedResult(queryResult)
			return Promise.resolve(promiseData)
		}catch (e) {
			return Promise.resolve(null)
		}
	}

	/**
	 *
	 * @param indexName
	 * @param query
	 * @returns {Promise<GetGetResult<unknown>>}
	 */
	async execQuery(indexName: string, query: any) {
		return await this.client.search({
			index: `${this.indexPrefix}${indexName}`,
			body: query
		});
	}

	// ElasticSearch Query Helper Methods
	/**
	 * elasticBuildQuery
	 *
	 * @param filter
	 * @param must
	 * @param mustNot
	 * @param should
	 * @param sortBy
	 * @param orderBy
	 * @param from
	 * @param size
	 * @param timeRange
	 * @returns {{size: number, query: {bool: {filter: *[], should: *[], must_not: *[], must: *[]}}, from: number, sort: *[]}}
	 */
	elasticBuildQuery(
		filter?: any,
		must?: any,
		mustNot?: any,
		should?: any,
		sortBy?: any,
		orderBy?: any,
		from?: any,
		size?: number,
		timeRange?: any
	) {
		const query = {
			"query": {
				"bool": {
					"must": [],
					"filter": [],
					"should": [],
					"must_not": []
				}
			},
			"sort": [],
			"from": from || 0,
			"size": size || 10
		};

		// Add date range query
		// Add date range query
		if (timeRange) {
			const { dateFrom, dateTo, fieldName } = timeRange;
			const dateTimeField = fieldName ? fieldName : "date";
			// @ts-ignore
			query.query.bool.must.push({
				"range": {
					[dateTimeField]: {
						"gte": dateFrom || "1900-01-01",
						"lte": dateTo || "2100-12-31"
					}
				}
			});
		}

		// Add filter queries
		if (filter) {
			for (const [fieldName, fieldValue] of Object.entries(filter)) {
				// @ts-ignore
				query.query.bool.filter.push({
					"match": {
						[fieldName]: fieldValue
					}
				});
			}
		}

		// Add must query
		if (must) {
			for (const [fieldName, fieldValue] of Object.entries(must)) {
				// @ts-ignore
				query.query.bool.must.push({
					"match": {
						[fieldName]: fieldValue
					}
				});
			}
		}

		// Add must_not queries
		if (mustNot) {
			for (const [fieldName, fieldValue] of Object.entries(mustNot)) {
				// @ts-ignore
				query.query.bool.must_not.push({
					"match": {
						[fieldName]: fieldValue
					}
				});
			}
		}

		// Add should query
		if (should) {
			for (const [fieldName, fieldValue] of Object.entries(should)) {
				// @ts-ignore
				query.query.bool.should.push({
					"match": {
						[fieldName]: fieldValue
					}
				});
			}
		}

		// Add sorting rule
		if (sortBy && orderBy) {
			const sortRule = {};
			// @ts-ignore
			sortRule[sortBy] = {
				"order": orderBy
			};
			// @ts-ignore
			query.sort.push(sortRule);
		}

		return query;
	}

	/**
	 *
	 * @param indexName
	 * @param filter
	 * @param must
	 * @param mustNot
	 * @param should
	 * @param timeRange
	 * @param size
	 * @param sortBy
	 * @returns {Promise<*>}
	 */
	async getDocumentsByQuery(indexName: string, filter = null, must = null, mustNot = null, should = null, timeRange = null, size = 20, sortBy = null, orderBy = null) {
		try {
			const buildQueryObject = this.elasticBuildQuery(
				filter,
				must,
				mustNot,
				should,
				sortBy,
				orderBy,
				null,
				size,
				timeRange
			)

			const response = await this.client.search({
				index: `${this.indexPrefix}${indexName}`,
				body: buildQueryObject,
			});

			return Promise.resolve(response?.hits?.hits || []);

		}catch (e) {
			return Promise.resolve([])
		}
	}


	async query(indexName: string, query: any) {
		try {
			const response = await this.client.search({
				index: `${this.indexPrefix}${indexName}`,
				body: {
					query: query,
				},
			});

			const hits = response.hits.hits.map((hit) => {
				return {
					_id: hit?._id,
					...(typeof hit._source === 'object' ? hit._source : {}),
				}
			});

			return Promise.resolve(hits);
		} catch (error) {
			console.error('getDocumentsByQuery error:', error);
			return Promise.reject(error);
		}
	}


	/**
	 *
	 * @param indexName
	 * @param id
	 * @param document
	 * @returns {Promise<*&{_id}>}
	 */
	async updateAndGetDocumentById(indexName: string, id: string, document: any) {
		try {
			// Update the document in Elasticsearch
			const updatedDocumentResult = await this.updateDocumentById(indexName, id, document);

			// Fetch the updated document from Elasticsearch and return it in the response
			const updatedDocument: any = await this.findDocumentById(indexName, updatedDocumentResult._id);

			return Promise.resolve(updatedDocument)
		}catch (e) {
			return Promise.reject(e)
		}
	}

	/**
	 *
	 * @param indexName
	 * @param id
	 * @param document
	 * @returns {Promise<UpdateUpdateWriteResponseBase<unknown>>}
	 */
	async updateDocumentById(indexName: string, id: string, document: any) {
		return await this.client.update({
			index: `${this.indexPrefix}${indexName}`,
			id,
			body: {
				doc: document,
			},
		});
	}

	getIndex(indexName: string) {
		return `${this.indexPrefix}${indexName}`
	}

	/**
	 *
	 * @param indexName
	 * @param id
	 * @returns {Promise<WriteResponseBase>}
	 */
	async deleteDocumentById(indexName: string, id: string) {
		return await this.client.delete({
			index: `${this.indexPrefix}${indexName}`,
			id,
		});
	}

	async findAndUpdateOrCreateDocument(indexName: string, options: any) {
		const {findQuery, updatedData, createData} = options
		let documentData = null

		try {
			// Find the document
			const documents = await this.getDocumentsByQuery(
				indexName,
				findQuery
			);

			if (documents.length > 0) {
				// Document exists, update and get it
				const document = documents[0];
				documentData = await this.updateAndGetDocumentById(indexName, document._id, updatedData);

				return {
					data: documentData,
					action: 'updated'
				}

			} else {
				throw new Error('Conversation Not Found')
			}

		}catch (error) {
			// Document doesn't exist, create a new one and get it
			documentData = await this.createAndGetDocument(indexName, createData);
			return {
				data: documentData,
				action: 'created'
			}
		}
	}


	/**
	 * Helping Functions
	 *
	 * @param document
	 */

	getFirstResult(document: any){
		return document?.hits?.hits[0] || null
	}

	getFormattedResults(data: any) {
		return collect(data?.hits?.hits || []).map((doc: any) => {
			return {
				_id: doc?._id,
				...doc?._source
			};
		}).all();
	}

	getFormattedResult(document: any): any {
		if( !document || Object.keys(document).length==0){ return null }

		return {
			_id: document._id,
			...document._source
		}
	}
}

export default ElasticsearchDBAdapter