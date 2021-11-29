curl \
  -X POST \
  -H "content-type: application/json" \
  -d "{\"email\": \"fulano@dev.com\", \"password\": \"123456\"}" \
  http://localhost:3333/login

echo
