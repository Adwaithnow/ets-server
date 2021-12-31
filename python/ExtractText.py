import textract
import json
import sys
def GetText(path):
    text = textract.process(path, encoding='utf8', method='tesseract')
    print(path)
    text = text.decode("utf8")
    text = text.replace("\n", "")
    # print(text)
    res={
        "Response":200,
        "File":path,
        "data":text
    }
    print(json.dumps(res))
    sys.stdout.flush()
if(len(sys.argv)>1):
    GetText(sys.argv[1])
else:
    res={
        "message":"Something Happend",
        "data":sys.argv
    }
    print(json.dumps(res))
# import time
  
# i = 0 

# def notify():

# while(True):
#     notify()
#     time.sleep(60*5)
#     print(i)
#     i=i+1

#add cool graphics based on performance for motivation..
#that is once you figure out to interact with that toast