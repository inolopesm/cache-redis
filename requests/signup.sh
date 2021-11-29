curl \
  -X POST \
  -H "content-type: application/json" \
  -d "{\"name\": \"fulano\", \"email\": \"fulano@dev.com\", \"password\": \"123456\"}" \
  http://localhost:3333/signup

echo
