let Subscription = {
  post: {
    subscribe: (parent, args, { pubsub }, info) => {
      return pubsub.subscribe("the-post-channel");
    },
    resolve: (payload) => payload,
  },
};

export default Subscription;
