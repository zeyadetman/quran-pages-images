# Quran Pages Images

Public API to get quran (Moshaf) pages as jpg images

## APIs

1. Generating API Key to auth.

```curl
curl --location --request POST 'https://quran-pages.herokuapp.com/api/auth' \
--header 'Content-Type: application/json' \
--data-raw '{
	"email": "test@test.com",
	"password": "testtest"
}'
```

2. Get Moshaf page.

```curl
curl --location --request GET 'https://quran-pages.herokuapp.com/api/pages/<Page Number>' \
--header 'Authorization: <TOKEN> ' \
--data-raw ''
```

## Sample Page

Please check the `quran-images` folder.
