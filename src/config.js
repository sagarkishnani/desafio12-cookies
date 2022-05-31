export default {
  PORT: process.env.PORT || 8080,
  mongoLocal: {
    url: "mongodb://localhost:27017/ecommerce",
    options: {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
  },
  mongoRemote: {
    cnxStr:
      "mongodb+srv://admin-sagar:password@cluster0.lyjw7.mongodb.net/ecommerce?retryWrites=true&w=majority",
    options: {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
  },
  sqlite3: {
    client: "sqlite3",
    connection: {
      filename: "./DB/ecommerce.sqlite",
    },
    useNullAsDefault: true,
  },
  mariaDb: {
    client: "mysql",
    connection: {
      host: "localhost",
      user: "sagar",
      password: "Aakash67",
      database: "ecommerce",
    },
  },
  fileSystem: {},
};
