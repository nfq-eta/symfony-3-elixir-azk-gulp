### Setup
> I hope that you already have docker and docker-compose installed
1. copy file `env.dist` to `.env` and edit to suite your needs
1. Run `$ ./vm ssh`
1. SSH to the server `$ ./vm ssh`
1. Install dependencies `$ composer install`

#### Other frontend commands
1. `$ npm run build` Build assets
1. `$ npm start` Build and serve assets
1. Run Webpack `$ app/console maba:webpack:dev-server`

#### Production
```bash
app/console cache:clear --env=prod
app/console maba:webpack:compile --env=prod
app/console server:run --env=prod
```
