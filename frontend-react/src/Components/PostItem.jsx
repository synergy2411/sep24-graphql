function PostItem({ post }) {
  return (
    <div className="col-4">
      <div className="card m-2">
        <div className="card-header">
          <h5 className="text-center">{post.title.toUpperCase()}</h5>
        </div>
        <div className="card-body text-center">
          <blockquote>
            {post.body} <cite> - {post.author.name}</cite>
          </blockquote>
        </div>
      </div>
    </div>
  );
}

export default PostItem;
