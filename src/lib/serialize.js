import { ObjectId } from 'mongodb'

export function serializeDocument(doc) {
  return JSON.parse(JSON.stringify(doc, (key, value) => 
    typeof value === 'object' && value !== null && '_bsontype' in value
      ? value.toString()
      : value
  ))
}

