const schema = `#graphql
  type Post {
   id: Int
   title: String
   content: String
   description: String
   imageurl: String
   created_at: String
   updated_at: String
   created_by: User
   likes: Int
   comments: Int
  }


  type User{
    email: String
    name: String
    user_id: Int
    profileimg: String
  }

  type Query {
    getPosts: [Post]
    getPostsByUserId(id: String): [Post]
  }
`;

module.exports = { schema };
