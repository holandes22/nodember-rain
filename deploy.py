import os
import boto

# Before running this script, set envars AWS_ACCESS_KEY_ID
# and AWS_SECRET_ACCESS_KEY, Boto uses them automatically
# ember build --environment="production"

print boto.s3.regions()
conn = boto.connect_s3()
bucket = conn.get_bucket('nodember-rain')

for root, folder, files in os.walk('frontend/dist'):
    for filename in files:
        file_path = os.path.join(root, filename)
        print 'Uploading file: {}'.format(file_path)
        key = bucket.new_key(file_path[len('frontend/dist'):])
        key.size = os.stat(file_path).st_size
        key.set_contents_from_filename(file_path)
        key.set_acl('public-read')

print 'Done uploading'
