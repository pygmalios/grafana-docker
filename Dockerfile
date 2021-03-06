FROM debian:wheezy

RUN apt-get update && apt-get -y install libfontconfig wget adduser openssl ca-certificates && apt-get clean

RUN wget http://grafanarel.s3.amazonaws.com/builds/grafana_2.6.0_amd64.deb

RUN dpkg -i grafana_2.6.0_amd64.deb

EXPOSE 3000

VOLUME ["/var/lib/grafana"]
VOLUME ["/var/log/grafana"]
VOLUME ["/etc/grafana"]

WORKDIR /usr/share/grafana

ADD public/views/index.html /usr/share/grafana/public/views/index.html
ADD public/pygmalios/params.js /usr/share/grafana/public/pygmalios/params.js
ADD public/pygmalios/tables.js /usr/share/grafana/public/pygmalios/tables.js
ADD public/pygmalios/onload.js /usr/share/grafana/public/pygmalios/onload.js

ADD public/app/partials/dashboardmenu.html /usr/share/grafana/public/app/partials/dashboardmenu.html
ADD public/app/partials/customsidemenu.html /usr/share/grafana/public/app/partials/customsidemenu.html
ADD public/app/features/dashboard/partials/dashboardTopNav.html /usr/share/grafana/public/app/features/dashboard/partials/dashboardTopNav.html

ADD public/img/fav16.png /usr/share/grafana/public/img/fav16.png
ADD public/img/fav32.png /usr/share/grafana/public/img/fav32.png
ADD public/img/fav_dark_16.png /usr/share/grafana/public/img/fav_dark_16.png
ADD public/img/fav_dark_32.png /usr/share/grafana/public/img/fav_dark_32.png
ADD public/img/logo_transparent_200x.png /usr/share/grafana/public/img/logo_transparent_200x.png
ADD public/img/logo_transparent_200x75.png /usr/share/grafana/public/img/logo_transparent_200x75.png
ADD public/img/logo_transparent_400x.png /usr/share/grafana/public/img/logo_transparent_400x.png

ENTRYPOINT ["/usr/sbin/grafana-server", "--config=/etc/grafana/grafana.ini", "cfg:default.paths.data=/var/lib/grafana", "cfg:default.paths.logs=/var/log/grafana"]
