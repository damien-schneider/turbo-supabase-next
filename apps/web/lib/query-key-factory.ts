// ------------ What Each Key Does ------------ //
// 1. all
// Base namespace for all chat-related queries

// 2. lists()
// Used for queries that return collections of items // Mostly used for invalidation

// 3. list({...})
// For filtered collections (passing search/filter parameters)

// 4. details()
// Base key for individual item queries // Mostly used for invalidation

// 5. detail({...})
// For queries that fetch a specific item by ID

export const noUserKey = ["no_user", "none"] as const;

export const chatKey = {
  all: ["chats"] as const,
  lists: () => [...chatKey.all, "list"] as const,
  list: ({ idUser, ...filters }: { idUser: string }) =>
    [...chatKey.lists(), idUser, filters] as const,
  details: () => [...chatKey.all, "detail"] as const,
  detail: (id: string) => [...chatKey.details(), id] as const,
};

export const documentKey = {
  all: ["documents"] as const,
  lists: () => [...documentKey.all, "list"] as const,
  list: (filters: string) => [...documentKey.lists(), { filters }] as const,
  details: () => [...documentKey.all, "detail"] as const,
  detail: ({ id }: { id: string }) => [...documentKey.details(), id] as const,
};

export const chatSelectedDocumentsKey = {
  all: ["chat_selected_documents"] as const,
  lists: () => [...chatSelectedDocumentsKey.all, "list"] as const,
  list: (filters: { idChat: string }) =>
    [...chatSelectedDocumentsKey.lists(), filters] as const,
  details: () => [...chatSelectedDocumentsKey.all, "detail"] as const,
  detail: ({ id }: { id: string }) =>
    [...chatSelectedDocumentsKey.details(), id] as const,
};

export const userKey = {
  all: ["users"] as const,
  auth: () => [...userKey.all, "auth"] as const,
  ids: () => [...userKey.all, "id"] as const,
  id: (id: string) => [...userKey.ids(), id] as const,
};
export const sessionKey = {
  all: ["session"] as const,
};

export const notionKey = {
  all: ["notion"] as const,
  search: (query: string) => [...notionKey.all, "search", { query }] as const,
};

export const podcastKey = {
  all: ["podcasts"] as const,
  lists: () => [...podcastKey.all, "list"] as const,
  infiniteList: (userId: string, params?: { sort?: string; filter?: string }) =>
    [...podcastKey.all, "infinite-list", userId, params] as const,
  details: () => [...podcastKey.all, "detail"] as const,
  detail: ({ publicUrl }: { publicUrl: string }) =>
    [...podcastKey.details(), publicUrl] as const,
  infos: () => [...podcastKey.all, "info"] as const,
  info: (podcastFilePath: string) =>
    [...podcastKey.infos(), podcastFilePath] as const,
};

export const providerTokensKey = {
  all: ["provider_tokens"] as const,
  details: () => [...providerTokensKey.all, "detail"] as const,
  detail: (idUser: string) => [...providerTokensKey.details(), idUser] as const,
};
