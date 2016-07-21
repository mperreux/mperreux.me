FROM ubuntu:16.04

ENV workdir /urs/src/mperreux
ENV NVM_DIR /usr/local/nvm
ENV NODE_VERSION 5.1.0

RUN rm /bin/sh && ln -s /bin/bash /bin/sh

RUN apt-get update
RUN apt-get -qq -y install curl

# Install nvm with node and npm
RUN curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.26.0/install.sh | bash \
    && source $NVM_DIR/nvm.sh \
    && nvm install $NODE_VERSION \
    && nvm alias default $NODE_VERSION \
    && nvm use default

ENV NODE_PATH $NVM_DIR/versions/node/v$NODE_VERSION/lib/node_modules
ENV PATH      $NVM_DIR/versions/node/v$NODE_VERSION/bin:$PATH

RUN npm install -g forever
RUN mkdir -p ${workdir}

WORKDIR ${workdir}

ADD package.json ./
RUN npm install

ADD . ${workdir}

ENV PORT 3002
EXPOSE 3002
CMD ["forever", "bin/www"]