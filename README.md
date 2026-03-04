# Catálogo de Suministros Médicos

A lightweight, single-page professional catalog designed for medical supply distribution in the medical market. 

## Overview
This project enables non-technical inventory management by using **Google Sheets as a CMS**. The business owner can update product availability, descriptions, and pricing in a spreadsheet, which reflects live on the website.

## Tech Stack
- **Frontend:** React + Vite
- **Styling:** Tailwind CSS (Mobile-first, responsive design)
- **Data Management:** Google Sheets API / PapaParse (CSV)
- **Deployment:** Vercel / Netlify (CI/CD)

## Features
- **One-Page Navigation:** Smooth scrolling between About, Business, and Products.
- **Dynamic Inventory:** Real-time synchronization with external spreadsheets.
- **Direct Lead Gen:** Contact form and WhatsApp integration for manual order processing.
- **Spanish Localization:** Fully translated interface for the target demographic.

## Setup
1. `npm install`
2. Configure `.env` with Google Sheets API Key and Sheet ID.
3. `npm run dev`
