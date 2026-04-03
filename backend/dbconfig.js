import { MongoClient } from "mongodb";

const url = "mongodb+srv://govindsharmaworkspace_db_user:Rk9huDI2voXcvAhf@cluster0.e2bxr2r.mongodb.net/?appName=Cluster0";

const dbName = "node-project";

export const collectionName = "todo";

const client = new MongoClient(url);

export const connection = async () =>{

    const connect = await client.connect();

    return connect.db(dbName);
c
}


