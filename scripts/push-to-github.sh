#!/bin/bash

# StablePay GitHub Push Script
# This script helps you push your StablePay codebase to GitHub

echo "🚀 StablePay GitHub Push Helper"
echo "==============================="
echo ""

# Check if Git is installed
if ! command -v git &> /dev/null; then
    echo "❌ Git is not installed. Please install Git first."
    exit 1
fi

# Check if the directory is already a git repository
if [ ! -d .git ]; then
    echo "📦 Initializing Git repository..."
    git init
    echo "✅ Git repository initialized!"
else
    echo "✅ Git repository already exists"
fi

# Check remote status
REMOTE_EXISTS=$(git remote -v | grep -c "origin")
GITHUB_USERNAME=""

if [ $REMOTE_EXISTS -eq 0 ]; then
    echo ""
    echo "❓ What is your GitHub username?"
    read GITHUB_USERNAME
    
    if [ -z "$GITHUB_USERNAME" ]; then
        echo "❌ GitHub username cannot be empty"
        exit 1
    fi
    
    echo "🔗 Setting remote origin to github.com/$GITHUB_USERNAME/StablePay.git"
    git remote add origin "https://github.com/$GITHUB_USERNAME/StablePay.git"
    echo "✅ Remote origin set!"
else
    echo "✅ Remote origin already exists"
fi

# Add all files
echo ""
echo "📂 Adding all files to Git..."
git add .
echo "✅ Files added!"

# Commit changes
echo ""
echo "💾 Committing changes..."
git commit -m "Initial commit of StablePay - Enterprise-grade stablecoin payment solution on Solana"
echo "✅ Changes committed!"

# Push to GitHub
echo ""
echo "☁️ Pushing to GitHub..."
git push -u origin main || git push -u origin master
echo "✅ Code pushed to GitHub!"

echo ""
echo "==================================================="
echo "🎉 Success! Your StablePay code is now on GitHub!"
echo ""

if [ $REMOTE_EXISTS -eq 0 ] && [ -n "$GITHUB_USERNAME" ]; then
    echo "🌐 View your repository at: https://github.com/$GITHUB_USERNAME/StablePay"
fi

echo ""
echo "📝 Note: If you encountered a 'repository not found' error, please:"
echo "  1. Create a new repository named 'StablePay' on GitHub first"
echo "  2. Run this script again"
echo "===================================================" 