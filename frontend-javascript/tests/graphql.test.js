const {
  ApolloClient,
  InMemoryCache,
  HttpLink,
  gql,
} = require("@apollo/client");
const fetch = require("cross-fetch");

describe("/graphql endpoint", () => {
  let client = null;

  beforeEach(() => {
    client = new ApolloClient({
      link: new HttpLink({
        uri: "http://localhost:4000/graphql",
        fetch,
      }),
      cache: new InMemoryCache(),
    });
  });

  afterEach(() => {
    client = null;
  });

  test("should fetch all the posts from /graphql endpoint", async () => {
    const FETCH_POSTS = gql`
      query FetchPosts {
        posts {
          id
          title
          body
          published
          author {
            id
            name
            email
          }
        }
      }
    `;

    const { data } = await client.query({
      query: FETCH_POSTS,
    });

    expect(data.posts.length).not.toBe(0);
    expect(data.posts[0].id).not.toBeUndefined();
  });

  test("should generate token when correct credentials given", async () => {
    const USER_LOGIN = gql`
      mutation SignInMutation {
        signIn(data: { email: "ross@test", password: "ross123" }) {
          token
        }
      }
    `;

    const { data } = await client.mutate({
      mutation: USER_LOGIN,
    });

    expect(data.signIn.token).not.toBeUndefined();
  });

  test.skip("should not generate token when incorrect credentials given", async () => {
    const USER_LOGIN = gql`
      mutation SignInMutation {
        signIn(data: { email: "ross1234@test", password: "ross123456" }) {
          token
        }
      }
    `;

    const { data } = await client.mutate({
      mutation: USER_LOGIN,
    });

    expect(data.signIn.token).toBeUndefined();
  });
});
