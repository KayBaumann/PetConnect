#!/bin/bash
echo "Git Pull..."
git pull

echo "Installiere Abhängigkeiten..."
npm install

echo "Baue Projekt..."
npm run build

echo "Deployment abgeschlossen! Inhalte wurden direkt nach httpdocs gebaut."
