---
date: 2020-08-04
title: 'Docker unter Ubuntu 20.04 einrichten'
template: post
thumbnail: '../../thumbnails/ubuntu.png'
slug: ubuntu-docker-einrichten
categories:
  - Betriebssystem
tags:
  - Linux
  - Ubuntu
  - Docker
---

[Docker](<https://de.wikipedia.org/w/index.php?title=Docker_(Software)&oldid=203149728>) vereinfacht die Verwaltung von Anwendungsprozessen. Die freie Software ähnelt virtuellen Maschinen, aber Container sind portabler, ressourcenschonender und vom Host-Betriebssystem abhängig. Ich installiere [Docker](https://docs.docker.com/get-docker/) unter Ubuntu 20.04 und veröffentliche ein eigenes Docker Imaage.

## Voraussetzungen

Nach der Installation des Desktop Images von [Ubuntu 20.04 LTS (Focal Fossa)](https://releases.ubuntu.com/20.04/) verfüge ich über ein _non-root-Superuser-Konto_ und kann direkt mit der Installation von Docker beginnen.

## Installieren von Docker

Um sicherzustellen, dass ich die neueste Version erhalte, installieren ich Docker aus dem offiziellen Docker-Repository.

Ich aktualisiere zunächst die Paketliste:

```bash
sudo apt update
```

Dann installiere ich notwendige Pakete:

```bash
sudo apt install apt-transport-https ca-certificates curl software-properties-common
```

Danach füge ich den GPG-Schlüssel für das offizielle Docker-Repository hinzu:

```bash
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -

```

Daraufhin ergänze ich das Docker-Repository in den APT Quelle:

```bash
sudo add-apt-repository „deb [arch=amd64] https://download.docker.com/linux/ubuntu focal stable“
```

Anschließend aktualisiere ich die Paketdatenbank mit den Docker-Paketen aus dem neu hinzugefügten Repo:

```bash
sudo apt update

```

Ich stelle sicher, dass ich vom Docker-Repo anstelle des Standard-Ubuntu-Repos installieren:

```bash
apt-cache policy docker-ce

```

Die Ausgabe ist beispielsweise wie folgt:

```bash
Docker-ce:
  Installiert: (keine)
  Kandidat: 5: 19.03.12~3-0~Ubuntu-Focal
  Versionstabelle:
...
...
```

Beachte: `docker-ce` ist nicht installiert. Ich installiere `docker-ce`:

```bash
sudo apt install docker-ce
```

Docker ist jetzt installiert und der Dämon gestartet. Dies prüfe ich:

```bash
sudo systemctl status docker
```

Der Dienst ist aktiv:

```bash
docker.service - Docker Application Container Engine
     Loaded: loaded (/lib/systemd/system/docker.service; enabled; vendor preset: enabled)
     Active: active (running) since Tue 2020-08-30 17:00:41 UTC; 17s ago
TriggeredBy: ● docker.socket
       Docs: https://docs.docker.com
   Main PID: 11517 (dockerd)
      Tasks: 10
     Memory: 38.4M
     CGroup: /system.slice/docker.service
             └─11517 /usr/bin/dockerd -H fd:// --containerd=/run/containerd/containerd.sock
...
```

## Der Docker-Befehls ohne `sudo`

Wenn ein normaler Benutzer versucht, den Befehl `docker` auszuführen, ohne ihm `sudo` voranzustellen oder ohne zur Gruppe `Docker` zu gehören, sieht er einen Hinweis darauf, dass er nicht berechtigt ist.

Der beste Workaround ist, alle Benutzer die `docker` nutzten, zur Gruppe **Docker** zu hinzuzufügen.

```bash
sudo usermod -aG docker ${USER}

```

Um die neue Gruppenmitgliedschaft anzuwenden, melde dich vom Rechner ab und wieder an oder rufe folgenden Befehl auf:

```bash
su - ${USER}
```

Bestätige, dass dein Benutzer zur Gruppe **Docker** hinzugefügt wurde.

```bash
id -nG
```

Alle Gruppen werden angezeigt, in denen du dich befindest:

```bash
astrid adm cdrom sudo dip plugdev lpadmin lxd sambashare docker
```

> Einen anderen Benutzer fügst du wie folgt zur Gruppe **Docker** hinzu: `sudo usermod -aG docker username`

Sehen wir uns den Befehl „Docker“ genauer an.

## Der Befehl Docker im überblick

Die Syntax eines `docker`-Befehls:

```bash
docker [option] [command] [arguments]
```

Lass dir alle verfügbaren Unterbefehle anzeigen:

```bash
docker

```

Beispielausgabe:

```bash
  attach      Attach local standard input, output, and error streams to a running container
  build       Build an image from a Dockerfile
  commit      Create a new image from a container's changes
  cp          Copy files/folders between a container and the local filesystem
  create      Create a new container
  diff        Inspect changes to files or directories on a container's filesystem
  events      Get real time events from the server
  exec        Run a command in a running container
  export      Export a container's filesystem as a tar archive
  history     Show the history of an image
  images      List images
  import      Import the contents from a tarball to create a filesystem image
  info        Display system-wide information
  inspect     Return low-level information on Docker objects
  kill        Kill one or more running containers
  load        Load an image from a tar archive or STDIN
  login       Log in to a Docker registry
  logout      Log out from a Docker registry
  logs        Fetch the logs of a container
  pause       Pause all processes within one or more containers
  port        List port mappings or a specific mapping for the container
  ps          List containers
  pull        Pull an image or a repository from a registry
  push        Push an image or a repository to a registry
  rename      Rename a container
  restart     Restart one or more containers
  rm          Remove one or more containers
  rmi         Remove one or more images
  run         Run a command in a new container
  save        Save one or more images to a tar archive (streamed to STDOUT by default)
  search      Search the Docker Hub for images
  start       Start one or more stopped containers
  stats       Display a live stream of container(s) resource usage statistics
  stop        Stop one or more running containers
  tag         Create a tag TARGET_IMAGE that refers to SOURCE_IMAGE
  top         Display the running processes of a container
  unpause     Unpause all processes within one or more containers
  update      Update configuration of one or more containers
  version     Show the Docker version information
  wait        Block until one or more containers stop, then print their exit codes

```

Sieh dir einzelne Optionen detailierter an:

```bash
docker docker-unterbefehl--help
```

Lass dir System-Informationen zu Docker anzeigen:

```bash
docker info
```

Schauen wir uns Images genauer an.

## Docker Images

Docker-Container werden aus Docker-Images erstellt. Standardmäßig ruft Docker diese Bilder von [Docker Hub](https://hub.docker.com) ab. Lade über Docker Hub ein Image herunter:

```bash
docker run hello-world
```

Die Ausgabe zeigt an, dass Docker ordnungsgemäß funktioniert:

```bash
Unable to find image 'hello-world:latest' locally
latest: Pulling from library/hello-world
0e03bdcc26d7: Pull complete
Digest: sha256:6a65f928fb91fcfbc963f7aa6d57c8eeb426ad9a20c7ee045538ef34847f44f1
Status: Downloaded newer image for hello-world:latest

Hello from Docker!
This message shows that your installation appears to be working correctly.
...

```

Suche nach Images, zum Beispiel dem Ubuntu-Image:

```bash
docker search ubuntu

```

Rufe den folgenden Befehl auf, um das offizielle Ubuntu-Image auf deinen Computer herunterzuladen:

```bash
docker pull ubuntu

```

Du siehst folgendes:

```bash
Using default tag: latest
latest: Pulling from library/ubuntu
d51af753c3d3: Pull complete
fc878cd0a91c: Pull complete
6154df8ff988: Pull complete
fee5db0ff82f: Pull complete
Digest: sha256:31dfdbbaaee995098c9792d99bd333c6783ce56150d1b11e333bbceed5c54d7
Status: Downloaded newer image for ubuntu:latest
docker.io/library/ubuntu:latest
```

Nachdem ein Images heruntergeladen wurde, führst du es mit `run` aus.

So zeigst du heruntergeladene Images Bilder an:

```bash
docker images
```

Die Ausgabe sieht wie folgt aus:

```bash
REPOSITORY          TAG                 IMAGE ID            CREATED             SIZE
ubuntu              latest              4e622ef86b13        10 days ago         73.9MB
hello-world         latest              bf756fb1ae65        8 months ago        13.3kB

```

Schauen wir uns Container genauer an.

## Docker Container

Lasse uns als Beispiel einen Container mit dem neuesten Image von Ubuntu aufrufen.

> Die Kombination von **-i** und **-t** ermöglicht dir den interaktiven Shell-Zugriff auf den Container:

```bash
docker run -it ubuntu
```

Die Eingabeaufforderung ändert sich. Du befindest dich jetzt im Container:

```bash
root@3fee0f2f636:/#
```

In diesem Beispiel ist die Container ID `3fee0f2f636`. Mithilfe von ihr identifizierst du den Container.

Rufe einen beliebigen Befehl im Container auf. Aktualisiere beispielsweise die Paketdatenbank im Container. `sudo` ist nicht notwendig, da du im Container als **Root**-Benutzer arbeitest:

```bash
apt update

```

Oder installiere Node.js:

```bash
apt install nodejs

```

Überprüfe, ob die Installation:

```bash
node -v

```

Alle Änderungen gelten nur für diesen Container.

Um den Container zu verlassen, gib in der Eingabeaufforderung `exit` ein. Überzeuge dich davon, dass Node.js nicht außerhalb des Containers installiert ist.

Schauen wir uns als nächstes die Verwaltung der Container an.

## Docker Container verwalten

Sieh dir die **activen** Container an:

```bash
docker ps
```

Du siehst beispielsweise dies:

```bash
CONTAINER ID        IMAGE               COMMAND             CREATED
...
```

Bisher haben wir zwei Container gestartet. Einen aus dem `hello-world`-Image und einen aus dem `ubuntu`-Image. Beide Container werden nicht mehr ausgeführt, sind jedoch auf Ihrem System noch vorhanden.

Rufe `docker ps` mit der Option `-a` auf, um alle Container anzuzeigen --- aktiv und inaktiv:

```bash
docker ps -a

```

Du siehst beispielsweise dies:

```bash
3fee0f2f636         ubuntu              "/bin/bash"         5 minutes ago       Exited (0) 8 seconds ago                       Quirky_driscoll
ef3d221a5f6c        hello-world         "/hello"            12 minutes ago      Exited (0) 6 minutes ago                       elegant_wilson

```

Um den zuletzt erstellten Container anzuzeigen, nutze `-l`:

```bash
docker ps -l

```

Um einen gestoppten Container zu starten, verwende `docker start`, gefolgt von der Container-ID oder dem Namen des Containers. :

```bash
docker start 3fee0f2f636
```

Der Container staret und du kannst mit `docker ps` den Status prüfen

> Um einen gestoppten Container zu stoppen, verwende `docker stop`. Lösche einen Container mit `docker rm`. Finde die Container ID mit `docker ps -a` heraus.

## Festschreiben von Änderungen in einem Container an einem Docker-Image

Wenn du ein Docker-Image aufrufst, ist es möglich, Dateien zu erstellen, zu ändern und zu löschen. Wie speicherst du diesen neuen Status?

Nach der Installation von Node.js im Ubuntu-Container unterscheidet dieser sich vom ursprünglichen Image. Übernimm die Änderungen mit dem folgenden Befehl in eine neue Docker-Image-Instanz.

```bash
docker commit -m "Meine Änderung" -a "Autor Name" container_id repository/new_image_name
```

**-m** steht für den Kommentar, mit du bescheibst, welche Änderungen du vorgenommen hast. **-a** ist für die Angabe des Autors. Die `container_id` ist zur Identifiezierung des Containers. Beispiel für

Der Benutzer **astrid** ändert den Container mit der ID `00000000` wie folgt:

```bash
docker commit -m "added Node.js" -a "astrid" 00000000 astrid/ubuntu-und-node-js
```

Das geändert Image wird zunächst lokal abgespeichert. Überprüfe dies mit `docker images`.

Teilen wir das Image als nächstes mit anderen.

## Docker Images im Docker Repository veröffentlichen

Senden wir ein Docker-Image an Docker Hub. Melden Sie sich zuerst bei [Docker Hub](https://hub.docker.com/) an, um dein Image zu übertragen.

```bash
docker login -u dein-docker-username

```

> Wenn sich dein Docker-Benutzername von dem lokalen Benutzernamen unterscheidet, den du zum Erstellen des Bildes verwendet hast, ist folgende Ergänzung wichtig:
> `docker tag astrid/ubuntu-node-js docker-registry-username/ubuntu-und-node-js`

Lade dein eigenes Image hoch:

```bash
docker push docker-registry-username/docker-image-name
```

Um `ubuntu-und-node-js` in das Repository **astrid** zu laden verwende ich:

```bash
docker push astrid/ubuntu-und-node-js

```

In der Kommandozeile kannst du den Fortschritt verfolgen:

```bash
The push refers to a repository [docker.io/astrid/ubuntu-und-node-js]
edfrbfbf4187: Pushed
...
...
```

Nachdem alles hochgeladen ist, siehst du im Docker Hub Dashboard das neue Image.

![Docker Image in Docker Hub](/images/docker1.png)

> Nutze `docker pull astrid/ubuntu-nodejs` um das Image auf einer anderen Maschine zu verwenden.