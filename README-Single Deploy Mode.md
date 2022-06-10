# gameday-serverless-app

For a simpler deployment process to get the application running, you can run this app with a hybrid server + serverless architecture. Instead of fronting the presentation tier on S3, we will host the static files on an EC2 VM and Apache HTTPD Server. We still have the benefits of a serverless backend, which will allow rapid scaling of the backend business logic on high read loads. 

Instructions to deploy the application:
1. Go to AWS, and ensure that your region is ap-southeast-1 (Singapore)
2. Go to CloudFormation:
   (i)   Click on "Create Stack"
   (ii)  On the create stack page, select "Upload a Template File"
   (iii) In the source bundle, go to the cfn folder and upload the gameday-cfn-ec2.yaml file
   (iv)  Select next and enter any stack name (e.g. "gameday-stack")
   (v)   Continue to click next, up to the stack creation point
4. Go to the EC2 console and find the VM created by CloudFormation. 
   Copy the public IP (or DNS name) and paste it in the browser to view the website