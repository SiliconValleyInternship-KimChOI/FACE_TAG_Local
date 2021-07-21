# Celery  5.1.2
# Redis  3.5.3
# Python 3.8.8

from celery import Celery

# detect.py
from yolov5.detect_test import main, run


BROKER_URL = 'redis://localhost:6379/0'
CELERY_RESULT_BACKEND = 'redis://localhost:6379/0'
app = Celery('tasks', broker=BROKER_URL, backend=CELERY_RESULT_BACKEND)


@app.task
def add(x, y):
  return x + y

@app.task
def get_db(path):
    #detect = main(path)
    db_return = run(path)
    print(db_return)


