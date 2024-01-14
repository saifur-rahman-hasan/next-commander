import ElasticsearchDBAdapter from "@/database/adapters/Elasticsearch/ElasticsearchDBAdapter";
import {
	DirectoryListingCreateInterface,
	DirectoryListingReadInterface, DirectoryListingUpdateInterface
} from "@/services/DirectoryListing/Interfaces/DirectoryListingInterface";
import ESBaseRepository from "@/database/adapters/Elasticsearch/ESBaseRepository";

export default class DirectoryListingRepository extends ESBaseRepository{
	es_index: string; // Name of the Elasticsearch index used for directory listings.

	/**
	 * Initializes a new instance of the DirectoryListingRepository class.
	 */
	constructor() {
		super();
		this.es_index = "__directory_listing"; // Setting the specific index for directory listings.
	}

	/**
	 * Asynchronously creates a new directory listing in the database.
	 *
	 * @param data - Object containing the directory listing's data.
	 * @returns A promise resolving with the created directory listing.
	 */
	async create(data: DirectoryListingCreateInterface): Promise<DirectoryListingReadInterface> {
		try {
			// Create a new directory listing document in Elasticsearch and retrieve the created document.
			const newDirectoryListing: DirectoryListingReadInterface = await this.es_client.createAndGetDocument(this.es_index, data);

			return Promise.resolve(newDirectoryListing);
		} catch (e: any) {
			console.log('create error: ', e);
			return Promise.reject(e.message);
		}
	}

	/**
	 * Asynchronously finds a directory listing by its document ID.
	 *
	 * @param docId - The ID of the directory listing document to retrieve.
	 * @returns A promise resolving with the directory listing if found, otherwise null.
	 */
	async findById(docId: string) {
		// Additional methods like 'findById' can be simplified or generalized within the class. Here's a sample of how you might document one such method.
		return this.read(docId); // For findById, we can utilize the 'read' method directly.
	}

	/**
	 * Asynchronously reads a directory listing by its document ID.
	 *
	 * @param docId - The ID of the directory listing document to retrieve.
	 * @returns A promise resolving with the directory listing if found, otherwise null.
	 */
	async read(docId: string) {
		try {
			const directoryListing: DirectoryListingReadInterface = await this.es_client.findDocumentById(this.es_index, docId);

			return Promise.resolve(directoryListing);
		} catch (e: any) {
			return Promise.resolve(null);
		}
	}

	/**
	 * Asynchronously updates a directory listing identified by its document ID with new data.
	 *
	 * @param docId - The ID of the directory listing document to update.
	 * @param data - Object containing the new data for the directory listing.
	 * @returns A promise resolving with the updated directory listing.
	 */
	async update(docId: string, data: DirectoryListingUpdateInterface): Promise<DirectoryListingReadInterface> {
		try {
			const newDirectoryListing: DirectoryListingReadInterface = await this.es_client.updateAndGetDocumentById(this.es_index, docId, data);

			return Promise.resolve(newDirectoryListing);
		} catch (e: any) {
			console.log('update error: ', e);
			return Promise.reject(e.message);
		}
	}

	/**
	 * Asynchronously deletes a directory listing from the database by its document ID.
	 *
	 * @param docId - The ID of the directory listing document to delete.
	 * @returns A promise resolving to true if the deletion was successful, otherwise rejected with an error message.
	 */
	async delete(docId: string) {
		try {
			const deletedDoc = await this.es_client.deleteDocumentById(this.es_index, docId);

			return Promise.resolve(deletedDoc?.result === 'deleted');
		} catch (e: any) {
			return Promise.reject('Failed to delete or document not exists.');
		}
	}

	/**
	 * Asynchronously retrieves directory listings matching specific query criteria.
	 *
	 * @param query - Query object containing the criteria for selecting directory listings.
	 * @returns A promise resolving with an array of directory listings matching the query.
	 */
	async findByQuery(query: object): Promise<DirectoryListingReadInterface[]> {
		try {
			const queryResults = await this.es_client.execQuery(this.es_index, query);

			const directoryListing: DirectoryListingReadInterface[] = this.es_client.getFormattedResults(queryResults);

			return Promise.resolve(directoryListing);
		} catch (e: any) {
			console.log('query error: ', e);
			return Promise.reject(e.message);
		}
	}

	/**
	 * Asynchronously retrieves directory listings based on a provided query.
	 * This method is similar to 'findByQuery' and can be used interchangeably.
	 * Consider consolidating them into a single method.
	 *
	 * @param query - Query object containing the criteria for selecting directory listings.
	 * @returns A promise resolving with an array of directory listings that match the query.
	 */
	async getByQuery(query: object): Promise<DirectoryListingReadInterface[]> {
		try {
			const queryResults = await this.es_client.execQuery(this.es_index, query);

			const directoryListing: DirectoryListingReadInterface[] = this.es_client.getFormattedResults(queryResults);

			return Promise.resolve(directoryListing);
		} catch (e: any) {
			console.log('query error: ', e);
			return Promise.reject(e.message);
		}
	}

}