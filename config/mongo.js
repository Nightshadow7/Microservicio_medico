import dotenv from "dotenv";
import { MongoClient, ServerApiVersion } from "mongodb";
dotenv.config();

// const conectarDB = async () => {
//   try {
//     const client = new MongoClient(process.env.MONGO_URI,{
//       serverApi: {
//         version: ServerApiVersion.v1,
//         strict: true,
//         deprecationErrors: true,
//       }
//     });
//     await client.connect();
//     const db = client.db('API-EPS');
//     return db;
//   } catch (error) {
//     throw new Error(`***** ERROR DE CONEXION *****${err.message}`);
//   }
// };

// export default conectarDB;

const client = new MongoClient(process.env.MONGO_URI,{
  serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
  }
});

client.connect();
const conectardb = client.db('API-EPS');

export default conectardb;
