FROM mcr.microsoft.com/playwright:v1.25.0-focal
WORKDIR /usr/src/app

RUN apt-get update && apt-get install -y openjdk-8-jdk
RUN npm i -D playwright && npm i -D @playwright/test && npm i -D @playwright/test allure-playwright && npm i -D allure-commandline

COPY docker-entrypoint.sh /usr/local/bin/
RUN chmod +x /usr/local/bin/docker-entrypoint.sh

EXPOSE 9323
CMD ["/usr/local/bin/docker-entrypoint.sh"]


