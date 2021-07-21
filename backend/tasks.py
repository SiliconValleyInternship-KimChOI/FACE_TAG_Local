# Celery  5.1.2
# Redis  3.5.3
# Python 3.8.8
from celery import Celery
import os
from yolov5.detect import detect_class

# Message Broker => Redis
BROKER_URL = 'redis://localhost:6379/0'
CELERY_RESULT_BACKEND = 'redis://localhost:6379/0'
celery = Celery('tasks', broker=BROKER_URL, backend=CELERY_RESULT_BACKEND)

# practical
@celery.task
def processing(url):
  #영상처리
  #example = "python ./yolov5/detect_test.py --source " + url + " --weights ./yolov5/best.pt"
  #os.system(example)
  
  #python ./yolov5/detect_test.py --source video/abc.mp4 --weights ./yolov5/best.pt
  #test = detect_class("./weights_path", "./source_path")
  #test = detect_class("./yolov5/best.pt","video/abc.mp4")
  #timeline = test.main()
  return '완료'

# test
@celery.task
def add(x,y):
  return x + y
