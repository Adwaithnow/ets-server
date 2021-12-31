import json
import sys
res={
        "message":200,
        "data":sys.argv[1],
    }
# print("TEST")
print(json.dumps(res))
# sys.stdout.flush()