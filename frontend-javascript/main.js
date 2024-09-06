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

const USER_LOGIN = gql`
  mutation SignInMutation($email: String!, $password: String!) {
    signIn(data: { email: $email, password: $password }) {
      token
    }
  }
`;

window.onload = function () {
  const btnGetPost = document.getElementById("btnGetPost");
  const postContainer = document.getElementById("postContainer");

  const btnLogin = document.getElementById("btnLogin");
  const txtEmail = document.getElementById("txtEmail");
  const txtPassword = document.getElementById("txtPassword");

  btnLogin.addEventListener("click", async function (event) {
    event.preventDefault();

    try {
      const { data } = await client.mutate({
        mutation: USER_LOGIN,
        variables: {
          email: txtEmail.value,
          password: txtPassword.value,
        },
      });

      console.log("Data : ", data);
    } catch (err) {
      console.error(err.message);
    }
  });

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
