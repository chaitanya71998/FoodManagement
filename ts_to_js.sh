find src -name "*.tsx" -exec sh -c 'mv "$0" "${0%.tsx}.js"' {} \;
find src -name "*.ts" -exec sh -c 'mv "$0" "${0%.ts}.js"' {} \;

npm i customize-cra react-app-rewired --save-dev
npm i