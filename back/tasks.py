import os
import sys
import time

from flask import Flask
from flask import request
from flask import jsonify

from celery import Celery

BROKER_URL = 'redis://localhost:6379/0'
CELERY_RESULT_BACKEND = 'redis://localhost:6379/0'
app = Celery('tasks', broker=BROKER_URL, backend=CELERY_RESULT_BACKEND)

@app.task
def add(x, y):
        return x + y