from flask import Flask, render_template, request, jsonify, redirect, url_for
from werkzeug.utils import secure_filename
from flask_cors import CORS
from flask import send_file, send_from_directory, abort
import pymysql
import pandas as pd
import json
import sys
import os
app = Flask(__name__)
app.config['UPLOAD_FOLDER'] = 'C:/Users/chltp/OneDrive/문서/GitHub/kimchoi/back/video'
CORS(app)

db = pymysql.connect(host='localhost',
                     port=3306,
                     user='root',
                     passwd='1234',
                     db='GAGAGAGA',
                     charset='utf8')
#파일 업로드 처리
@app.route('/fileUpload', methods = ['POST'])
def get_video():
	if request.method == 'POST':
		video_file = request.files['file']
		filename = secure_filename(video_file.filename)
		video_file.save(os.path.join('./video', filename))
        #저장할 경로 + 파일명	
		return jsonify({'success': True, 'file': 'Received', 'name': filename})

@app.route('/fileDown', methods = ['POST'])
def post_video():
	if request.method == 'POST':
		return 'https://gagagaga.s3.ap-northeast-2.amazonaws.com/abc.mp4'


@app.route('/getCharacter', methods = ['GET','POST'])
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
