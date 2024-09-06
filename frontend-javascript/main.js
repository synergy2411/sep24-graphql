import { ApolloClient, gql, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  uri: "http://localhost:4000/graphql",
  cache: new InMemoryCache(),
});

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

window.onload = function () {
  const btnGetPost = document.getElementById("btnGetPost");
  const postContainer = document.getElementById("postContainer");

  btnGetPost.addEventListener("click", async function (event) {
    event.preventDefault();

    const { data } = await client.query({
      query: FETCH_POSTS,
    });

    data.posts.forEach((post) => {
      const liElement = document.createElement("li");

      liElement.innerHTML = post.title.toUpperCase();

      postContainer.appendChild(liElement);
    });
  });
};
