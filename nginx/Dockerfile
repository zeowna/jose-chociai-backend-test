FROM nginx:alpine

COPY ./config/default.conf /etc/nginx/conf.d/default.conf
EXPOSE 80 443
ENTRYPOINT ["nginx"]
CMD ["-g", "daemon off;"]
