from flask import Flask, request, jsonify, redirect, url_for
from werkzeug.utils import secure_filename
from flask_cors import CORS
import pymysql
import pandas as pd
import os
# Celery 속 코드 가져오기
from tasks import celery, add, processing

app = Flask(__name__)
# React - Flask 임시 연동
CORS(app)
# Flask - DB 연동
db = pymysql.connect(host='localhost',
                     port=3306,
                     user='root',
                     passwd='1234',
                     db='GAGAGAGA',
                     charset='utf8')

# Celery task 실행 예시
@app.route('/')
def default():
	# delay()는 실행 함수고 get()은 실행 결과값 가져오는 함수
	tmp = add.delay(500,20000)
	video = processing.delay("video/abc.mp4")   
	return str(tmp.get())


# React -> Flask 파일 업로드 처리
@app.route('/fileUpload', methods = ['POST'])
def get_video():
	if request.method == 'POST':
		video_file = request.files['file']
		filename = secure_filename(video_file.filename)
		video_file.save(os.path.join('./video', filename))	
		return jsonify({'success': True, 'file': 'Received', 'name': filename})

# Flask -> React 처리한 파일 반환
@app.route('/fileDown', methods = ['POST'])
def post_video():
	# 임시로 영상 처리 해보기
	#processing('https://gagagaga.s3.ap-northeast-2.amazonaws.com/abc+(1).mp4')

	# s3버켓에 담긴 동영상 파일 보내기~
	if request.method == 'POST':
		return 'https://gagagaga.s3.ap-northeast-2.amazonaws.com/abc+(1).mp4'

# DB -> Flask -> React 등장인물 메타정보 반환
@app.route('/getCharacter', methods = ['GET','POST'])
def get_Character():
	if request.method == 'POST':
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

#서버 실행
if __name__ == '__main__':
   app.run(port=5000, debug = True)