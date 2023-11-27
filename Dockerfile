FROM nexus.etpgpb.ru/playwright:v1.39.0-jammy

WORKDIR /usr/src/app

RUN mkdir ./auth && apt-get update && apt-get install -y openjdk-8-jdk
RUN npm set registry https://nexus.etpgpb.ru/repository/npmjs-proxy/ \
    npm i -D playwright \
    && npm i -D @playwright/test \
    && npm i -D @playwright/test allure-playwright \
    && npm i -D allure-commandline \
    && npm i -D eslint-plugin-playwright \
    && npm i @typescript-eslint/eslint-plugin@latest --save-dev \
    && npm i @faker-js/faker --save-dev

COPY docker-entrypoint.sh /usr/local/bin/
RUN chmod +x /usr/local/bin/docker-entrypoint.sh

EXPOSE 9323
CMD ["/usr/local/bin/docker-entrypoint.sh"]


