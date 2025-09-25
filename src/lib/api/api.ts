const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

const handleResponse = async <T>(res: Response): Promise<T> => {
  if (!res.ok) {
    const error = await res.json().catch(() => ({}));
    throw new Error(error.message || res.statusText);
  }
  if (res.status === 204) {
    return {} as T;
  }
  return res.json();
};

export const api = {
  get: async <T>(
    endpoint: string,
    query?: Record<string, string | number | boolean | undefined>
  ): Promise<T> => {
    const queryString = query
      ? "?" +
        new URLSearchParams(
          Object.entries(query).reduce((acc, [key, value]) => {
            if (value !== undefined) acc[key] = String(value);
            return acc;
          }, {} as Record<string, string>)
        ).toString()
      : "";
    const res = await fetch(`${BASE_URL}${endpoint}${queryString}`);
    return handleResponse<T>(res);
  },

  getById: async <T>(endpoint: string, id: string): Promise<T> => {
    const res = await fetch(`${BASE_URL}${endpoint}/${id}`);
    return handleResponse<T>(res);
  },

  post: async <TResponse, TBody>(
    endpoint: string,
    data: TBody
  ): Promise<TResponse> => {
    const res = await fetch(`${BASE_URL}${endpoint}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    return handleResponse<TResponse>(res);
  },

  patch: async <TResponse, TBody>(
    endpoint: string,
    data: TBody
  ): Promise<TResponse> => {
    const res = await fetch(`${BASE_URL}${endpoint}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    return handleResponse<TResponse>(res);
  },

  delete: async <T>(endpoint: string): Promise<T> => {
    const res = await fetch(`${BASE_URL}${endpoint}`, {
      method: "DELETE",
    });
    return handleResponse<T>(res);
  },
};
