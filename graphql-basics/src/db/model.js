let users = [
  { id: "u001", name: "Monica Geller", age: 23 },
  { id: "u002", name: "Rachel Greens", age: 22 },
  { id: "u003", name: "Chandler Bing", age: 24 },
];

let posts = [
  {
    id: "p001",
    title: "GraphQL 101",
    body: "Awesome book",
    published: false,
    author: "u003",
  },
  {
    id: "p002",
    title: "React Refresh",
    body: "Nice blog",
    published: true,
    author: "u002",
  },
  {
    id: "p003",
    title: "Advanced Angular",
    body: "Love it ❤️❤️",
    published: false,
    author: "u001",
  },
  {
    id: "p004",
    title: "Beginning NodeJS",
    body: "Not bad",
    published: true,
    author: "u003",
  },
];

let comments = [
  { id: "c001", text: "Love it", post: "p004", creator: "u001" },
  { id: "c002", text: "Like it", post: "p003", creator: "u002" },
  { id: "c003", text: "Awesome", post: "p004", creator: "u001" },
  { id: "c004", text: "Not that great", post: "p001", creator: "u002" },
];

const db = { users, posts, comments };

export { db };
