# Zenitech assignment application

Store application built with Node.js, Express, Mongoose and React

## Table of Contents

- [Getting Started](#getting-started)
- [API calls](#api-calls)

## Getting Started

To start up server type in:

```

npm run dev

```

and to start up client side type in:

```

npm start

```

This should open up a new browser tab point to "http://localhost:8080/"

## API calls

Server API calls could be accessed through "http://localhost:3001/api/"

More test API calls could be found in "categories.rest" and "items.rest" files. Here are some of the examples:

GET all data

```

http://localhost:3001/api/

```

GET all categories

```

http://localhost:3001/api/categories

```

GET single category by name

```

http://localhost:3001/api/categories/:name

```

GET sales for particular category

```

http://localhost:3001/api/categories/:name/sales

```

POST create a category with body added to request in JSON

```

http://localhost:3001/api/categories

```
