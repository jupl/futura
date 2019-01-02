import BoostClient, {
  ApolloClient,
  ApolloLink,
  InMemoryCache,
  NormalizedCacheObject,
} from 'apollo-boost'

/**
 * Create Apollo client instance
 * @param opts Cache to restore, custom link, or client instance
 * @return Apollo client instance
 */
export const createClient = <T>(
  opts: NormalizedCacheObject | ApolloLink | ApolloClient<T>,
) => {
  if(opts instanceof ApolloClient) {
    return opts
  }
  else if(opts instanceof ApolloLink) {
    return new ApolloClient({
      cache: new InMemoryCache(),
      link: opts,
      ssrMode: true,
    })
  }
  else {
    return new BoostClient({
      cache: new InMemoryCache().restore(opts),
    })
  }
}
