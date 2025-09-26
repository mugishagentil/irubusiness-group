#!/bin/sh

# Start backend in background
cd backend
npm install
npm run dev &

# Build and serve frontend
cd ../frontend
npm install
npm run build
npx serve -s build -l 8080
