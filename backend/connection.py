import boto3

...
AWS_ACCESS_KEY = "---"
AWS_SECRET_KEY = "---"
BUCKET_NAME = "gagagaga"
...

def s3_connection():
	s3 = boto3.client('s3',
    aws_access_key_id = AWS_ACCESS_KEY,
    aws_secret_access_key = AWS_SECRET_KEY)
	return s3
