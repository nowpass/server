# NOWPASS API Backend server

> Please note that NOWPASS is currently in alpha stage.

The node / sails.js based backend server for the open source NOWPASS password manager.
You can use it to set up your own NOWPASS backend at your local computer or on an server.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

Clone the project or use one of the release. As a first step you must install all dependencies needed to run the application.

```
git clone --depth 1 https://github.com/nowpass/server
```

Install sails.js globally (optional):

```
npm install sails -g
```

### Installing

After checking out the repository, you first have to install all needed dependencies.

```
cd server
npm install
```

After this set up your database (preconfigured is mysql, but you can use any database supported by waterfall ORM).
You need to create the database manually.

Edit `config/datastores.js` and `config/env/production.js` (or `config/env/staging.js` for development) and add your database adapter and URL:

```
adapter: 'sails-mysql',
url: 'mysql://root:password@localhost:3306/nowpass',
```

## Running the service

You should configure the initial user (which is created during bootstrap) in the `config/bootstrap.js` file,
after this you can run the service with:

```
sails lift
```

Visit http://localhost:1337 to access the web frontend, manage or create users etc.


## Versioning

We follow [SemVer](http://semver.org/) for releases. For the versions available, see the [tags on this repository](https://github.com/nowpass/server/tags).

## License

This project is licensed under the GPL License - see the [LICENSE.md](LICENSE.md) file for details

