from flask import Flask, render_template, request
from werkzeug.utils import secure_filename
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

#업로드 HTML 렌더링
@app.route('/')
def render_file():
   return render_template('index.html')

#파일 업로드 처리
@app.route('/fileUpload', methods = ['GET', 'POST'])
def upload_file():
   if request.method == 'POST':
      f = request.files['file']
      return f.filename
      #저장할 경로 + 파일명
      #f.save(secure_filename(f.filename))

if __name__ == '__main__':
    #서버 실행
   app.run(debug = True)
