import { Injectable, Logger } from '@nestjs/common';
import { S3 , PutObjectCommand, DeleteObjectCommand } from '@aws-sdk/client-s3';
import { ConfigService } from '@nestjs/config';
//require('dotenv').config({ path: '.env' })

@Injectable()
export class AwsService {    

    private logger =  new Logger(AwsService.name);

    constructor (
        private configService: ConfigService
    ){}

    private AWS_ENDPOINT = this.configService.get<string>('AWS_ENDPOINT');
    private AWS_URL = this.configService.get<string>('AWS_URL');
    private AWS_BUCKET = this.configService.get<string>('AWS_BUCKET');
    private AWS_REGION = this.configService.get<string>('AWS_REGION');
    private AWS_SPACES_KEY = this.configService.get<string>('AWS_SPACES_KEY');
    private AWS_SPACES_SECRET = this.configService.get<string>('AWS_SPACES_SECRET');

    private s3Client = new S3({
        forcePathStyle: false,
        endpoint: this.AWS_ENDPOINT,
        region: this.AWS_REGION,
        credentials: {
            accessKeyId: this.AWS_SPACES_KEY,
            secretAccessKey: this.AWS_SPACES_SECRET
        }
    });     


    public async upload(file: any, _id: string): Promise<any>{

        
        
        const urlKey = _id.concat('.').concat(file.originalname.split('.')[1]);
        const urlOrigin = this.AWS_URL;;
        const url = urlOrigin.concat(urlKey);

        const bucketParams = {
            Bucket: this.AWS_BUCKET,
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