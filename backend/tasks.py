# Celery  5.1.2
# Redis  3.5.3
# Python 3.8.8
from celery import Celery
#from yolov5.detect import detect_class

from yolov5.detect import Detect_class
from yolov5.detect import Test


# Message Broker => Redis
BROKER_URL = 'redis://localhost:6379/0'
CELERY_RESULT_BACKEND = 'redis://localhost:6379/0'
celery = Celery('tasks', broker=BROKER_URL, backend=CELERY_RESULT_BACKEND)


@celery.task
def get_source(path):
    test = Test(path)
    print_test = test.test_print()
    

@celery.task
def get_db(path):
    detect = Detect_class(path)
    source = detect.get_source()
    db = detect.run()
    
    print('\n\n\n\n######################################### print from tasks - get_db #########################################################')
    print('\nsource_path: ', source)
    print('\ndb: ', db)
    
'''
# practical
@celery.task
def processing():
  # url = "https://gagagaga.s3.ap-northeast-2.amazonaws.com/abc+(1).mp4"
  example = "python ./yolov5/detect_test.py --source " + url + " --weights ./yolov5/best.pt"
  print(example)
  # test = detect_class("./weights_path", "./source_path")
  #test = detect_class("./yolov5/best.pt","video/abc.mp4")
  #timeline = test.main()
  #print(timeline)
'''

# test
@celery.task
def add(x,y):
  return x + y







