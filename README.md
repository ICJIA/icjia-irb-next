# ICJIA Institutional Review Board (IRB)

[![Netlify Status](https://api.netlify.com/api/v1/badges/f3e4ce5f-9c40-4bb4-81e0-8411f99d9dd5/deploy-status)](https://app.netlify.com/sites/icjia-irb/deploys) [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

The Institutional Review Board (IRB) is a committee formally appointed by the Director of the Illinois Criminal Justice Information Authority (ICJIA). The IRB works to protect the rights of human subjects involved in research by reviewing all research activities involving human subjects conducted by ICJIA staff. ICJIA's IRB always contains at least five members from varying backgrounds including at least one scientific representative, at least one nonscientific representative, and at least one member not affiliated with the institution. Additionally, ICJIA’s IRB contains members that represent prisoners and victims.

## Site

https://icjia.illinois.gov/irb

## Build Setup

```bash
# install dependencies
$ npm install

# serve with hot reload at localhost:3000
$ npm run dev

# generate static project
$ npm run generate
```

## Nginx Configuration

If redirecting with Nginx, using Nuxt router's ```base``` property, and deploying to Netlify, configure Nginx to add trailing slash to all URLs:

```
location /irb/ {
        # force trailing slash for Nuxt
        rewrite ^([^.\?]*[^/])$ $1/ permanent;
        proxy_pass https://icjia-irb.netlify.app/;
    }
```

## CHANGLOG

[See CHANGELOG.md](https://github.com/ICJIA/icjia-irb-next/blob/master/CHANGELOG.md)

## License

[MIT @ Illinois Criminal Justice Information Authority](https://github.com/ICJIA/icjia-irb-next/blob/master/LICENSE)
