# Celery  5.1.2
# Redis  3.5.3
# Python 3.8.8
from celery import Celery
from yolov5.detect import Detect_class

# Message Broker => Redis
BROKER_URL = 'redis://localhost:6379/0'
CELERY_RESULT_BACKEND = 'redis://localhost:6379/0'
celery = Celery('tasks', broker=BROKER_URL, backend=CELERY_RESULT_BACKEND)

@celery.task
def processing(path):
  detect = Detect_class(path)
  timeline = detect.run()
  print('\nTimeline: ', timeline)
  return timeline

# @celery.task
# def processing(url):
#   #영상처리
#   # example = "python ./yolov5/detect_test.py --source " + url + " --weights ./yolov5/best.pt"
#   # os.system(example)
#   return 'hey'