require('dotenv').config()
const { ApolloServer, gql, UserInputError } = require("apollo-server");
const mongoose = require("mongoose");
const jwt = require('jsonwebtoken')

const Book = require("./models/book");
const Author = require("./models/author");
const User = require('./models/user')

const JWT_SECRET = 'ALONGSTRINGWITHLOTOFWORDSMUSTBEGOOD'
const MONGODB_URI = process.env.MONGO_DB
mongoose.set("useFindAndModify", true);


mongoose
  .connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => console.log("connected sucessfully"))
  .catch((err) => console.log(err));

const typeDefs = gql`
  type Book {
    title: String!
    published: Int!
    author: Author!
    genres: [String!]!
    id: ID!
  }
  type Author {
    name: String
    bookCount: Int
    born: Float
  }
  type User {
    username: String!
    favoriteGenre: String!
    id: ID!
  }
  
  type Token {
    value: String!
  }
  
  type Mutation {
    addBook(
      title: String
      author: String
      published: Float
      genres: [String]
    ): Book
    editAuthor(name: String, setBornTo: Float): Author
    createUser(
      username: String!
      favoriteGenre: String!
    ): User
    login(
      username: String!
      password: String!
    ): Token  
  }

  type Query {
    bookCount: Int
    authorCount: Int
    allBooks(name: String, genre: String): [Book]
    allAuthors: [Author]
    me: (root,args,context) => {
      return context.currentUser
    }

  }
`;

const resolvers = {
  Query: {
    bookCount: async () => await Book.countDocuments(),
    authorCount: async () => await Author.countDocuments(),
    allBooks: async (root, args) => {
      // if (args.name) {
      //   return books.filter((b) => b.author === args.name);
      // }
      // if (args.genre) {
      //   return books.filter((b) => b.genres.includes(args.genre));
      // }
      // if (args.genre && args.name) {
      //   return [
      //     ...books.filter((b) => b.genres.includes(args.genre)),
      //     books.filter((b) => b.author === args.name),
      //   ];
      // }
      let books = await Book.find({}).populate("author");
      console.log(books);
      return books;
    },
    allAuthors: async () => {
      let authors = await Author.find({});
      let books = await Book.find({}).populate("author");
      authors.forEach((a) => {
        let authorBook = books.filter((b) => b.author.name === a.name);
        a.bookCount = authorBook ? authorBook.length : 0;
      });
      return authors;
    },
  },
  Mutation: {
    addBook: async (root, args, {currentUser}) => {
      const book = new Book({ ...args });

      if(!currentUser) {
        throw new UserInputError('not authenticated')
      }
      const author = await Author.findOne({ name: args.author });
      
      if (!author) {
        let newAuthor = new Author({ name: args.author });
        newAuthor = await newAuthor.save();
        book.author = newAuthor._id;
      } else {
        book.author = author._id;
      }
      try {
        book = await book.save();
        let resbook = await Book.find(book._id).populate("author");
        return resbook;
      } catch (err) {
          throw new UserInputError('Please check the',err) 
      }
      
    },
    editAuthor: async (root, args, {currentUser}) => {
      if(!currentUser) {
        throw new UserInputError('not authenticated')
      }
      const authors = await Author.find({});
      const authorExist = authors.find((a) => a.name === args.name);

      if (authorExist) {
        authorExist.born = args.setBornTo;
        await authorExist.save();
        return authorExist;
      } else {
        throw new UserInputError("Author not found");
      }
    },
    createUser : async(root, args) => {
      const user = new User({...args})
      return await user.save()
    },
    loginUser: async(root, args) =>  {
      const user = await User.findOne({username: args.username})

      if(!user || args.password!== 'seceres') {
        throw new UserInputError('wrong creds')
      }

      const userToken = {
        username: user.username,
        id: user._id
      }
      return {value: jwt.sign(userToken, JWT_SECRET)}
    }
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async({req}) => {
    const auth = req ? req.headers.authorization : null
    if(!auth && auth.toLowerCase().startsWith('bearer ')) {
      const decodedToken = jwt.verify(auth.substring(7), JWT_SECRET)
    }
    const currentUser = await User.findById(decodedToken.id)
    return currentUser
  }
});

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
