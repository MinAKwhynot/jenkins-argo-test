FROM nginx:1.21
RUN mkdir -p /usr/share/nginx/html/assets
RUN mkdir -p /usr/share/nginx/html/css
RUN mkdir -p /usr/share/nginx/html/js
COPY devweb/index.html /usr/share/nginx/html/index.html
COPY devweb/assets /usr/share/nginx/html/assets
COPY devweb/css /usr/share/nginx/html/css
COPY devweb/js /usr/share/nginx/html/js
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
