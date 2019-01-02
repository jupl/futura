import BoostClient, {
  ApolloClient,
  ApolloLink,
  InMemoryCache,
  NormalizedCacheObject,
} from 'apollo-boost'

/**
 * Create Apollo client instance
 * @param opts Cache to restore or custom link
 * @return Apollo client instance
 */
export const createClient = (
  opts: NormalizedCacheObject | ApolloLink,
): ApolloClient<NormalizedCacheObject> => opts instanceof ApolloLink
  ? new ApolloClient({
    cache: new InMemoryCache(),
    connectToDevTools: false,
    link: opts,
    ssrMode: true,
  })
  : new BoostClient({
    cache: new InMemoryCache().restore(opts),
  })
