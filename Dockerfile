FROM nginx:alpine

WORKDIR /app

COPY . /app/towebp.rakdotdev.space

COPY ./conf.d /etc/nginx/conf.d

RUN rm -rf /etc/nginx/conf.d/default.conf

RUN chmod -R 755 /app/towebp.rakdotdev.space
