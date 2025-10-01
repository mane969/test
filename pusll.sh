#!/bin/bash

# ==============================================================================
# Git Pull Script
# ==============================================================================
# This script safely pulls the latest changes from the remote repository.
# It uses --rebase to keep the project history clean and avoid unnecessary
# merge commits.
#
# INSTRUCTIONS:
# 1. Save this file as "pull.sh" in the root of your project directory.
# 2. Open your terminal (like Git Bash on Windows) in the project directory.
# 3. Run the script by typing: ./pull.sh
# ==============================================================================

# --- SCRIPT START ---
echo " "
echo "🚀 Pulling the latest changes from the server..."
echo "----------------------------------------"
echo " "

# Pull with rebase to maintain a clean, linear history
git pull --rebase

echo " "
echo "----------------------------------------"
echo "🎉 Pull complete! Your local repository is now up-to-date."
echo " "
