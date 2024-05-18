# Generate cdn files

npx ts-node .\scripts\i18nExtraction.ts

# Upload cdn files

aws s3 cp .\cdn\messages.json s3://download.dotacoach.gg/dotaBrain/messages.json
