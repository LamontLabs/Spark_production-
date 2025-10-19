# Installation (Spark v2.3)

## Prerequisites
- Node.js 20+, npm or yarn
- Expo CLI (`npm i -g expo`)
- Python 3.11+ (for export stub)

## Setup
git clone https://github.com/Lamont-Labs/Spark.git
cd Spark
make install

## Run Dev Server
make run

## Verify Determinism
make verify

## Export JSON
make export

## EAS Build
eas build --platform all
