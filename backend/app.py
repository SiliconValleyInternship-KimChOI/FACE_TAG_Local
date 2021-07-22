from flask import Flask, render_template, request, jsonify, redirect, url_for, abort
from werkzeug.utils import secure_filename
from flask_cors import CORS
# Celery
from tasks import celery, processing
# DB
import pymysql
import pandas as pd
import os
# Convert sec_to_time
from time import strftime, gmtime
# Sound synthesis
from moviepy.editor import *
# connection.py
from connection import s3_connection, BUCKET_NAME
import boto3

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
		# 파일 안정성 확인
		filename = secure_filename(video_file.filename)
		# video 폴더에 저장
		video_file.save(os.path.join('./input_video', filename))
		# 소리 합성을 위해
		global audioclip
		audioclip = VideoFileClip("./input_video/"+filename).audio #오디오 받기

	return jsonify({'success': True, 'file': 'Received', 'name': filename})

# DB저장
def insertTimeline(timeline):
	# Timeline table 전에 저장된 정보 삭제
	cursor = db.cursor()
	sql = '''TRUNCATE TABLE timeline;'''
	cursor.execute(sql)
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
	return 'Timeline update'

#S3 버킷에 영상 저장
@app.route('/fileDown', methods = ['POST'])
def post_video():
	if request.method == 'POST':
		#파일 이름 가져오기
		file_list = os.listdir(app.config['UPLOAD_FOLDER'])
		filename = "".join(file_list)
		# 영상 처리
		video = processing.delay(app.config['UPLOAD_FOLDER']+filename)
        # 등장인물 타임라인 
		global timeline
		data = str(video.get())
		timeline = eval(data)
		print(timeline)
		# DB저장
		insertTimeline(timeline)

		# 소리 합치기
		videoclip = VideoFileClip(video_path+"output/"+filename)
		videoclip.audio=audioclip  #아웃풋 동영상에 오디오 씌우기
		videoclip.write_videofile(video_path+"output/"+filename) #아웃풋 동영상 덮어쓰기


		#S3 버킷에 영상 저장
		s3 = s3_connection()
		s3.upload_file(video_path+filename, BUCKET_NAME, filename)
		#영상 url
		url = "https://{BUCKET_NAME}.s3.ap-northeast-2.amazonaws.com/{filename}"
		return jsonify(url)

@app.route('/getCharacter', methods = ['POST'])
def get_Character():
	if request.method == 'POST':
		cursor = db.cursor()
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


        # # 등장인물 타임라인 
		# if video.ready() == 'True':
		# 	global timeline
		# 	data = video.get()
		# 	timeline = eval(data)
		# 	print(timeline)
	
		# 	# DB저장
		# 	key = timeline.keys()
		# 	for i in key:
		# 		if i == 'harrypotter':
		# 			cid = 1
		# 		elif i == 'ron':
		# 			cid = 2
		# 		elif i == 'hermione':
		# 			cid = 3
		
		# 		timeline_value = timeline[i]
		# 		val = []
		# 		for j in timeline_value:
		# 			start = strftime("%H:%M:%S", gmtime(j[0]))
		# 			end = strftime("%H:%M:%S", gmtime(j[1]))
		# 			val.append((cid,start,end))
		# 		print(val)
		# 		cursor = db.cursor()
		# 		sql = "INSERT INTO timeline(cid,start,end) VALUES (%s, %s, %s);"
		# 		cursor.executemany(sql,val)
		# 		db.commit()
		# 		val.clear()