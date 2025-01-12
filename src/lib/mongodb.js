import { MongoClient } from 'mongodb'

const uri = process.env.MONGODB_URI
const options = {}

let client
let clientPromise

if (!uri) {
  throw new Error('Please add your Mongo URI to .env.local')
}

if (process.env.NODE_ENV === 'development') {
  // In development mode, use a global variable so that the value
  // is preserved across module reloads caused by HMR (Hot Module Replacement).
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri, options)
    global._mongoClientPromise = client.connect()
  }
  clientPromise = global._mongoClientPromise
} else {
  // In production mode, it's best to not use a global variable.
  client = new MongoClient(uri, options)
  clientPromise = client.connect()
}

export async function connectToDatabase() {
  try {
    const client = await clientPromise
    const db = client.db()
    console.log('Successfully connected to the database')
    return { db, client }
  } catch (error) {
    console.error('Failed to connect to the database:', error)
    throw error
  }
}

// Export a module-scoped MongoClient promise. By doing this in a
// separate module, the client can be shared across functions.
export default clientPromise



// import { MongoClient } from 'mongodb'

// const uri = process.env.MONGODB_URI
// const options = {
//   ssl: true,
//   sslValidate: true,
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// }

// let client
// let clientPromise

// if (!uri) {
//   throw new Error('Please add your Mongo URI to .env.local')
// }

// if (process.env.NODE_ENV === 'development') {
//   // In development mode, use a global variable so that the value
//   // is preserved across module reloads caused by HMR (Hot Module Replacement).
//   if (!global._mongoClientPromise) {
//     client = new MongoClient(uri, options)
//     global._mongoClientPromise = client.connect()
//   }
//   clientPromise = global._mongoClientPromise
// } else {
//   // In production mode, it's best to not use a global variable.
//   client = new MongoClient(uri, options)
//   clientPromise = client.connect()
// }

// export async function connectToDatabase() {
//   try {
//     const client = await clientPromise
//     const db = client.db()
//     console.log('Successfully connected to the database')
//     return { db, client }
//   } catch (error) {
//     console.error('Failed to connect to the database:', error)
//     throw error
//   }
// }

// // Export a module-scoped MongoClient promise. By doing this in a
// // separate module, the client can be shared across functions.
// export default clientPromise





// import { MongoClient } from 'mongodb'

// const uri = process.env.MONGODB_URI
// const options = {}

// let client
// let clientPromise

// if (!uri) {
//   throw new Error('Please add your Mongo URI to .env.local')
// }
// import { MongoClient } from 'mongodb'

// const uri = process.env.MONGODB_URI
// const options = {
//   ssl: true,
//   sslValidate: true,
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// }

// let client
// let clientPromise

// if (!uri) {
//   throw new Error('Please add your Mongo URI to .env.local')
// }

// if (process.env.NODE_ENV === 'development') {
//   if (!global._mongoClientPromise) {
//     client = new MongoClient(uri, options)
//     global._mongoClientPromise = client.connect()
//   }
//   clientPromise = global._mongoClientPromise
// } else {
//   client = new MongoClient(uri, options)
//   clientPromise = client.connect()
// }

// export async function connectToDatabase() {
//   try {
//     const client = await clientPromise
//     const db = client.db()
//     console.log('Successfully connected to the database')
//     return { db, client }
//   } catch (error) {
//     console.error('Failed to connect to the database:', error)
//     throw error
//   }
// }

// export default clientPromise





// import { MongoClient } from 'mongodb'

// const uri = process.env.MONGODB_URI

// if (!uri) {
//   throw new Error('Please add your Mongo URI to .env.local')
// }

// let client
// let clientPromise

// if (process.env.NODE_ENV === 'development') {
//   // In development mode, use a global variable so that the value
//   // is preserved across module reloads caused by HMR (Hot Module Replacement).
//   if (!global._mongoClientPromise) {
//     client = new MongoClient(uri)
//     global._mongoClientPromise = client.connect()
//   }
//   clientPromise = global._mongoClientPromise
// } else {
//   // In production mode, it's best to not use a global variable.
//   client = new MongoClient(uri)
//   clientPromise = client.connect()
// }

