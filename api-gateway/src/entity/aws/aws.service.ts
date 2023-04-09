import { Injectable, Logger } from '@nestjs/common';
import { S3 , PutObjectCommand, DeleteObjectCommand } from '@aws-sdk/client-s3';
require('dotenv').config({ path: '.env' })

@Injectable()
export class AwsService {    

    private logger =  new Logger(AwsService.name);

    private s3Client = new S3({
        forcePathStyle: false,
        endpoint: process.env.endpoint,
        region: "us-east-1",
        credentials: {
            accessKeyId: process.env.SPACES_KEY,
            secretAccessKey: process.env.SPACES_SECRET
        }
    });     


    public async upload(file: any, _id: string): Promise<any>{
        
        const urlKey = _id.concat('.').concat(file.originalname.split('.')[1]);
        const urlOrigin = "https://smartranking.nyc3.digitaloceanspaces.com/";
        const url = urlOrigin.concat(urlKey);

        const bucketParams = {
            Bucket: 'smartranking',
            Key: urlKey,
            Body: file.buffer, 
            ACL: "public-read"                      
        }
    
        const run = async () => {
            try{
                const data =  await this.s3Client.send(new PutObjectCommand(bucketParams));                
                return data;
            }catch(error){  
                console.log("Error S3 AWS:", error);
            }
        }

        run();

        const endpoint = {
            url: url
        }
        
        return endpoint;
    }  

    public async delete(file: string): Promise<void>{

        const bucketParams = {
            Bucket: 'smartranking',
            Key: file,         
        }

        const run = async () => {
            try{
                const data =  await this.s3Client.send(new DeleteObjectCommand(bucketParams));
                return data;
            }catch(error){  
                console.log("Error S3 AWS:", error);
            }
        }
        run();
    }             
}