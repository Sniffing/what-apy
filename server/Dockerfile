FROM python:slim

RUN apt-get update
# RUN apt-get install -y vim
# RUN apt-get install -y net-tools

WORKDIR /usr/what-apy
COPY . .

WORKDIR /usr/what-apy
RUN pip3 install --upgrade pip
RUN pip3 install -r requirements.txt
RUN pip3 install six --upgrade
RUN pip3 install gunicorn
ENV GOOGLE_APPLICATION_CREDENTIALS='/usr/what-apy/what-apy.json'

CMD gunicorn -w 2 -b 0.0.0.0:5000 app:app
