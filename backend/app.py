from flask import Flask, render_template, request, jsonify, redirect, url_for
from werkzeug.utils import secure_filename
from flask_cors import CORS
from flask import abort
# Celery 속 코드 가져오기
from tasks import celery, processing, get_db
import pymysql
import pandas as pd
import os
# connection.py
from connection import s3_connection, BUCKET_NAME
import boto3
# sec_to_time
from time import strftime, gmtime

app = Flask(__name__)
app.config['UPLOAD_FOLDER'] = './input_video/'
video_path = './output_video/'
CORS(app)

app.config.update(
    CELERY_BROKER_URL='redis://localhost:6379/0',
    CELERY_RESULT_BACKEND='redis://localhost:6379/0'
)

db = pymysql.connect(host='localhost',
                     port=3306,
                     user='root',
                     passwd='1234',
                     db='GAGAGAGA',
                     charset='utf8')

# React -> Flask 파일 업로드 처리
@app.route('/fileUpload', methods = ['POST'])
def get_video():
	if request.method == 'POST':
		video_file = request.files['file']
		#파일 안정성 확인
		filename = secure_filename(video_file.filename)
		#video 폴더에 저장
		video_file.save(os.path.join('./input_video', filename))

	# 영상 처리
	video = processing.delay("input_video/abc.mp4")
    # 등장인물 타임라인 
	if video.ready() == True:
		with open("list/appear_list.txt", "r", encoding="utf-8") as f:
			global timeline
			data = f.read()
			timeline = eval(data)
	
		# DB저장
		key = timeline.keys()
		for i in key:
			if i == 'harrypotter':
				cid = 1
			elif i == 'ron':
				cid = 2
			elif i == 'hermione':
				cid = 3
		
			timeline_value = timeline[i]
			val = []
			for j in timeline_value:
				start = strftime("%H:%M:%S", gmtime(j[0]))
				end = strftime("%H:%M:%S", gmtime(j[1]))
				val.append((cid,start,end))
			print(val)
			cursor = db.cursor()
			sql = "INSERT INTO timeline(cid,start,end) VALUES (%s, %s, %s);"
			cursor.executemany(sql,val)
			db.commit()
			val.clear()
			os.remove('list/appear_list.txt')		
		return jsonify({'success': True, 'file': 'Received', 'name': filename})


#S3 버킷에 영상 저장
@app.route('/fileDown', methods = ['POST'])
def post_video():
	if request.method == 'POST':
		#파일 이름 가져오기
		file_list = os.listdir(video_path)
		filename = "".join(file_list)
		#S3 버킷에 영상 저장
		s3 = s3_connection()
		s3.upload_file(video_path+filename, BUCKET_NAME, filename)
		#영상 url
		url = "https://{BUCKET_NAME}.s3.ap-northeast-2.amazonaws.com/{filename}"
		return jsonify(url)

@app.route('/getCharacter', methods = ['POST'])
def get_Character():
	if request.method == 'POST':
		#db = pymysql.connect(host='127.0.0.1', port=3306, user='root', passwd='1234', db='GAGAGAGA', charset='utf8')
		cursor = db.cursor()

		#timeline table 전에 저장된 정보 삭제
		# sql = 'TRUNCATE TABLE timeline;'
		# cursor.execute(sql)
		
		#timeline 가져오기
		sql = '''
		SELECT name,img,start,end from characters 
		RIGHT JOIN timeline ON characters.id = timeline.cid
		ORDER BY name, start;'''
		cursor.execute(sql)
		result = cursor.fetchall()
		return jsonify(result)	

#서버 실행
if __name__ == '__main__':
   app.run(port=5000, debug = True)