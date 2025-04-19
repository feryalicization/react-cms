import {
  DataProvider,
  GetListParams,
  GetListResult,
  GetOneParams,
  GetOneResult,
  CreateParams,
  CreateResult,
  UpdateParams,
  UpdateResult,
  DeleteParams,
  DeleteResult,
  GetManyParams,
  GetManyResult,
  GetManyReferenceParams,
  GetManyReferenceResult,
  UpdateManyParams,
  UpdateManyResult,
  DeleteManyParams,
  DeleteManyResult,
} from 'react-admin';
import { fetchProducts } from '../services/productService';

const baseUrl = 'http://localhost:5117/api';

// Custom fetchJson function for API calls
const fetchJson = async (
  url: string,
  options: { headers?: HeadersInit; method?: string; body?: any } = {}
): Promise<{
  status: number;
  headers: Headers;
  body: any;
}> => {
  const auth = JSON.parse(localStorage.getItem('auth') || '{}');
  const token = auth?.token;

  const headers: Record<string, string> = {
    Accept: 'application/json',
    Authorization: `Bearer ${token}`,
    ...(options.headers as Record<string, string>),
  };

  if (options.body && !headers['Content-Type']) {
    headers['Content-Type'] = 'application/json';
  }

  const response = await fetch(url, {
    ...options,
    headers: headers, // Use HeadersInit here
  });

  const json = await response.json();

  return {
    status: response.status,
    headers: response.headers, // Headers are passed here
    body: json,
  };
};

// Custom DataProvider without simpleRestProvider
const dataProvider: DataProvider = {
  // getList for "products"
  getList: async (
    resource: string,
    params: GetListParams
  ): Promise<GetListResult> => {
    if (resource === 'products') {
      const data = await fetchProducts();

      return {
        data: data.map((item, index) => {
          const { id, ...rest } = item; // Destructure and remove 'id'
          return {
            id: id ?? index, // Assign 'id' or fallback to index
            ...rest, // Spread the remaining properties
          };
        }),
        total: data.length,
      };
    }

    // Handle other resources or fallback to an empty list
    return {
      data: [],
      total: 0,
    };
  },

  // getOne for a single product
  getOne: async (
    resource: string,
    params: GetOneParams
  ): Promise<GetOneResult> => {
    if (resource === 'products') {
      const response = await fetchJson(`${baseUrl}/Product/${params.id}`, {
        method: 'GET',
      });
      return {
        data: response.body,
      };
    }
    throw new Error(`Unknown resource ${resource}`);
  },

  // create a new product
  create: async (
    resource: string,
    params: CreateParams
  ): Promise<CreateResult> => {
    if (resource === 'products') {
      const response = await fetchJson(`${baseUrl}/Product`, {
        method: 'POST',
        body: JSON.stringify(params.data),
      });
      return {
        data: response.body,
      };
    }
    throw new Error(`Unknown resource ${resource}`);
  },

  // update an existing product
  update: async (
    resource: string,
    params: UpdateParams
  ): Promise<UpdateResult> => {
    if (resource === 'products') {
      const response = await fetchJson(`${baseUrl}/Product/${params.id}`, {
        method: 'PUT',
        body: JSON.stringify(params.data),
      });
      return {
        data: response.body,
      };
    }
    throw new Error(`Unknown resource ${resource}`);
  },

  // delete a product
  delete: async (
    resource: string,
    params: DeleteParams
  ): Promise<DeleteResult> => {
    if (resource === 'products') {
      const response = await fetchJson(`${baseUrl}/Product/${params.id}`, {
        method: 'DELETE',
      });
      return {
        data: response.body,
      };
    }
    throw new Error(`Unknown resource ${resource}`);
  },

  // getMany (not implemented)
  getMany: async (resource: string, params: GetManyParams): Promise<GetManyResult> => {
    throw new Error('getMany not implemented');
  },

  // getManyReference (not implemented)
  getManyReference: async (resource: string, params: GetManyReferenceParams): Promise<GetManyReferenceResult> => {
    throw new Error('getManyReference not implemented');
  },

  // updateMany (not implemented)
  updateMany: async (resource: string, params: UpdateManyParams): Promise<UpdateManyResult> => {
    throw new Error('updateMany not implemented');
  },

  // deleteMany (not implemented)
  deleteMany: async (resource: string, params: DeleteManyParams): Promise<DeleteManyResult> => {
    throw new Error('deleteMany not implemented');
  },
};

export default dataProvider;
