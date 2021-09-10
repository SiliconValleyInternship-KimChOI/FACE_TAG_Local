import boto3

...
AWS_ACCESS_KEY = "---" #보안상으로 비공개 처리하겠습니다. 21.09.11 관련사항 있으시면 연락주세요.
AWS_SECRET_KEY = "---"
BUCKET_NAME = "---"
...

def s3_connection():
	s3 = boto3.client('s3',
    aws_access_key_id = AWS_ACCESS_KEY,
    aws_secret_access_key = AWS_SECRET_KEY)
	return s3
