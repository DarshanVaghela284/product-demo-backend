const {
  aws_access_key,
  aws_secret_key,
  bucket,
} = require("./../config/env-vars");
const APIError = require("./APIError");
const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");

const s3Client = new S3Client({
  region: "ap-south-1",
  credentials: {
    accessKeyId: aws_access_key,
    secretAccessKey: aws_secret_key,
  },
});

module.exports.uploadFileHandler = (foldername, file) => {
  const params = {
    Bucket: bucket,
    Key: `${foldername}/${file.name}`,
    Body: file.data,
  };

  return new Promise((resolve, reject) => {
    const command = new PutObjectCommand(params);
    console.log(foldername, file, "file upload");
    s3Client
      .send(command)
      .then((data) => resolve({ status: 200, data }))
      .catch((err) => {
        console.log(err, "errrrrrr");
        reject(new APIError({ message: "Error uploading file", status: 500 }));
      });
  });
};
