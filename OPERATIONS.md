# Data validation

Run the following command to validate the data:

- clear ; npx jest

# Amazon Lex !!! CURRENTLY NO LONGER NEEDED !!!

Generation of amazon lex files

Comment: If migrating to Bedrock, we can probably delete these files from cdn...

## Generate cdn files

npx ts-node .\scripts\i18nExtraction.ts

## Upload cdn files

aws s3 cp .\cdn\messages.json s3://download.dotacoach.gg/dotaBrain/messages.json
