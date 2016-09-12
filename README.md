Gallery Admin
=============
Working on a basic photo gallery app for photography portfolios

DB: Postgresql
--------------
Using Sequelize for DB conncection and models

Using Sequelize-CLI for Migrations & Seeds

Using Epilogue for CRUD API

Server 
------
Express

Passport, Passport-Local, Cookie-Parser, Express-Sessions, Bcrypt

Image Graphics
--------------
```
brew install graphicsmagick
```

Setup
-----
Setup up Postgresql
```
createdb gallery
```

Migrate DB's
```
sequelize db:migrate
```

Undo Migration
```
sequelize db:migrate:undo:all
```

Seed All Data
```
sequelize db:seed:all
```
Seed Specific Data
```
sequelize db:seed --seed users.js
```

Delete Seed Data
```
sequelize db:seed:undo:all 
```

API via CURL
------------
Add User
```
curl --data "username=matt@admin.com&email=matt@admin.com" localhost:8080/users
```

Routes
------
/login
  username:Field
  password:Field
  submit:Button

/admin
  Top Level Actions/Menu: Galleries || Images || Users 
  Gallery List
  List Item: Edit || Delete || Hide

/admin/gallery/:id||:slug
  name:Field
  description:Field
  show:Checkbox
  Images List/Actions: Add
  Image Item: Hide || Delete

/admin/images
  All Images Options: SortBy(Name, Created ASC || DESC)
  Image Item: Edit || Delete

/admin/images/:id||:slug
  name:Field
  desc:Field
  file:Image
  delete:Button

/admin/gallery/:id||:slug/images/:id||:slub
  name:Field
  desc:Field
  show:Checkbox
  file:Image
  delete:Button

/admin/users
  Users List Options: Add
  User Item: Edit || Delete

/admin/users/:id||:slug
  User Actions: Save || Delete
  username:Field
  first_name:Field
  last_name:Field
  email:Field
  password:Field
  confirmation:Field