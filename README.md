# Internal user management in the OCC

![Badge em Desenvolvimento](http://img.shields.io/static/v1?label=STATUS&message=IN%20DEVELOPMENT&color=GREEN&style=for-the-badge)
![](https://img.shields.io/github/license/cristhoffer-nunes/solid-users-management?style=for-the-badge&color=GREEN)

A Nodejs application with Typescript responsible for performing internal OCC user management across all environments registered in the database.

## Features:

- `Authentication`: Authentication system to access the application and make requests to the endpoints using JWT.

- `Environment Search`: Search for all environments registered in the database.

- `User Search`: Query whether the user is registered in the OCC environments

- `User Update`: Deactivate the active user in lower-level OCC environments

## Accessing the project:

Just download the project or run the command

```bash
$ git clone https://github.com/cristhoffer-nunes/solid-users-management.git

$ cd solid-users-management
```

## Setting up the project

1.  You must download all the dependencies to the root of the project with the command below.

2.  After downloading the dependencies you must make the necessary database settings via an .env file and set the JWT key.

#### Example .env file :

```
DATABASE_URL= ""

JWT_PASS = ""
```

## Starting the server:

After configuring the project, run the project with:

```bash
$ npm run start
```

## Endpoints:

- `Authentication` : POST /authenticate

```bash
{
  "email": "your_email@email.com",
  "password": "your_password"
}
```

- `Environment Search` : GET /environments

Authorization: Bearer _token generated from authentication_

- `User Search`: POST /profiles

Authorization: Bearer _token generated from authentication_

```bash
{
  "email": "any_email@email.com"
}
```

- `User Update`: PUT /profiles

Authorization: Bearer _token generated from authentication_

```bash
{
  "email": "any_email@email.com"
}
```
