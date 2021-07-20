from flask import Flask, render_template, request, jsonify, redirect, url_for
from werkzeug.utils import secure_filename
from flask_cors import CORS
from flask import abort


# connection.py
from connection import s3_connection, BUCKET_NAME

import pymysql
import pandas as pd
import json
import sys
import os
import boto3

app = Flask(__name__)
app.config['UPLOAD_FOLDER'] = 'C:/Users/chltp/OneDrive/문서/GitHub/kimchoi/back/video'
s3_path = 'C:/Users/chltp/OneDrive/문서/GitHub/kimchoi/back/video_final'
CORS(app)

db = pymysql.connect(host='localhost',
                     port=3306,
                     user='root',
                     passwd='1234',
                     db='GAGAGAGA',
                     charset='utf8')

"""
db_2 = pymysql.connect(host='localhost',
                     port=3306,
                     user='root',
                     passwd='1234',
                     db='timeline',
                     charset='utf8')"""



#파일 업로드 처리
@app.route('/fileUpload', methods = ['POST'])
def get_video():
	if request.method == 'POST':
		video_file = request.files['file']
		#파일 안정성 확인
		filename = secure_filename(video_file.filename)
		#video 폴더에 저장
		video_file.save(os.path.join('./video', filename))   	
		return jsonify({'success': True, 'file': 'Received', 'name': filename})

#파일 이름
file_list = os.listdir(app.config['UPLOAD_FOLDER2'])
filename = "".join(file_list)
"""#S3 버킷에 영상 저장
s3 = s3_connection()
s3.put_object(
	Bucket = BUCKET_NAME,
    	Body = filename,
    	Key = s3_path,
    	ContentType = filename.content_type)"""

#S3 클라이언트 생성.
s3 = boto3.client('s3')
s3.upload_file(filename, BUCKET_NAME, filename)

@app.route('/fileDown', methods = ['POST'])
def post_video():
	if request.method == 'POST':
	s3 = boto3.resource('s3')
	bucket = s3.Bucket(BUCKET_NAME)
	bucket.upload_file("upload.txt", filename)
	location = boto3.client('s3').get_bucket_location(Bucket=BUCKET_NAME)['LocationConstraint']
	url = "https://s3-%s.amazonaws.com/%s/%s" % (location, BUCKET_NAME, filename)
	#location = s3.get_bucket_location(Bucket = BUCKET_NAME)['LocationConstraint']
	#video_url = f'https://{BUCKET_NAME}.s3.{location}.amazonaws.com/{s3_path}'
	return jsonify(url)

#DB 정보 받기
@app.route('/getdb', methods = ['POST'])
def get_db():
	if request.method == 'POST':
		cursor = db.cursor()
		cursor.execute("""
				SELECT name, 
				img
        		FROM gagagaga.characters
				""")
		result = cursor.fetchall()
		return jsonify(result)

@app.route('/getCharacter', methods = ['POST'])
def get_Character():
	if request.method == 'POST':
		#db = pymysql.connect(host='127.0.0.1', port=3306, user='root', passwd='1234', db='GAGAGAGA', charset='utf8')
		cursor = db.cursor()

		#timeline table 전에 저장된 정보 삭제
		# sql = '''TRUNCATE TABLE timeline;'''
		# cursor.execute(sql)
		
		#timeline 가져오기
		sql = '''
		SELECT name,img,start,end from characters 
		RIGHT JOIN timeline ON characters.id = timeline.cid
		ORDER BY name;'''
		cursor.execute(sql)
		result = cursor.fetchall()
		return jsonify(result)	

'''
# detect.py 실행
test = detect_class("./weights_path", "./source_path")
db_return = test.main()
'''

#서버 실행
if __name__ == '__main__':
   app.run(port=5000, debug = True)
