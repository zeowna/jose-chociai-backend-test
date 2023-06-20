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
$ docker compose up gateway
```

I suggest that you run Kafka container in another terminal session, because sometimes it freezes out nowhere.

```bash
$ docker compose up kafka
```

## Technologies used:

- Docker and Docker Compose
- MongoDB
- Mongoose 7.2.4
- Nestjs 9 and Typescript 5.0.0
- Class Validator/Class Transformer
- Kafka

Although it demands ExpressJS, I decided to use Nest because it's what I've been working lately.

Nest provides a Monorepo mode, so I decided to use it and make easier to organize libs and apps.
Other thing was the use of @nestjs/* libs, in order to keep things the "Nest" way as possible for this test,
Hope you'll see some nice abstractions along the way.

## Libraries

### @zeowna/common

All basic stuff:

- AbstractEntity;
- ServiceInterface and AbstractService;
- RepositoryInterface;
- Types
- Interceptors (Presenter)

### @zeowna/mongoose

Extends @zeowna/common Abstractions for Mongoose:

- AbstractMongooseEntity;
- AbstractMongooseRepository.

### @zeowna/logger

Abstractions for log

- LoggerInterface;
- NestLoggerService (Example of Possible Implementation);
- ConsoleLoggerService (Example of Possible Implementation).

### @zeowna/kafka

Custom nest Kafka module and Producer.

### @zeowna/auth

Reusable things for authentication and authorization

- AbstractAuthService;
- AuthGuard.

### @zeowna/entities-definition

Provides POJO Entities typings

- PlainEntity and etc.

## Apps

## Users

Provides Users and Auth resources (Restful API) and a Kafka Producer.

- Users CRUD;
- Auth (signIn);
- Produces messages for Users creation and updates ;
- [OpenApi Documentation](http:localhost:3000/api).

## Companies

Provides Companies resource (Restful API) and a Kafka Producer/Consumer.

- Companies CRUD;
- Produces messages for Companies creation and updates;
- Consumes Units creation and updates (keeps local copies in its own DB and stores last 10 related to company as
  subset).
- [OpenApi Documentation](http:localhost:3001/api).

## Units

Provides Units resource (Restful API) and a Kafka Producer/Consumer.

- Units CRUD;
- Produces messages for Units creation and updates;
- Consumes Companies creation and updates (keeps local copies in its own DB)
- [OpenApi Documentation](http:localhost:3002/api).

## Assets

Provides Assets resource (Restful API) and a Kafka Producer/Consumer.

- Assets CRUD;
- Produces messages for Assets creation and updates;
- Consumes Units creation and updates (keeps local copies in its own DB)
- Consumes Companies creation and updates (keeps local copies in its own DB)
- [OpenApi Documentation](http:localhost:3003/api).

## Alerts

Provides Kafka Consumer.

- Consumes Assets Health Level updates and Notifies its Company 
