#!/bin/bash

# Kill any existing Next.js processes
echo "Killing existing Next.js processes..."
pkill -f "next-server" || true
pkill -f "next dev" || true

# Wait a moment for processes to terminate
sleep 2

# Start turbo dev
echo "Starting turbo dev..."
turbo dev