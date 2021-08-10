import { EnforceDocument, FilterQuery } from "mongoose";

/**
 * Mongoose DB paginate options parameter type
 */
export type PaginateOptions = {
  sortBy?: string;
  populate?: string;
  limit?: string;
  page?: string;
};

export type PaginationFunc<DocType = Document, TMethods = Record<string, never>> = (
  filter: FilterQuery<DocType>,
  options: PaginateOptions
) => Promise<QueryResult<DocType, TMethods>>;

/**
 * Mongoose DB paginate query result return type
 */
export type QueryResult<DocType = Document, TMethods = Record<string, never>> = {
  results: EnforceDocument<DocType, TMethods>[];
  page: number;
  limit: number;
  totalPages: number;
  totalResults: number;
};
