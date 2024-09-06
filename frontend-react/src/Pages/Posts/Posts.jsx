import { useQuery, gql } from "@apollo/client";
import PostItem from "../../Components/PostItem";

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

function PostsPage() {
  const { data, loading, error } = useQuery(FETCH_POSTS);

  return (
    <div className="container">
      {loading && <h1>Loading...</h1>}
      {error && <h2>Something went wrong</h2>}
      <div className="row">
        {data &&
          data.posts &&
          data.posts.map((post) => <PostItem key={post.id} post={post} />)}
      </div>
    </div>
  );
}

export default PostsPage;
