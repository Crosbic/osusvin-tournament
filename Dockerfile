FROM nginx

RUN rm /etc/nginx/conf.d/default.conf

COPY docker-nginx.conf /etc/nginx/conf.d/docker-nginx.conf

WORKDIR /var/www/svin-ui

COPY ./ .

EXPOSE 3000
