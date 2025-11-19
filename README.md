# taller1

This application was generated using JHipster 8.11.0, you can find documentation and help at [https://www.jhipster.tech/documentation-archive/v8.11.0](https://www.jhipster.tech/documentation-archive/v8.11.0).

## 📋 Tabla de Contenidos

- [Configuración del Entorno de Desarrollo](#configuración-del-entorno-de-desarrollo)
- [Instalación de Herramientas](#instalación-de-herramientas)
- [Instalación y Prueba de Docker](#instalación-y-prueba-de-docker)
- [Ventajas de las Herramientas Utilizadas](#ventajas-de-las-herramientas-utilizadas)
- [Reproducir el Entorno en Otra Máquina](#reproducir-el-entorno-en-otra-máquina)
- [Project Structure](#project-structure)
- [Development](#development)

---

## 🛠️ Configuración del Entorno de Desarrollo

### Requisitos Previos

Este proyecto utiliza las siguientes tecnologías:

- **Java 17** - Runtime para el backend
- **Maven 3.9+** - Gestión de dependencias y build Java
- **Node.js 20.x** - Runtime para el frontend
- **npm 10.x** - Gestión de dependencias JavaScript
- **Docker Desktop** - Contenedores para servicios (PostgreSQL, Monitoring, etc.)

---

## 📦 Instalación de Herramientas

### 1. Instalación de Java 17

#### Verificar si Java está instalado:

```bash
java -version
```

#### Versión Instalada:

```
java version "17.0.13" 2025-10-15 LTS
Java(TM) SE Runtime Environment (build 17.0.13+10-LTS-268)
Java HotSpot(TM) 64-Bit Server VM (build 17.0.13+10-LTS-268, mixed mode, sharing)
```

#### Instalación en macOS:

```bash
# Opción 1: Usando Homebrew
brew install openjdk@17

# Opción 2: Descargar desde Oracle
# https://www.oracle.com/java/technologies/javase/jdk17-archive-downloads.html
```

### 2. Instalación de Maven 3.9+

#### Verificar instalación:

```bash
mvn -version
```

#### Versión Instalada:

```
Apache Maven 3.9.11
Maven home: /opt/homebrew/Cellar/maven/3.9.11/libexec
Java version: 17.0.13
```

#### Instalación en macOS:

```bash
# Usando Homebrew
brew install maven
```

### 3. Instalación de Node.js 20.x y npm

#### Verificar instalación:

```bash
node --version
npm --version
```

#### Versiones Instaladas:

```
Node: v20.19.0
NPM: 10.8.2
```

#### Instalación en macOS:

```bash
# Opción 1: Usando Homebrew
brew install node@20

# Opción 2: Usando NVM (recomendado)
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.0/install.sh | bash
nvm install 20
nvm use 20
```

---

## 🐳 Instalación y Prueba de Docker

### 4.1. Instalación de Docker Desktop según SO

#### macOS:

1. Descargar Docker Desktop desde: https://www.docker.com/products/docker-desktop
2. Instalar el archivo `.dmg` descargado
3. Abrir Docker Desktop desde Applications
4. Esperar a que Docker inicie completamente

#### Windows:

1. Descargar Docker Desktop desde: https://www.docker.com/products/docker-desktop
2. Habilitar WSL2 (Windows Subsystem for Linux)
3. Instalar Docker Desktop
4. Reiniciar el sistema

#### Linux:

```bash
# Ubuntu/Debian
sudo apt-get update
sudo apt-get install docker.io docker-compose
sudo systemctl start docker
sudo systemctl enable docker

# Agregar usuario al grupo docker
sudo usermod -aG docker $USER
```

### 4.2. Validación de Instalación

```bash
docker version
```

#### Salida Esperada:

```
Client: Docker Engine - Community
 Version:           28.0.1
 API version:       1.48
 Go version:        go1.24.0
 Git commit:        068a01ea94
 Built:             Tue Feb 25 17:52:55 2025
 OS/Arch:           darwin/arm64

Server: Docker Desktop 4.47.0 (206054)
 Engine:
  Version:          28.4.0
  API version:      1.51 (minimum version 1.24)
  Go version:       go1.24.7
  Built:            Wed Sep  3 20:58:53 2025
  OS/Arch:          linux/arm64
```

### 4.3. Ejecución del Contenedor de Prueba hello-world

```bash
docker run hello-world
```

#### Salida Esperada:

```
Hello from Docker!
This message shows that your installation appears to be working correctly.

To generate this message, Docker took the following steps:
 1. The Docker client contacted the Docker daemon.
 2. The Docker daemon pulled the "hello-world" image from the Docker Hub.
 3. The Docker daemon created a new container from that image which runs the
    executable that produces the output you are currently reading.
 4. The Docker daemon streamed that output to the Docker client, which sent it
    to your terminal.
```

### 4.4. Verificar Docker Compose

```bash
docker compose version
```

#### Salida:

```
Docker Compose version v2.39.4-desktop.1
```

### 4.5. Servicios Docker del Proyecto

Este proyecto utiliza los siguientes servicios Docker:

```bash
# Ver servicios corriendo
docker ps
```

#### Servicios Disponibles:

- **PostgreSQL 17.4** - Base de datos principal (puerto 5432)
- **Prometheus** - Sistema de monitoreo (puerto 9090)
- **Grafana** - Dashboards de visualización (puerto 3000)
- **SonarQube** - Análisis de calidad de código (puerto 9000)
- **JHipster Control Center** - Panel de control (puerto 7419)

Para más información sobre la gestión de Docker, ver [DOCKER.md](./DOCKER.md)

---

## 🎯 Ventajas de las Herramientas Utilizadas

### SDKMAN (SDK Manager)

**Ventajas:**

- ✅ **Gestión de múltiples versiones**: Permite instalar y cambiar entre diferentes versiones de Java, Maven, Gradle, etc.
- ✅ **Ambiente aislado**: Cada proyecto puede usar su propia versión sin conflictos
- ✅ **Instalación simple**: Un solo comando para instalar cualquier herramienta del ecosistema JVM
- ✅ **Actualización fácil**: Mantener las herramientas actualizadas es trivial
- ✅ **Multiplataforma**: Funciona en Linux, macOS y Windows (WSL)

**Comandos básicos:**

```bash
# Instalar SDKMAN
curl -s "https://get.sdkman.io" | bash

# Listar versiones disponibles
sdk list java
sdk list maven

# Instalar una versión específica
sdk install java 17.0.13-oracle
sdk install maven 3.9.11

# Cambiar de versión
sdk use java 17.0.13-oracle

# Ver versión actual
sdk current
```

### NVM (Node Version Manager)

**Ventajas:**

- ✅ **Gestión de múltiples versiones de Node.js**: Ideal para proyectos que requieren diferentes versiones
- ✅ **Cambio rápido entre versiones**: Con un solo comando
- ✅ **No requiere permisos de administrador**: Instalación en el directorio del usuario
- ✅ **Configuración por proyecto**: Archivo `.nvmrc` define la versión del proyecto
- ✅ **Compatibilidad**: Evita problemas de compatibilidad entre proyectos

**Comandos básicos:**

```bash
# Instalar NVM
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.0/install.sh | bash

# Listar versiones disponibles
nvm ls-remote

# Instalar Node.js
nvm install 20
nvm install 18

# Cambiar de versión
nvm use 20

# Establecer versión por defecto
nvm alias default 20

# Ver versión actual
nvm current
```

### Docker y Docker Compose

**Ventajas:**

- ✅ **Ambiente consistente**: El mismo ambiente en desarrollo, pruebas y producción
- ✅ **Aislamiento**: Cada servicio corre en su propio contenedor
- ✅ **Portabilidad**: Funciona igual en cualquier sistema operativo
- ✅ **Escalabilidad**: Fácil de escalar servicios horizontalmente
- ✅ **Versionado de infraestructura**: Los archivos Docker Compose son código
- ✅ **Gestión de dependencias**: Todos los servicios necesarios definidos en un archivo
- ✅ **Inicio rápido**: Levantar toda la infraestructura con un comando

**Comandos básicos:**

```bash
# Iniciar servicios
docker compose -f src/main/docker/postgresql.yml up -d
docker compose -f src/main/docker/monitoring.yml up -d

# Ver servicios corriendo
docker ps

# Ver logs
docker logs <container-name>

# Detener servicios
docker compose -f src/main/docker/postgresql.yml down

# Limpiar todo
docker system prune -a
```

---

## 🔄 Reproducir el Entorno en Otra Máquina

### Opción 1: Instalación Manual (Sin SDKMAN/NVM)

#### 1. Instalar Java 17

```bash
# macOS
brew install openjdk@17

# Linux (Ubuntu/Debian)
sudo apt update
sudo apt install openjdk-17-jdk

# Windows
# Descargar desde: https://www.oracle.com/java/technologies/downloads/#java17
```

#### 2. Instalar Maven

```bash
# macOS
brew install maven

# Linux (Ubuntu/Debian)
sudo apt install maven

# Windows
# Descargar desde: https://maven.apache.org/download.cgi
```

#### 3. Instalar Node.js y npm

```bash
# macOS
brew install node@20

# Linux (Ubuntu/Debian)
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs

# Windows
# Descargar desde: https://nodejs.org/
```

#### 4. Instalar Docker Desktop

- **macOS/Windows**: https://www.docker.com/products/docker-desktop
- **Linux**:

```bash
sudo apt update
sudo apt install docker.io docker-compose
sudo systemctl start docker
sudo usermod -aG docker $USER
```

### Opción 2: Instalación con SDKMAN y NVM (Recomendado)

#### 1. Instalar SDKMAN

```bash
curl -s "https://get.sdkman.io" | bash
source "$HOME/.sdkman/bin/sdkman-init.sh"
```

#### 2. Instalar Java y Maven con SDKMAN

```bash
sdk install java 17.0.13-oracle
sdk install maven 3.9.11
```

#### 3. Instalar NVM

```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.0/install.sh | bash
source ~/.bashrc  # o ~/.zshrc en macOS
```

#### 4. Instalar Node.js con NVM

```bash
nvm install 20
nvm use 20
nvm alias default 20
```

#### 5. Instalar Docker Desktop

Seguir las instrucciones del sitio oficial según el sistema operativo.

### Clonar y Configurar el Proyecto

#### 1. Clonar el repositorio

```bash
git clone https://github.com/Mbustamantef/c6_taller_programacion1.git
cd c6_taller_programacion1
```

#### 2. Verificar versiones

```bash
java -version    # Debe ser 17.x
mvn -version     # Debe ser 3.9.x
node --version   # Debe ser 20.x
npm --version    # Debe ser 10.x
docker --version # Debe estar instalado
```

#### 3. Iniciar servicios Docker

```bash
cd src/main/docker

# Iniciar PostgreSQL (requerido)
docker compose -f postgresql.yml up -d

# Opcional: Iniciar monitoring
docker compose -f monitoring.yml up -d

# Opcional: Iniciar SonarQube
docker compose -f sonar.yml up -d

# Opcional: Iniciar JHipster Control Center
docker compose -f jhipster-control-center.yml up -d
```

#### 4. Instalar dependencias

```bash
# Volver al directorio raíz del proyecto
cd ../..

# Instalar dependencias de Node
./npmw install
```

#### 5. Iniciar la aplicación

```bash
# Terminal 1: Backend
./mvnw

# Terminal 2: Frontend
./npmw start
```

#### 6. Verificar que todo funciona

- Backend: http://localhost:8080
- Frontend: http://localhost:9000
- Grafana: http://localhost:3000 (admin/admin)
- Prometheus: http://localhost:9090
- SonarQube: http://localhost:9000

### Script de Verificación Rápida

Crear un archivo `verify-environment.sh`:

```bash
#!/bin/bash

echo "=== Verificación del Entorno ==="
echo ""

# Java
echo "Java:"
java -version 2>&1 | head -1
echo ""

# Maven
echo "Maven:"
mvn -version | head -1
echo ""

# Node
echo "Node.js:"
node --version
echo ""

# npm
echo "npm:"
npm --version
echo ""

# Docker
echo "Docker:"
docker --version
echo ""

# Docker Compose
echo "Docker Compose:"
docker compose version
echo ""

# Servicios Docker
echo "Servicios Docker corriendo:"
docker ps --format "table {{.Names}}\t{{.Status}}"
echo ""

echo "=== Verificación Completa ==="
```

Ejecutar:

```bash
chmod +x verify-environment.sh
./verify-environment.sh
```

---

## 📸 Evidencias de Instalación

### Resumen de Versiones Instaladas

| Herramienta    | Versión | Estado       |
| -------------- | ------- | ------------ |
| Java           | 17.0.13 | ✅ Instalado |
| Maven          | 3.9.11  | ✅ Instalado |
| Node.js        | 20.19.0 | ✅ Instalado |
| npm            | 10.8.2  | ✅ Instalado |
| Docker         | 28.0.1  | ✅ Instalado |
| Docker Compose | v2.39.4 | ✅ Instalado |

### Comandos de Verificación Utilizados

```bash
# Verificar todas las versiones
java -version
mvn -version
node --version
npm --version
docker version
docker compose version

# Prueba de Docker
docker run hello-world

# Ver servicios del proyecto
docker ps

# Estado de los contenedores
docker inspect taller1-postgresql-1 --format='{{.State.Status}}'
```

### Servicios Docker Configurados

- ✅ PostgreSQL 17.4 - `localhost:5432` (Usuario: taller1, Password: 123123)
- ✅ Prometheus v3.3.1 - `http://localhost:9090`
- ✅ Grafana 12.0.0 - `http://localhost:3000` (admin/admin)
- ✅ SonarQube 25.5.0 - `http://localhost:9000`
- ✅ JHipster Control Center v0.5.0 - `http://localhost:7419`

Para más detalles sobre la configuración de Docker, consultar [DOCKER.md](./DOCKER.md)

---

## Project Structure

Node is required for generation and recommended for development. `package.json` is always generated for a better development experience with prettier, commit hooks, scripts and so on.

In the project root, JHipster generates configuration files for tools like git, prettier, eslint, husky, and others that are well known and you can find references in the web.

`/src/*` structure follows default Java structure.

- `.yo-rc.json` - Yeoman configuration file
  JHipster configuration is stored in this file at `generator-jhipster` key. You may find `generator-jhipster-*` for specific blueprints configuration.
- `.yo-resolve` (optional) - Yeoman conflict resolver
  Allows to use a specific action when conflicts are found skipping prompts for files that matches a pattern. Each line should match `[pattern] [action]` with pattern been a [Minimatch](https://github.com/isaacs/minimatch#minimatch) pattern and action been one of skip (default if omitted) or force. Lines starting with `#` are considered comments and are ignored.
- `.jhipster/*.json` - JHipster entity configuration files

- `npmw` - wrapper to use locally installed npm.
  JHipster installs Node and npm locally using the build tool by default. This wrapper makes sure npm is installed locally and uses it avoiding some differences different versions can cause. By using `./npmw` instead of the traditional `npm` you can configure a Node-less environment to develop or test your application.
- `/src/main/docker` - Docker configurations for the application and services that the application depends on

## Development

The build system will install automatically the recommended version of Node and npm.

We provide a wrapper to launch npm.
You will only need to run this command when dependencies change in [package.json](package.json).

```
./npmw install
```

We use npm scripts and [Webpack][] as our build system.

Run the following commands in two separate terminals to create a blissful development experience where your browser
auto-refreshes when files change on your hard drive.

```
./mvnw
./npmw start
```

Npm is also used to manage CSS and JavaScript dependencies used in this application. You can upgrade dependencies by
specifying a newer version in [package.json](package.json). You can also run `./npmw update` and `./npmw install` to manage dependencies.
Add the `help` flag on any command to see how you can use it. For example, `./npmw help update`.

The `./npmw run` command will list all the scripts available to run for this project.

### PWA Support

JHipster ships with PWA (Progressive Web App) support, and it's turned off by default. One of the main components of a PWA is a service worker.

The service worker initialization code is commented out by default. To enable it, uncomment the following code in `src/main/webapp/index.html`:

```html
<script>
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('./service-worker.js').then(function () {
      console.log('Service Worker Registered');
    });
  }
</script>
```

Note: [Workbox](https://developers.google.com/web/tools/workbox/) powers JHipster's service worker. It dynamically generates the `service-worker.js` file.

### Managing dependencies

For example, to add [Leaflet][] library as a runtime dependency of your application, you would run following command:

```
./npmw install --save --save-exact leaflet
```

To benefit from TypeScript type definitions from [DefinitelyTyped][] repository in development, you would run following command:

```
./npmw install --save-dev --save-exact @types/leaflet
```

Then you would import the JS and CSS files specified in library's installation instructions so that [Webpack][] knows about them:
Note: There are still a few other things remaining to do for Leaflet that we won't detail here.

For further instructions on how to develop with JHipster, have a look at [Using JHipster in development][].

## Building for production

### Packaging as jar

To build the final jar and optimize the taller1 application for production, run:

```
./mvnw -Pprod clean verify
```

This will concatenate and minify the client CSS and JavaScript files. It will also modify `index.html` so it references these new files.
To ensure everything worked, run:

```
java -jar target/*.jar
```

Then navigate to [http://localhost:8080](http://localhost:8080) in your browser.

Refer to [Using JHipster in production][] for more details.

### Packaging as war

To package your application as a war in order to deploy it to an application server, run:

```
./mvnw -Pprod,war clean verify
```

### JHipster Control Center

JHipster Control Center can help you manage and control your application(s). You can start a local control center server (accessible on http://localhost:7419) with:

```
docker compose -f src/main/docker/jhipster-control-center.yml up
```

## Testing

### Spring Boot tests

To launch your application's tests, run:

```
./mvnw verify
```

### Client tests

Unit tests are run by [Jest][]. They're located near components and can be run with:

```
./npmw test
```

## Others

### Code quality using Sonar

Sonar is used to analyse code quality. You can start a local Sonar server (accessible on http://localhost:9001) with:

```
docker compose -f src/main/docker/sonar.yml up -d
```

Note: we have turned off forced authentication redirect for UI in [src/main/docker/sonar.yml](src/main/docker/sonar.yml) for out of the box experience while trying out SonarQube, for real use cases turn it back on.

You can run a Sonar analysis with using the [sonar-scanner](https://docs.sonarqube.org/display/SCAN/Analyzing+with+SonarQube+Scanner) or by using the maven plugin.

Then, run a Sonar analysis:

```
./mvnw -Pprod clean verify sonar:sonar -Dsonar.login=admin -Dsonar.password=admin
```

If you need to re-run the Sonar phase, please be sure to specify at least the `initialize` phase since Sonar properties are loaded from the sonar-project.properties file.

```
./mvnw initialize sonar:sonar -Dsonar.login=admin -Dsonar.password=admin
```

Additionally, Instead of passing `sonar.password` and `sonar.login` as CLI arguments, these parameters can be configured from [sonar-project.properties](sonar-project.properties) as shown below:

```
sonar.login=admin
sonar.password=admin
```

For more information, refer to the [Code quality page][].

### Docker Compose support

JHipster generates a number of Docker Compose configuration files in the [src/main/docker/](src/main/docker/) folder to launch required third party services.

For example, to start required services in Docker containers, run:

```
docker compose -f src/main/docker/services.yml up -d
```

To stop and remove the containers, run:

```
docker compose -f src/main/docker/services.yml down
```

[Spring Docker Compose Integration](https://docs.spring.io/spring-boot/reference/features/dev-services.html) is enabled by default. It's possible to disable it in application.yml:

```yaml
spring:
  ...
  docker:
    compose:
      enabled: false
```

You can also fully dockerize your application and all the services that it depends on.
To achieve this, first build a Docker image of your app by running:

```sh
npm run java:docker
```

Or build a arm64 Docker image when using an arm64 processor os like MacOS with M1 processor family running:

```sh
npm run java:docker:arm64
```

Then run:

```sh
docker compose -f src/main/docker/app.yml up -d
```

For more information refer to [Using Docker and Docker-Compose][], this page also contains information on the Docker Compose sub-generator (`jhipster docker-compose`), which is able to generate Docker configurations for one or several JHipster applications.

## Continuous Integration (optional)

To configure CI for your project, run the ci-cd sub-generator (`jhipster ci-cd`), this will let you generate configuration files for a number of Continuous Integration systems. Consult the [Setting up Continuous Integration][] page for more information.

[JHipster Homepage and latest documentation]: https://www.jhipster.tech
[JHipster 8.11.0 archive]: https://www.jhipster.tech/documentation-archive/v8.11.0
[Using JHipster in development]: https://www.jhipster.tech/documentation-archive/v8.11.0/development/
[Using Docker and Docker-Compose]: https://www.jhipster.tech/documentation-archive/v8.11.0/docker-compose
[Using JHipster in production]: https://www.jhipster.tech/documentation-archive/v8.11.0/production/
[Running tests page]: https://www.jhipster.tech/documentation-archive/v8.11.0/running-tests/
[Code quality page]: https://www.jhipster.tech/documentation-archive/v8.11.0/code-quality/
[Setting up Continuous Integration]: https://www.jhipster.tech/documentation-archive/v8.11.0/setting-up-ci/
[Node.js]: https://nodejs.org/
[NPM]: https://www.npmjs.com/
[Webpack]: https://webpack.github.io/
[BrowserSync]: https://www.browsersync.io/
[Jest]: https://jestjs.io
[Leaflet]: https://leafletjs.com/
[DefinitelyTyped]: https://definitelytyped.org/
