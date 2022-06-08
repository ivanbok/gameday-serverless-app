# gameday-serverless-app

This repository contains the application code for a serverless stateless web application deployed on AWS Lambda. The main architecture involves a static S3 website and client-side code to invoke API calls to an API Gateway + Lambda + DynamoDB backend. 

Instructions to deploy the application:
1. Go to AWS, and ensure that your region is ap-southeast-1 (Singapore)
2. Go to CloudFormation:
   (i)   Click on "Create Stack"
   (ii)  On the create stack page, select "Upload a Template File"
   (iii) In the source bundle, go to the cfn folder and upload the gameday-cfn.yaml file
   (iv)  Select next and enter any stack name (e.g. "gameday-stack")
   (v)   Continue to click next, up to the stack creation point
4. Go to the source bundle, and open the load.js file in the js/ folder
   (i)   At the same time, go to API Gateway, and find the API that was created (named RacingResultsAPI)
   (ii)  Go to Stages>Prod, and copy the invoke url, omitting the /prod at the end
   (iii) Go to the load.js file, and replace the apiurl variable with this updated invoke url (once again, omitting the /prod)
3. After the stack has been created, go to the S3 bucket created by the CloudFormation Template. 
   It should have the name gameday-stack-s3bucket followed by a random string
4. Upload the following files/folders from the source bundle into the S3 bucket:
   (i)   index.html
   (ii)  calendar.html
   (iii) js/
   (iv)  static/
5. Go to bucket > Properties, and scroll down to Static Website Hosting. 
Click on the bucket website endpoint to launch the website