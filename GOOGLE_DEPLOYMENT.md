# Google Cloud Deployment Guide for THE NARC

## Prerequisites

1. **Google Cloud Account**: Create a Google Cloud account if you don't have one
2. **Enable Billing**: Make sure billing is enabled for your project
3. **Install gcloud CLI**: Download and install Google Cloud SDK
4. **Node.js**: Ensure Node.js is installed on your machine

## Setup Instructions

### 1. Initialize Google Cloud Project

```bash
# Install gcloud CLI if not already installed
# Visit: https://cloud.google.com/sdk/docs/install

# Login to your Google Cloud account
gcloud auth login

# Set up application default credentials
gcloud auth application-default login

# Create a new project (or use existing)
gcloud projects create the-narc-app

# Set your project
gcloud config set project the-narc-app

# Enable required APIs
gcloud services enable appengine.googleapis.com
gcloud services enable cloudbuild.googleapis.com
```

### 2. Configure App Engine

```bash
# Choose your region
gcloud app create --region=us-central

# Verify setup
gcloud app describe
```

### 3. Deploy the Application

```bash
# Navigate to your project directory
cd THE-NARC-main

# Install dependencies
npm install

# Build the application
npm run build

# Deploy to Google App Engine
gcloud app deploy

# Follow the prompts to confirm deployment
```

### 4. Alternative: Use the Deploy Script

```bash
# Make the deploy script executable (Linux/Mac)
chmod +x deploy.sh

# Run the deployment script
./deploy.sh
```

## Environment Variables

The app is configured to use your OpenRouter API key. The key is already set in:
- `.env` file (for local development)
- `app.yaml` file (for production deployment)

## Post-Deployment

1. **Access Your App**: Visit `https://[YOUR_PROJECT_ID].appspot.com`
2. **Monitor Performance**: Use Google Cloud Console to monitor app performance
3. **View Logs**: Check application logs with `gcloud app logs tail -s default`

## Scaling Configuration

The app is configured with:
- **Minimum instances**: 0 (scales to zero when not in use)
- **Maximum instances**: 2 (prevents unexpected cost spikes)
- **Instance class**: F2 (balanced performance and cost)

## Cost Management

To control costs:
1. Set up budget alerts in Google Cloud Console
2. Monitor usage regularly
3. Consider using the `--no-promote` flag for staged deployments
4. Set up automatic scaling limits

## Troubleshooting

### Common Issues

1. **Build Failures**: Ensure all dependencies are installed
2. **API Key Errors**: Verify OpenRouter API key is correctly set
3. **Deployment Timeout**: Increase instance class if needed
4. **CORS Issues**: The app handles CORS, but verify if issues arise

### Debug Commands

```bash
# View deployment logs
gcloud app logs tail -s default

# Check app status
gcloud app describe

# List deployments
gcloud app versions list
```

## Security Considerations

1. **API Key Security**: Your OpenRouter API key is stored in environment variables
2. **HTTPS Only**: The app is configured to use HTTPS only
3. **Firewall Rules**: Google App Engine provides built-in security

## Custom Domain (Optional)

To use a custom domain:

```bash
# Verify domain ownership
gcloud domains verify [YOUR_DOMAIN]

# Map custom domain
gcloud app domain-mappings create [YOUR_DOMAIN]
```

## Backup and Recovery

Google App Engine automatically handles:
- Application backups
- Version rollbacks
- Disaster recovery

For additional safety:
1. Regularly export your configuration
2. Keep your source code in version control
3. Document any custom configurations
