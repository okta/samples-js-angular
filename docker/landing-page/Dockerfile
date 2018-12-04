FROM nginx

USER root

RUN apt-get update

# Remove the default Nginx configuration file
RUN rm -v /etc/nginx/nginx.conf

# Copy a configuration file from the current directory
ADD nginx.conf /etc/nginx/

ADD dist/* /usr/share/nginx/html/
# ADD dist/* /var/www/html/

# Append "daemon off;" to the beginning of the configuration
RUN echo "daemon off;" >> /etc/nginx/nginx.conf

# Expose ports
EXPOSE 4200

# Set the default command to execute
# when creating a new container
CMD service nginx start
