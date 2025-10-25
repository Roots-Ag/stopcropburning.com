#!/bin/bash

# Sanity Studio Setup Script for Stop Crop Burning
# This script will guide you through setting up Sanity CMS

echo "🌾 Stop Crop Burning - Sanity CMS Setup"
echo "========================================"
echo ""

# Check if Sanity CLI is installed
if ! command -v sanity &> /dev/null
then
    echo "📦 Installing Sanity CLI..."
    npm install -g @sanity/cli
else
    echo "✅ Sanity CLI already installed"
fi

echo ""
echo "🔐 Step 1: Login to Sanity"
echo "This will open your browser to login/signup"
echo ""
sanity login

echo ""
echo "🆕 Step 2: Create Sanity Project"
echo ""

# Create sanity-studio directory if it doesn't exist
mkdir -p sanity-studio
cd sanity-studio

# Initialize Sanity project
echo "When prompted:"
echo "  - Project name: Stop Crop Burning"
echo "  - Use default dataset: Y"
echo "  - Dataset name: production"
echo "  - Output path: ."
echo "  - Template: Clean project (no predefined schemas)"
echo ""

sanity init

echo ""
echo "📋 Step 3: Copy Schema Files"
echo ""

# Copy schema files
cp -r ../sanity/schemas/* ./schemas/

echo "✅ Schema files copied"

echo ""
echo "🔧 Step 4: Configure Sanity"
echo ""

# Get project ID
PROJECT_ID=$(sanity debug --secrets | grep 'Project ID' | awk '{print $3}')

if [ -z "$PROJECT_ID" ]; then
    echo "❌ Could not detect project ID automatically"
    echo "Please run: sanity debug --secrets"
    echo "And manually copy your Project ID"
else
    echo "✅ Detected Project ID: $PROJECT_ID"

    # Update .env.local in parent directory
    cd ..
    sed -i.bak "s/NEXT_PUBLIC_SANITY_PROJECT_ID=.*/NEXT_PUBLIC_SANITY_PROJECT_ID=$PROJECT_ID/" .env.local
    echo "✅ Updated .env.local with Project ID"
fi

echo ""
echo "🎨 Step 5: Start Sanity Studio"
echo ""
cd sanity-studio
echo "Starting Sanity Studio on http://localhost:3333"
echo ""
echo "Next steps:"
echo "1. Open http://localhost:3333 in your browser"
echo "2. Add content for Problems and Solutions"
echo "3. Make sure to add BOTH English and Thai translations"
echo "4. Click 'Publish' for each item"
echo ""
echo "Press Ctrl+C to stop the studio when you're done"
echo ""

npm run dev
