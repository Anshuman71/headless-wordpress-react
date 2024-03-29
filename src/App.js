import { useEffect, useState } from "react";

const SITE_NAME = "<your-site-name>";

const WORDPRESS_HOST = `https://public-api.wordpress.com/wp/v2/sites/${SITE_NAME}`;

const WORDPRESS_POSTS = `${WORDPRESS_HOST}/posts`;

function App() {
  const [loading, setLoading] = useState(true);
  const [selectedPost, setSelectedPost] = useState(null);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch(WORDPRESS_POSTS)
      .then((res) => res.json())
      .then((data) => {
        setLoading(false);
        setPosts(data);
      });
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h1>{loading ? "Loading..." : "Posts"}</h1>
      <div style={{ display: "flex" }}>
        <div style={{ marginRight: 40, width: "30%" }}>
          {loading ? null : posts.length ? (
            <ul>
              {posts.map((post, index) => (
                <li
                  style={{
                    cursor: "pointer",
                    color: selectedPost?.slug === post.slug ? "blue" : "black",
                    marginBottom: 10,
                  }}
                  onClick={() => setSelectedPost(posts[index])}
                  key={post.slug}
                >
                  {post.title.rendered}
                </li>
              ))}
            </ul>
          ) : (
            <p>No posts available!</p>
          )}
        </div>
        <div
          style={{
            width: "70%",
            marginLeft: 50,
            border: "2px solid black",
            padding: "2px 10px",
            overflow: "hidden",
          }}
        >
          {selectedPost ? (
            <article>
              <h2>{selectedPost.title.rendered}</h2>
              <p
                dangerouslySetInnerHTML={{
                  __html: selectedPost.content.rendered,
                }}
              />
            </article>
          ) : (
            <p>Click a post title to read the post.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
