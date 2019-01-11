# Priority Construction

This site is built using [Gatsby (1.x)](https://v1.gatsbyjs.org/docs/).

## Configure necessary keys

Create a `.env` file

```sh
cp dev.env .env
```

You'll need to replace any `FIXME`s with the appropriate keys. The keys can be found within [Netlify](https://www.netlify.com/) -> Settings -> Build & Deploy.

**NOTE** Only add keys for environment variables already listed in the originating `dev.env`/`.env` file. You do not need add additional keys that may exist in Netlify.

Once you've updated the keys, source your `.env` file. This will make the keys accessible via your application.

```sh
source .env
```

## Install

Make sure you have [nvm](https://github.com/creationix/nvm) installed.

```sh
nvm install
```

```sh
npm install
```

```sh
npm run develop
```

Visit [http://localhost:8000](http://localhost:8000)

For more information on various Gatsby build commands, see the [Gastby documentation](https://v1.gatsbyjs.org/docs/).

## Deploy

This site is deployed via [Netlify](https://www.netlify.com/).
