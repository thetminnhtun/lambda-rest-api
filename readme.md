# Lambda REST API

## Requirements

- [lambda-local](https://www.npmjs.com/package/lambda-local)

## Installation

- git clone
- Go project directoy
- Create `.env` and `.events`

```sh
cp .env.example .env
cp events.example.js events.js
```

- Install dependencies

```sh
npm install
```

## Testing

> Run in terminal

Get all posts

```sh
lambda-local -l src/index.js -h getAll -e src/events.js
```

Get specific posts

```sh
lambda-local -l src/index.js -h find -e events.js
```

Create posts

```sh
lambda-local -l src/index.js -h create -e src/events.js
```

Update posts

```sh
lambda-local -l src/index.js -h update -e src/events.js
```

Delete posts

```sh
lambda-local -l src/index.js -h delete -e src/events.js
```
