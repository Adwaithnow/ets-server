import sys

# print ('Number of arguments:', len(sys.argv), 'arguments.')
print ('Argument List:', str(sys.argv))
ok=sys.argv
if(len(ok)>1):
    print("OK")
else:
    print("No argument")