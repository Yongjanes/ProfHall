import { Client, Storage, ID } from "node-appwrite"
import { InputFile } from "node-appwrite/file"
import { extname } from "path"
import fs from "fs"


const uploadOnAppwrite = async function(localFilePath) {
    const client = new Client()
    
    client
        .setEndpoint(process.env.APPWRITE_ENDPOINT)
        .setProject(process.env.APPWRITE_PROJECT_ID)
        .setKey(process.env.APPWRITE_API_KEY)
    
    const storage = new Storage(client)
    try {
        if (!localFilePath) {
            return null
        }
        const UID = ID.unique()
        const uploaded = await storage.createFile({
            bucketId: process.env.APPWRITE_BUCKET_ID,
            fileId: UID,
            file: InputFile.fromPath(localFilePath, `${UID}${extname(localFilePath)}`),
            permissions: ['read("any")']
        })
        // console.log(upload)
        return `${process.env.APPWRITE_ENDPOINT}/storage/buckets/${uploaded.bucketId}/files/${uploaded.$id}/view?project=${process.env.APPWRITE_PROJECT_ID}`
    } catch (error) {
        console.log("Error : ", error)
        return null
    } finally {
        fs.unlinkSync(localFilePath)
    }
}

export { uploadOnAppwrite }