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
"""
db_2 = pymysql.connect(host='localhost',
                     port=3306,
                     user='root',
                     passwd='1234',
                     db='timeline',
                     charset='utf8')"""

@app.route('/')
def default():
	return 'Hello'

#파일 업로드 처리
@app.route('/fileUpload', methods = ['POST','GET'])
def get_video():
	if request.method == 'POST':
		video_file = request.files['file']
		filename = secure_filename(video_file.filename)
		video_file.save(os.path.join('./video', filename))
        #저장할 경로 + 파일명	
		return jsonify({'success': True, 'file': 'Received', 'name': filename})

@app.route('/getdb', methods = ['POST','GET'])
def get_db():
	if request.method == 'POST':
		#db = pymysql.connect(host='127.0.0.1', port=3306, user='root', passwd='1234', db='GAGAGAGA', charset='utf8')
		cursor = db.cursor()
		cursor.execute("""
				SELECT name, img
        		FROM gagagaga.characters
				""")
		result = cursor.fetchall()
		print(result)
		#img = request.form['name']
		#return jsonify(result)

"""@app.route('/getdbimg', methods = ['POST'])
def get_img():	
	if request.method == 'POST':
		cursor = db.cursor()
		cursor.execute(
				#SELECT img
        		#FROM gagagaga.characters
				)
		result = cursor.fetchall()
		return jsonify(result)


#파일 넘겨줌
#file_list = os.listdir(app.config['UPLOAD_FOLDER'])
#filename = "".join(file_list)


@app.route('/fileDown', methods = ['POST'])
def download_file():
	if request.method == 'POST':
		f = request.form['name']
		print(f)
		path = "./video"
		print(path)
		try:
			return send_from_directory(path, f, as_attachment=True)
			#jsonify({'success': True, 'file': 'Received', 'name': f})
			#send_from_directory(path, f, as_attachment=True)
		except FileNotFoundError:
			abort(404)"""


#서버 실행
if __name__ == '__main__':
   app.run(port=5000, debug = True)