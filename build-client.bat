@echo off
echo Building AMS Portal Client...
echo ================================

REM Check if node_modules exists
if not exist "node_modules" (
    echo Installing dependencies...
    npm install
    if errorlevel 1 (
        echo Failed to install dependencies
        pause
        exit /b 1
    )
)

REM Build the React application
echo Building React application...
npm run build

if errorlevel 1 (
    echo Build failed!
    pause
    exit /b 1
) else (
    echo Build completed successfully!
    echo Build files are in the 'build' directory
    
    REM Create a zip file of the build
    if exist "build" (
        echo Creating deployment package...
        powershell -command "Compress-Archive -Path 'build\*' -DestinationPath 'ams-portal-client-build.zip' -Force"
        echo Deployment package created: ams-portal-client-build.zip
    )
)

echo ================================
echo Client build process completed!
pause