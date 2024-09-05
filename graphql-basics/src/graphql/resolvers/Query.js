let Query = {
  users: (parent, args, { db }, info) => {
    let resultUsers = db.users;
    if (args.term) {
      resultUsers = db.users.filter((user) =>
        user.name.toLowerCase().includes(args.term.toLowerCase())
      );
    }
    if (args.maxAge) {
      resultUsers = resultUsers.filter((user) => user.age <= args.maxAge);
    }
    return resultUsers;
  },
  posts: (parent, args, { db }, info) => {
    if (args.term) {
      return db.posts.filter(
        (post) =>
          post.title.toLowerCase().includes(args.term.toLowerCase()) ||
          post.body.toLowerCase().includes(args.term.toLowerCase())
      );
    }
    return db.posts;
  },
  comments: (parent, args, { db }, info) => {
    return db.comments;
  },
};

export default Query;
