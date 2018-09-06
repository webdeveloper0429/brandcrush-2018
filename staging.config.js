module.exports = {
    /**
     * Application configuration section
     * http://pm2.keymetrics.io/docs/usage/application-declaration/
     */
    apps : [
  
      // First application
      {
        name      : 'brandcrush',
        script    : './bin/www',
        env: {
          COMMON_VARIABLE: 'true',
          PORT: 3000
        },
        env_production : {
          NODE_ENV: 'production',
          PORT: 3000
        }
      },
  
      // Second application
      // {
      //   name      : 'WEB',
      //   script    : 'web.js'
      // }
    ],
  
    /**
     * Deployment section
     * http://pm2.keymetrics.io/docs/usage/deployment/
     */
    deploy : {
      production : {
        user : 'root',
        host : '206.189.43.243',
        ref  : 'origin/develop',
        repo : 'git@gitlab.com:bespoke.cloud/brandcrush-static.git',
        path : '/var/www/brandcrush/production',
        'post-deploy' : 'npm install && npm run build-css && pm2 reload staging.config.js --env production'
      },
      dev : {
        user : 'root',
        host : '206.189.43.243',
        ref  : 'origin/develop',
        repo : 'git@gitlab.com:bespoke.cloud/brandcrush-static.git',
        path : '/var/www/brandcrush/development',
        'post-deploy' : 'npm install && npm run build-css && pm2 reload staging.config.js --env dev',
        env  : {
          NODE_ENV: 'dev'
        }
      }
    }
  };
  