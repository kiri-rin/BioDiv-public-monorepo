FROM rstudio/plumber as build

RUN R -e "install.packages('randomForest')"
RUN R -e "install.packages('RMark')"
RUN R -e "install.packages('tidyverse')"
RUN R -e "install.packages('readr', dependencies = TRUE)"
RUN R -e "install.packages('Distance')"
RUN R -e "install.packages('geojsonsf')"
RUN R -e "install.packages('dplyr')"
RUN R -e "install.packages('sf')"
RUN apt-get update
RUN apt-get -y install libudunits2-dev
RUN apt-get -y install libproj-dev
RUN apt-get -y install libgdal-dev
RUN R -e "install.packages('sp')"
RUN R -e "install.packages('spdep')"

FROM build as deploy
RUN mkdir /app

COPY ./mark /usr/local/bin/mark
RUN chmod +x /usr/local/bin/mark

COPY . /app
WORKDIR /app

EXPOSE 8000
CMD ["Rscript","plumber.R"]

