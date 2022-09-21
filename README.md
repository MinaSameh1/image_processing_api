# Image API

This is a project for Udacity nano-degree fullstack project, sponsored by [EgyptFWD](https://egfwd.com/) the goal is to create an API to serve images and modify their size/other attributes.

## Instructions for running the API

Build it first then start for production

```bash
npm run build
npm run start
```

If you are planning to develop then

```bash
npm run prepare
npm run dev # For hot reload
```

To run tests (Jasmine)

```bash
npm run test
```

To use the api, simply provide the image name (Image must be in `pictures` folder) in the filename query, Ex:

```
http://localhost:8000/api/img?filename=fjord.jpg&w=500&h=200
```

You can omit the h/w, but filename must be provided.

## API Endpoints

| Endpoint         | method | brief description                                                                          |
| ---------------- | ------ | ------------------------------------------------------------------------------------------ |
| /api/healthcheck | get    | Checks if api is working returns 200                                                       |
| /api/img         | get    | Requires `filename` query, supports `h` and `w` for height and width respectfully in query |

### Responses:

#### Method Get

| Status code | description |
| ----------- | ----------- |
| 200         | Success     |
| 400         | bad Request |
| 404         | not found   |
