import { GraphQLError } from "graphql";
import { v4 } from "uuid";

let Mutation = {
  createUser: (parent, args, { db }, info) => {
    const { name, age } = args.data;
    const newUser = {
      id: v4(),
      name,
      age,
    };
    db.users.push(newUser);
    return newUser;
  },
  deleteUser: (parent, args, { db }, info) => {
    const position = db.users.findIndex((user) => user.id === args.userId);
    if (position === -1) {
      throw new GraphQLError("Unable to delete user for ID - " + args.userId);
    }
    db.posts = db.posts.filter((post) => {
      const isMatched = post.author === args.userId;
      if (isMatched) {
        db.comments = db.comments.filter((comment) => comment.post !== post.id);
      }
      return !isMatched;
    });
    db.comments = db.comments.filter(
      (comment) => comment.creator !== args.userId
    );
    const [deletedUser] = db.users.splice(position, 1);
    return deletedUser;
  },
  updateUser: (parent, args, { db }, info) => {
    const { name, age } = args.data;
    const foundUser = db.users.find((user) => user.id === args.userId);
    if (!foundUser) {
      throw new GraphQLError("Unable to update user for ID - " + args.userId);
    }
    if (typeof name === "string") {
      foundUser.name = name;
    }
    if (typeof age === "number") {
      foundUser.age = age;
    }
    return foundUser;
  },
  createPost: (parent, args, { db, pubsub }, info) => {
    const { title, body } = args.data;
    const position = db.users.findIndex((user) => user.id === args.authorId);
    if (position === -1) {
      throw new GraphQLError("Unable to find author for id - " + args.authorId);
    }
    const newPost = {
      id: v4(),
      title,
      body,
      published: false,
      author: args.authorId,
    };
    db.posts.push(newPost);
    pubsub.publish("the-post-channel", {
      mutation: "CREATED",
      data: newPost,
    });
    return newPost;
  },
  deletePost: (parent, args, { db, pubsub }, info) => {
    const position = db.posts.findIndex((post) => post.id === args.postId);
    if (position === -1) {
      throw new GraphQLError("Unable to delete post for ID - " + args.postId);
    }
    db.comments = db.comments.filter((comment) => comment.post !== args.postId);
    const [deletedPost] = db.posts.splice(position, 1);
    pubsub.publish("the-post-channel", {
      mutation: "DELETED",
      data: deletedPost,
    });
    return deletedPost;
  },
  createComment: (parent, args, { db, pubsub }, info) => {
    const userPosition = context.db.users.findIndex(
      (user) => user.id === args.creatorId
    );
    if (userPosition === -1) {
      throw new GraphQLError(
        "Unable to find author for id - " + args.creatorId
      );
    }

    const postPosition = db.posts.findIndex((post) => post.id === args.postId);
    if (postPosition === -1) {
      throw new GraphQLError("Unable to find post for id - " + args.postId);
    }

    let newComment = {
      id: v4(),
      text: args.text,
      creator: args.creatorId,
      post: args.postId,
    };

    db.comments.push(newComment);
    pubsub.publish("the-comment-channel", {
      mutation: "CREATED",
      data: newComment,
    });
    return newComment;
  },
  deleteComment: (parent, args, { db, pubsub }, info) => {
    const position = db.comments.findIndex(
      (comment) => comment.id === args.commentId
    );
    if (position === -1) {
      throw new GraphQLError(
        "Unable to find comment for ID - " + args.commentId
      );
    }
    const [deletedComment] = db.comments.splice(position, 1);
    pubsub.publish("the-comment-channel", {
      mutation: "DELETED",
      data: deletedComment,
    });
    return deletedComment;
  },
};

export default Mutation;
