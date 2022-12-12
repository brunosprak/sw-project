#########
# nginx #
#########

FROM node:16.14.0-alpine3.14

LABEL description="sw-api"

WORKDIR /app

ENV PORT=9001

COPY . /app/

# configuring cron
COPY ./cron/batch.cron /etc/cron.d/sw-batch.cron
RUN chmod 0644 /etc/cron.d/sw-batch.cron
RUN crontab /etc/cron.d/sw-batch.cron
RUN touch /var/log/sw-batch.log

EXPOSE 9001

CMD ["cron", "&&", "npm", "run", "pipeline:prod"]