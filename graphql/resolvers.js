const { pool } = require("../db");

const resolvers = {
  Query: {
    getPosts: async () => {
      try {
        const postsResult = await pool.query("SELECT * FROM posts");
        const usersResult = await pool.query("SELECT * FROM users");
        let finalResult = postsResult.rows.map((post) => {
          const user = usersResult.rows.find(
            (user) => user.user_id === post.created_by
          );
          return {
            ...post,
            created_by: user,
          };
        });
        return finalResult;
      } catch (error) {
        console.error("Error fetching posts:", error);
        throw new Error("Failed to fetch posts");
      }
    },

    getPostsByUserId: async (root, args, context) => {
      try {
        const postsResult = await pool.query(
          "SELECT * FROM posts WHERE created_by = $1",
          [args.id]
        );
        const usersResult = await pool.query(
          "SELECT * FROM users where user_id = $1",
          [args.id]
        );
        // console.log("postsResult", root, args, context);
        let finalResult = postsResult.rows.map((post) => {
          const user = usersResult.rows.find(
            (user) => user.user_id === post.created_by
          );
          return {
            ...post,
            created_by: user,
          };
        });
        return finalResult;
      } catch (error) {
        console.error("Error fetching posts:", error);
        throw new Error("Failed to fetch posts");
      }
    },
  },
};

module.exports = { resolvers };
