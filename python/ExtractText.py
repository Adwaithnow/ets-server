import textract
import json
import sys
def GetText(path):
    try:
        text = textract.process(path, encoding='utf8', method='tesseract')
        text = text.decode("utf8")
        text = text.replace("\n", "")
        # print(text)
            # "File":path,

        res={
            "message":200,
            "data":text
        }
        print(json.dumps(res))
        sys.stdout.flush()
    except Exception as e:
        res={
            "message": "EXCEPTION",
            "data": e
        }
        print(json.dumps(res))
        sys.stdout.flush()

if(len(sys.argv)>1):
    GetText(sys.argv[1])
else:
    res={
        "message":"No Argument",
        "data":sys.argv
    }
    print(json.dumps(res))