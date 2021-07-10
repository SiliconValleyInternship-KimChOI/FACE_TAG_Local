from flask import Flask, render_template, request, jsonify 
from werkzeug.utils import secure_filename
from flask_cors import CORS
from flask import send_file
import json
import sys
import os

app = Flask(__name__)
app.config['UPLOAD_FOLDER'] = './video'
CORS(app)

"""@app.route('/', methods=['GET','POST'])
def get_video():
   video_data = request.get_json()"""

#파일 업로드 처리
@app.route('/fileUpload', methods = ['GET', 'POST'])
def get_video():
	if request.method == 'POST':
		video_file = request.files['file']
		filename = secure_filename(video_file.filename)
		video_file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))
        #저장할 경로 + 파일명
		"""filename = secure_filename(video_file.filename)
		video_file.save('./video')"""
		return jsonify({'success': True, 'file': 'Received'})


"""@app.route('/fileDown', methods = ['GET', 'POST'])
def down_file():
	if request.method == 'POST':
		sw=0
		files = os.listdir("./uploads")
		for x in files:
			if(x==request.form['file']):
				sw=1
		path = "./uploads/" 
		return send_file(path + request.form['file'],
				attachment_filename = request.form['file'],
				as_attachment=True)"""

#서버 실행
if __name__ == '__main__':
   app.run(port=5000, debug = True)