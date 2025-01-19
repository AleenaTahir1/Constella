# Initialize npm project and install dependencies
npm install

# Create necessary directories if they don't exist
if (!(Test-Path "src")) { mkdir src }
if (!(Test-Path "src\components")) { mkdir src\components }
if (!(Test-Path "src\assets")) { mkdir src\assets }
if (!(Test-Path "src\styles")) { mkdir src\styles }
if (!(Test-Path "src\pages")) { mkdir src\pages }
if (!(Test-Path "src\context")) { mkdir src\context }
if (!(Test-Path "src\hooks")) { mkdir src\hooks }
if (!(Test-Path "src\utils")) { mkdir src\utils }

# Start the development server
npm run dev
