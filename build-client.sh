#!/bin/bash

echo "Building AMS Portal Client..."
echo "================================"

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
    echo "Installing dependencies..."
    npm install
    if [ $? -ne 0 ]; then
        echo "Failed to install dependencies"
        exit 1
    fi
fi

# Build the React application
echo "Building React application..."
npm run build

if [ $? -ne 0 ]; then
    echo "Build failed!"
    exit 1
else
    echo "Build completed successfully!"
    echo "Build files are in the 'build' directory"
    
    # Create a tar.gz file of the build
    if [ -d "build" ]; then
        echo "Creating deployment package..."
        tar -czf ams-portal-client-build.tar.gz -C build .
        echo "Deployment package created: ams-portal-client-build.tar.gz"
    fi
fi

echo "================================"
echo "Client build process completed!"