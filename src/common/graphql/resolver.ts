import * as TQL from 'type-graphql'

/** Common resolver */
@TQL.Resolver()
export class Resolver {
  /**
   * Sample response
   * @return Version
   */
  @TQL.Query(_returns => String)
  version() {
    return '0.0.1'
  }
}
