# Deploying this Site

This site is intended to be deployed using my [docker-bootstrap](https://github.com/McFateM/docker-bootstrap) approach, and the command stream used to launch [the site]( https://rootstalk-static.grinnell.edu/) on Grinnell College's `static.Grinnell.edu` server is:

```
NAME=rootstalk
HOST=rootstalk-static.grinnell.edu
IMAGE="mcfatem/rootstalk"
docker container run -d --name ${NAME} \
    --label traefik.backend=${NAME} \
    --label traefik.docker.network=traefik_webgateway \
    --label "traefik.frontend.rule=Host:${HOST}" \
    --label traefik.port=80 \
    --label com.centurylinklabs.watchtower.enable=true \
    --network traefik_webgateway \
    --restart always \
    ${IMAGE}
```

# Example Hugo project

## Initializing

```
fin init
```

Will initialize new site, append a test content and compile the site.

Your new site will be instantly available at `http://static.$VIRTUAL_HOST`

## Development

To develop a Hugo project you need Hugo running in a server mode ([Hugo Quickstart guide](https://gohugo.io/getting-started/quick-start/) for more details).

```
fin develop
```

Starts a Hugo server. The server will be available at `http://$VIRTUAL_HOST`.
Updates as you edit, reload the page to see your changes.

**NOTE:** once started, the Hugo server will run, blocking the console. Kill it with `Ctrl-C`, when you are done.

## Compiling static site

```
fin compile
```

Will re-compile static site into `public` folder. It is available at `http://static.$VIRTUAL_HOST`
