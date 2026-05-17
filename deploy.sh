#!/bin/bash

# THE NARC - Google Cloud Deployment Script

echo "🔥 Deploying THE NARC to Google Cloud..."

# Check if gcloud is installed
if ! command -v gcloud &> /dev/null; then
    echo "❌ Google Cloud SDK (gcloud) is not installed. Please install it first."
    echo "Visit: https://cloud.google.com/sdk/docs/install"
    exit 1
fi

# Build the app
echo "📦 Building the application..."
npm run build

if [ $? -ne 0 ]; then
    echo "❌ Build failed. Please fix the errors before deploying."
    exit 1
fi

# Deploy to Google App Engine
echo "🚀 Deploying to Google App Engine..."
gcloud app deploy

if [ $? -eq 0 ]; then
    echo "✅ Deployment successful! Your app is now live on Google Cloud."
    echo "🔗 Check your app at: https://[YOUR_PROJECT_ID].appspot.com"
else
    echo "❌ Deployment failed. Please check the error messages above."
    exit 1
fi
