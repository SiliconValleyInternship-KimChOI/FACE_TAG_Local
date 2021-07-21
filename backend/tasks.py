# Celery  5.1.2
# Redis  3.5.3
# Python 3.8.8

from celery import Celery
from flask import config
from app import video_path
# detect.py
import yolov5.detect as detect


BROKER_URL = 'redis://localhost:6379/0'
CELERY_RESULT_BACKEND = 'redis://localhost:6379/0'
app = Celery('tasks', broker=BROKER_URL, backend=CELERY_RESULT_BACKEND)
path = './video'
@app.task
def pass_video():