// export async function connectToDatabase() {
//   try {
//     const client = await clientPromise
//     const db = client.db()
//     console.log('Successfully connected to the database')
//     return { db, client }
//   } catch (error) {
//     console.error('Failed to connect to the database:', error)
//     throw error
//   }
// }

// export default clientPromise



// import { MongoClient } from 'mongodb'

// const uri = process.env.MONGODB_URI

// let client
// let clientPromise

// if (!process.env.MONGODB_URI) {
//   throw new Error('Please add your Mongo URI to .env.local')
// }

// if (process.env.NODE_ENV === 'development') {
//   // In development mode, use a global variable so that the value
//   // is preserved across module reloads caused by HMR (Hot Module Replacement).
//   if (!global._mongoClientPromise) {
//     client = new MongoClient(uri)
//     global._mongoClientPromise = client.connect()
//   }
//   clientPromise = global._mongoClientPromise
// } else {
//   // In production mode, it's best to not use a global variable.
//   client = new MongoClient(uri)
//   clientPromise = client.connect()
// }

// // Export a module-scoped MongoClient promise. By doing this in a
// // separate module, the client can be shared across functions.
// export default clientPromise

// export async function connectToDatabase() {
//   try {
//     const client = await clientPromise
//     const db = client.db()
//     console.log('Successfully connected to the database')
//     return { db, client }
//   } catch (error) {
//     console.error('Failed to connect to the database:', error)
//     throw error
//   }
// }




// import { MongoClient } from 'mongodb'

// const uri = process.env.MONGODB_URI
// const options = {
//   useUnifiedTopology: true,
//   useNewUrlParser: true,
// }

// let client
// let clientPromise

// if (!process.env.MONGODB_URI) {
//   throw new Error('Please add your Mongo URI to .env.local')
// }

// if (process.env.NODE_ENV === 'development') {
//   // In development mode, use a global variable so that the value
//   // is preserved across module reloads caused by HMR (Hot Module Replacement).
//   if (!global._mongoClientPromise) {
//     client = new MongoClient(uri, options)
//     global._mongoClientPromise = client.connect()
//   }
//   clientPromise = global._mongoClientPromise
// } else {
//   // In production mode, it's best to not use a global variable.
//   client = new MongoClient(uri, options)
//   clientPromise = client.connect()
// }

// // Export a module-scoped MongoClient promise. By doing this in a
// // separate module, the client can be shared across functions.
// export default clientPromise

// export async function connectToDatabase() {
//   try {
//     const client = await clientPromise
//     const db = client.db()
//     console.log('Successfully connected to the database')
//     return { db, client }
//   } catch (error) {
//     console.error('Failed to connect to the database:', error)
//     throw error
//   }
// }






// import { MongoClient } from 'mongodb'

// if (!process.env.MONGODB_URI) {
//   throw new Error('Please add your MONGODB_URI to .env.local')
// }

// const uri = process.env.MONGODB_URI
// const options = {}

// let client
// let clientPromise

// if (process.env.NODE_ENV === 'development') {
//   if (!global._mongoClientPromise) {
//     client = new MongoClient(uri, options)
//     global._mongoClientPromise = client.connect()
//   }
//   clientPromise = global._mongoClientPromise
// } else {
//   client = new MongoClient(uri, options)
//   clientPromise = client.connect()
// }

// export async function connectToDatabase() {
//   const client = await clientPromise
//   const db = client.db()
//   return { db, client }
// }




// import { MongoClient } from 'mongodb'

// const uri = process.env.MONGODB_URI
// const options = {}

// let client
// let clientPromise

// if (!process.env.MONGODB_URI) {
//   throw new Error('Please add your Mongo URI to .env.local')
// }

// if (process.env.NODE_ENV === 'development') {
//   if (!global._mongoClientPromise) {
//     client = new MongoClient(uri, options)
//     global._mongoClientPromise = client.connect()
//   }
//   clientPromise = global._mongoClientPromise
// } else {
//   client = new MongoClient(uri, options)
//   clientPromise = client.connect()
// }

// export async function connectToDatabase() {
//   const client = await clientPromise
//   const db = client.db()
//   return { client, db }
// }