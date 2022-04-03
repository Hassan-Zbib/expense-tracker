<img src="./readme/title1.svg"/>

<div align="center">

> Hello world! This is the project’s summary that describes the project plain and simple, limited to the space available.

</div>

<br><br>

<img src="./readme/title2.svg"/>

> NET is a website where users can track their income and expenses, save the relative documents, and access their overall statistics

### User Stories

- As a user, I want to import or export my data, so that I can store them elsewhere
- As a user, I want to browse my transactions, so that I can edit or add to them supporting documents
- As a user, I want to opt in or out from being publicly visible, so that my stats are kept private

<br><br>

<img src="./readme/title3.svg"/>

> This design was planned before on paper, then moved to Figma app for the fine details.
> Note that i didn't use any styling library or theme, all from scratch and using pure css modules
> | Landing | Home/Search |
> | -----------------| -----|
> | ![Landing](https://github.com/julescript/spotifyndr/blob/master/demo/Landing_Page.jpg) | ![Home/Search](https://github.com/julescript/spotifyndr/blob/master/demo/Search_Page.jpg) |

| Artists results                                                                                | Artist's Albums                                                                               |
| ---------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------- |
| ![Artists results](https://github.com/julescript/spotifyndr/blob/master/demo/Artists_Page.jpg) | ![Artist's Albums](https://github.com/julescript/spotifyndr/blob/master/demo/Albums_Page.jpg) |

<br><br>

<img src="./readme/title4.svg"/>

Here's a brief high-level overview of the tech stack NET uses:

- This project uses the [Flutter app development framework](https://flutter.dev/). Flutter is a cross-platform hybrid app development platform which allows us to use a single codebase for apps on mobile, desktop, and the web.
- For persistent storage (database), the app uses the [Hive](https://hivedb.dev/) package which allows the app to create a custom storage schema and save it to a local database.
- To send local push notifications, the app uses the [flutter_local_notifications](https://pub.dev/packages/flutter_local_notifications) package which supports Android, iOS, and macOS.
  - 🚨 Currently, notifications aren't working on macOS. This is a known issue that we are working to resolve!
- The app uses the font ["Work Sans"](https://fonts.google.com/specimen/Work+Sans) as its main font, and the design of the app adheres to the material design guidelines.

<br><br>
<img src="./readme/title5.svg"/>

> Uing the above mentioned tecch stacks and the wireframes build with figma from the user sotries we have, the implementation of the app is shown as below, these are screenshots from the real app
> | Landing | Home/Search |
> | -----------------| -----|
> | ![Landing](https://github.com/julescript/spotifyndr/blob/master/demo/Landing_Page.jpg) | ![Home/Search](https://github.com/julescript/spotifyndr/blob/master/demo/Search_Page.jpg) |

<br><br>
<img src="./readme/title6.svg"/>

To get a local copy up and running follow these simple example steps.

### Prerequisites

This is a list of things you need to run the software and how to install them.

1. download and install NodeJS

2. update npm

```sh
npm install npm@latest -g
```

_To run the project with docker download Docker and Docker Compose, if you are running on windows it is recommended to install Docker Desktop_

### Installation 

<!-- _Below is an example of how you can instruct your audience on installing and setting up your app. This template doesn't rely on any external dependencies or services._ -->

1. Clone the repo
   ```sh
   git clone https://github.com/Hassan-Zbib/expense-tracker.git
   ```
2. Install NPM packages
   ```sh
   cd backend
   npm install
   cd ../frontend
   npm install
   ```
3. Enter your configurations in `./backend/.env.development` for example:
   ```env
   PORT = 5000
   MONGO_URI = mongodb://127.0.0.1:27017/expense-tracker-db
   ```
4. Run the backend
   ```sh
   npm run dev
   ```
5. Run the frontend
   ```sh
   npm run start
   ```

### To Run with Docker
1. Enter your configurations in `./backend/.env.production` for example:
   ```env
   PORT = 5000
   MONGO_URI = mongodb://127.0.0.1:27017/expense-tracker-db

1. Change the react proxy in `frontend/package.json`
   ```json
     "proxy": "http://backend:5000/api",
   ```

2. Build and run the containers

   ```sh
   docker compose up
   ```
