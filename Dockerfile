FROM node:lts-bullseye

RUN apt-get update \
  && apt-get install -y wget unzip

RUN apt-get update \
  && apt-get install -y tzdata
ENV TZ Asia/Tokyo

RUN apt-get update \
  && apt-get install -y locales locales-all \
  && update-locale LANG=ja_JP.UTF-8
ENV LANG ja_JP.UTF-8
ENV LANGUAGE ja_JP:ja
ENV LC_ALL ja_JP.UTF-8

RUN apt-get update \
  && apt-get install -y fontconfig \
  && wget -O /tmp/IPAexfont00301.zip https://moji.or.jp/wp-content/ipafont/IPAexfont/IPAexfont00301.zip \
  && mkdir -p /usr/share/fonts/ipa \
  && (cd /usr/share/fonts/ipa && unzip /tmp/IPAexfont00301.zip) \
  && rm /tmp/IPAexfont00301.zip \
  && fc-cache -fv

RUN apt-get update \
  && apt-get install -y \
    fonts-liberation  \
    libasound2  \
    libatk-bridge2.0-0  \
    libatk1.0-0 \
    libatspi2.0-0 \
    libcups2 \
    libdbus-1-3 \
    libdrm2 \
    libgbm1 \
    libgtk-3-0 \
    libnspr4 \
    libnss3 \
    libu2f-udev \
    libvulkan1 \
    libxcomposite1 \
    libxdamage1 \
    libxfixes3 \
    libxkbcommon0 \
    libxrandr2 \
    xdg-utils \
  && wget -O /tmp/google-chrome-stable_current_amd64.deb https://dl.google.com/linux/direct/google-chrome-stable_current_amd64.deb \
  && dpkg -i /tmp/google-chrome-stable_current_amd64.deb \
  && rm /tmp/google-chrome-stable_current_amd64.deb

RUN apt-get clean \
  && rm -rf /var/lib/apt/lists/*

WORKDIR /usr/src/app
ENV NODE_ENV production
RUN --mount=type=bind,source=package.json,target=package.json \
    --mount=type=bind,source=package-lock.json,target=package-lock.json \
    --mount=type=cache,target=/root/.npm \
    npm ci --omit=dev

USER node
COPY . .

CMD node ./src/index.js login
