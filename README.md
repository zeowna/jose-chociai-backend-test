# Tractian - Back End Software Engineer - José Lucas Chociai

## Context

Our users, Emerson and Roberta, are maintenance managers at Industria Freios Supremos (auto parts manufacturer), and
they have **2 units** and **10 assets** (machines) in total. They would like to be able to register and view both the
units separately, as well as have an overview that condenses the data from the two units.

## **Challenge**

<aside>
📌 **Build a CRUD where the user can register companies, units, assets and users.**

</aside>

## **Important:**

- Each asset must have an image, name, description, model, owner, status and health level;
- Each asset is part of a unit;
- Each unit is part of a company;
- Every user is part of a company;
- There are three types of status: Running, Alerting, Stopped;
- Health level needs to be between 0% to 100%.

## **Mandatory:**

- Database (MongoDB)
- Engine (NodeJS w/ Express)
- Typescript

## **Differentials:**

- Design Standard (Clean Code/Clean Architecture).

💡 Please, be able to abstract well the presented problem and define it yourself which data you consider most important.
Think with the user's head: What does an industry person need to know about their assets?
In addition to the required libraries, you can use anything else and at the end publish your code on GitHub
and [deploy](https://dev.to/yuribenjamin/how-to-deploy-react-app-in-github-pages-2a1f) the application
(Heroku suggestion) because we want to see it online, then send us the links. 🔥

## Running the app

Docker and Docker Compose are required to run the App

```bash
$ docker compose up
```

## Technologies used:

- Docker Compose
- Database (MongoDB)
- Nestjs 9 and Typescript 5.0.0
- Mongoose 7.2.4
- Class Validator/Class Transformer

Although it demands ExpressJS, I decided to use Nest because it's what I've been working lately.

Nest provides a Monorepo mode, so I decided to use it and make easier to organize libs and apps.
Other thing was the use of @nestjs/* libs, in order to keep things the "Nest" way as possible for this test,
Hope you'll see some nice abstractions along the way.
