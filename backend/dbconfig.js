// export const collectionName = "todo";

// export const connection = async () => {
//     console.log("Using Mock DB to test API endpoints without database connection.");
//     return {
//         collection: (name) => {
//             return {
//                 insertOne: async (data) => ({ insertedId: "111111111111111111111111" }),
//                 find: () => ({ toArray: async () => ([{_id: "111111111111111111111111", task: "Mock Task", status: "pending"}]) }),
//                 deleteOne: async () => ({ deletedCount: 1 }),
//                 deleteMany: async () => ({ deletedCount: 1 }),
//                 findOne: async () => ({ email: "test@example.com", password: "password", _id: "111111111111111111111111" }),
//                 updateOne: async () => ({ modifiedCount: 1 })
//             }
//         }
//     }
// }


import { MongoClient } from "mongodb";

const url = "mongodb+srv://govindsharmaworkspace_db_user:Rk9huDI2voXcvAhf@cluster0.e2bxr2r.mongodb.net/?appName=Cluster0";

const dbName = "node-project";

export const collectionName = "todo";

const client = new MongoClient(url);

export const connection = async () => {

    const connect = await client.connect();

    return connect.db(dbName);
}