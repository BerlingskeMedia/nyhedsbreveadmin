# nyhedsbreveprofiladmin

This is a web application that can be used for 1) setting up newsletters in
"Hjulet", 2) creating Smartlinks, and 3) administration of customers.

The application has been built using Angular.js v1.4 and includes a bare-bones
node.js-based backend that provides static file serving of the frontend.

The application communicates with MDB via the REST-based MDB API. More
documentation on the API is available at [https://github.com/BerlingskeMedia/mdbapi].


## For Developers

env variables:
- MDBAPI_ADDRESS=http://localhost
- MDBAPI_PORT=8000
- BPC_URL=https://bpc.berlingskemedia-testing.net
- BPC_APP_KEY=475963b8c832310bc1c40be462a969a7b5104fc812f2d40a27
- BPC_APP_ID=nyhedsbreveprofiladmin
- PORT=8080

You'll need a recent version of node.js, _v4.2.2 or newer_. You can build the
application by running;

```
npm install
```

There's a simple node-based web server included that can serve the application
as static files. Simply run;

```
npm start
```

And you can restart the server automatically when the source code is changed;

```
npm run dev
```

### Documentation

* [https://code.angularjs.org/1.4.14/docs/api]
* [https://ui-router.github.io/ng1/docs/0.2.15/#/api/ui.router]
* [https://developers.google.com/identity/sign-in/web/sign-in]
* [https://developers.google.com/identity/sign-in/web/reference]

## Deploying to Production

When merging changes into the `Production` branch on GitHub, Jenkins will
automatically build and deploy the Docker images for that release.

Deployment time varies, but is somewhere between 5-15 minutes after the build
has finished in Jenkins.


# Administration of profil.berlingskemedia.dk

Features supported include setting up publishers, newsletters and locations as
well as managing interests and permissions.


## Publishers

This is a simple list of publishers with inline editing of eg. name, picture URL
and other data.

Data is exchanged with MDBAPI via the endpoint `/publishers`.


## Nyhedsbreve

a simple list of newsleters without inline editing. It's possible to filter by
name, publisher etc.

Data is exchanged with MDBAPI via the endpoint `/nyhedsbreve`.


## Interesser

A list of interests, supporting filtering by name. Interests can be edited, and
new ones created.

Data is exchanged with MDBAPI via the endpoint `/interesser`.


## Permissions

A simple list of permissions. _Note - Needs more info._


## Location

A list of locations.

Data is exchanged with MDBAPI via the endpoint `/locations`.


# Smartlink builder

This page aids the user in constructing Smartlinks. It has a form where the user
can generate a Smartlink based on several choices, including specific
newsletters, interests, permissions, locations, actions, date ranges etc.

The Smartlink can freely be copied into wherever it's needed.

The form posts Smartlinks to http://profil.berlingskemedia.dk/smartlinks.


# Administration af kunder

This is the list of customers, with support for extended search based on email,
external ID, name, address information etc.

Customers can be edited and a view of their profile history is available.


# TODO

  * Change the current `PUT /users` into a PATCH operation, and create a new PUT
  operation that overwrites existing newsletters, interests and permissions.
