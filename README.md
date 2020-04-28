# Find Ur City

You can find the deployed project at [https://www.findur.city](https://www.findur.city)

## Contributors

|                                       [Alfonso Ruiz](https://github.com/alfonsoruiz)                                       |                                          [Jack Kim](https://github.com/jackskim)                                          |                                        [Logan Karnes](https://github.com/lkarnes)                                         |                                         [Zac Smith](https://github.com/mrzacsmith)                                          |
| :------------------------------------------------------------------------------------------------------------------------: | :-----------------------------------------------------------------------------------------------------------------------: | :-----------------------------------------------------------------------------------------------------------------------: | :-------------------------------------------------------------------------------------------------------------------------: |
|                     [<img src="./assets/alfonso.png" width = "200" />](https://github.com/alfonsoruiz)                     |                       [<img src="./assets/jack.jpeg" width = "200" />](https://github.com/jackskim)                       |                       [<img src="./assets/logan.png" width = "200" />](https://github.com/lkarnes)                        |                       [<img src="./assets/zac.jpeg" width = "200" />](https://github.com/mrzacsmith)                        |
|                  [<img src="https://github.com/favicon.ico" width="15"> ](https://github.com/alfonsoruiz)                  |                   [<img src="https://github.com/favicon.ico" width="15"> ](https://github.com/jackskim)                   |                   [<img src="https://github.com/favicon.ico" width="15"> ](https://github.com/lkarnes)                    |                   [<img src="https://github.com/favicon.ico" width="15"> ](https://github.com/mrzacsmith)                   |
| [ <img src="https://static.licdn.com/sc/h/al2o9zrvru7aqj8e1x2rzsrca" width="15"> ](https://www.linkedin.com/mralfonsoruiz) | [ <img src="https://static.licdn.com/sc/h/al2o9zrvru7aqj8e1x2rzsrca" width="15"> ](https://www.linkedin.com/in/jackskim/) | [ <img src="https://static.licdn.com/sc/h/al2o9zrvru7aqj8e1x2rzsrca" width="15"> ](https://www.linkedin.com/logan-karnes) | [ <img src="https://static.licdn.com/sc/h/al2o9zrvru7aqj8e1x2rzsrca" width="15"> ](https://www.linkedin.com/in/mrzacsmith/) |

<br>
<br>

![MIT](https://img.shields.io/packagist/l/doctrine/orm.svg)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)
![Code Coverage](https://api.codeclimate.com/v1/badges/d3f9ebd125b9496789a3/maintainability)
![Test Coverage](https://api.codeclimate.com/v1/badges/d3f9ebd125b9496789a3/test_coverage)

## Project Overview

[Trello Board](https://trello.com/b/R2QOaAEe/labspt7-juxta-city-data)

[Product Canvas](https://www.notion.so/Juxta-City-Data-06550a97dd9b41f1aea4b4b6de46ecb5)

[UX Design files](https://www.figma.com/file/YS5Ykd25k90FbD7UkDq2fa/Juxta-City-Data-Ryan-and-Stephen?node-id=769%3A23)

Find Ur City provides city data about important factors in deciding where to live, such as:

- Population
- Average resident age
- Climate
- Median household income
- Cost of living
- Average Commute time
- and much more!

Find Ur City presents this important data in an intuitive and easy to understand interface.

### Key Features

- Ability to search for a city located in the US
- Customized 'Recommended Cities' list based on user's survey selections
- View detailed information about individual cities
- Ability to save your Favorite cities

### Backend framework

This stack was used in complaince with the [Labs Engineering Standards](https://labs.lambdaschool.com/)

- NodeJS
- ExpressJS
- PostgreSQL
- REST
- JWT Authentication

#### Dependencies

- bcryptjs: ^2.4.3
- cors: ^2.8.5
- cross-env: ^7.0.0
- dotenv: ^8.2.0
- express: ^4.17.1
- express-session: ^1.17.0
- helmet: ^3.21.2
- jsonwebtoken: ^8.5.1
- knex: ^0.20.10
- knex-cleaner: ^1.3.0
- morgan: ^1.9.1
- pg: ^7.18.1

#### Development Dependencies

- jest: ^25.1.0
- nodemon: ^2.0.2
- supertest: ^4.0.2

# Testing

#### Jest and Supertest

Why?

- Uses Jest as the testing framework for Node
- Allows the testing of API routes
- Focus on simplicity
- Minimal configuration

# Installation Instructions

Make sure you have [PostgreSQL](https://www.postgresql.org/) and [pgAdmin4](https://www.pgadmin.org/) installed on your computer.

```sh
git clone https://github.com/Lambda-School-Labs/juxta-city-data-be.git
cd juxta-city-data-be
npm install
npm run start
```

## Other Scripts

    * server    - runs the app in development mode using nodemon
    * start     - runs the app in development mode using node
    * test      - runs the test watcher in an interactive mode
    * coverage  - generates a test coverage report
    * mlt       - runs knex migrate latest in testing enviroment
    * mrt       - runs knex migrate rollback in testing enviroment
    * ml        - runs knex migrate latest
    * mr        - runs knex migrate rollback
    * srt       - runs knex seed run in testing enviroment
    * sr        - runs knex seed run

## Endpoints

#### Server Test Route

| Method | Endpoint | Access Control | Description                                            |
| ------ | -------- | -------------- | ------------------------------------------------------ |
| GET    | `/`      | all users      | Returns server is running confimation of `Hello City`. |

#### Authentication Routes

| Method | Endpoint           | Access Control | Description                |
| ------ | ------------------ | -------------- | -------------------------- |
| POST   | `/api/auth/signup` | all users      | Create a new user sign up. |
| POST   | `/api/auth/signin` | all users      | Current user sign in.      |

#### User Routes

| Method | Endpoint         | Access Control   | Description                          |
| ------ | ---------------- | ---------------- | ------------------------------------ |
| GET    | `/api/users/`    | registered users | Returns info for the logged in user. |
| GET    | `/api/users/:id` | registered users | Returns individual user              |
| PUT    | `/api/users/:id` | registered users | Updates individual user              |
| DELETE | `/api/users/:id` | registered users | Delete individual user               |

#### Favorite Routes

| Method | Endpoint                           | Access Control   | Description                                 |
| ------ | ---------------------------------- | ---------------- | ------------------------------------------- |
| GET    | `/api/users/:id/favorites`         | registered users | Returns favorites for an individual user.   |
| POST   | `/api/users/:id/favorites`         | registered users | Creates a favorites for an individual user. |
| DELETE | `/api/users/:id/favorites/:cityId` | registered users | Deletes favorites for individual user.      |

# AUTHENTICATION JSON

#### Register Examples (required fields only)

---

```
{
  "username": "ronmac",
  "email": "ron@arches.com",
  "password": "happymeal",
  "first_name": "ronald",
  "last_name": "mcdonald",
  "dob": "1963-03-28",

}
```

#### Login (required)

---

```
{
  "username": "ronmac",
  "password": "happymeal",
}
```

# Data Model

#### USERS

---

```
{
  id: INCREMENT
  username: STRING,
  password: STRING,
  first_name: STRING,
  last_name: STRING,
  dob: DATE,
  address: STRING,
  city: STRING,
  state: STING,
  zip: INTEGER
}
```

#### FAVORITES

---

```
{
  user_id: INTEGER,
  city_id: INTEGER
}
```

## Actions

`add(favorite)` -> Adds a new favorite to the user

`get(user_id)` -> Returns a single user by ID to retreive their favorites

`getAll()` -> Returns all favorites

`remove(user_id, city_id)` -> Returns the created org

<br>
<br>

`add()` -> Adds a new user

`getBy(filter)` -> Returns user based on filter

`getById(id)` -> Returns a single user by user ID

`getAll()` -> Returns all users

`update(user, id)` -> Updates the user

`remove(id)` -> deletes everything dependent on the user

## Contributing

When contributing to this repository, please first discuss the change you wish to make via issue, email, or any other method with the owners of this repository before making a change.

Please note we have a [code of conduct](./code_of_conduct.md). Please follow it in all your interactions with the project.

### Issue/Bug Request

**If you are having an issue with the existing project code, please submit a bug report under the following guidelines:**

- Check first to see if your issue has already been reported.
- Check to see if the issue has recently been fixed by attempting to reproduce the issue using the latest master branch in the repository.
- Create a live example of the problem.
- Submit a detailed bug report including your environment & browser, steps to reproduce the issue, actual and expected outcomes, where you believe the issue is originating from, and any potential solutions you have considered.

### Feature Requests

We would love to hear from you about new features which would improve this app and further the aims of our project. Please provide as much detail and information as possible to show us why you think your new feature should be implemented.

### Pull Requests

If you have developed a patch, bug fix, or new feature that would improve this app, please submit a pull request. It is best to communicate your ideas with the developers first before investing a great deal of time into a pull request to ensure that it will mesh smoothly with the project.

Remember that this project is licensed under the MIT license, and by submitting a pull request, you agree that your work will be, too.

#### Pull Request Guidelines

- Ensure any install or build dependencies are removed before the end of the layer when doing a build.
- Update the README.md with details of changes to the interface, including new plist variables, exposed ports, useful file locations and container parameters.
- Ensure that your code conforms to our existing code conventions and test coverage.
- Include the relevant issue number, if applicable.
- You may merge the Pull Request in once you have the sign-off of two other developers, or if you do not have permission to do that, you may request the second reviewer to merge it for you.

### Attribution

These contribution guidelines have been adapted from [this good-Contributing.md-template](https://gist.github.com/PurpleBooth/b24679402957c63ec426).

## Documentation

See [Findur.City Frontend Documentation](https://github.com/Lambda-School-Labs/juxta-city-data-fe) for details on the frontend of our project.
