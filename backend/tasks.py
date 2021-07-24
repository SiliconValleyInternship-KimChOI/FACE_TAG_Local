# Celery  5.1.2
# Redis  3.5.3
# Python 3.8.8
# Windows : celery -A tasks worker --pool=solo -l info
# Mac : celery -A tasks worker --loglevel=info 
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