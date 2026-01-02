# OdinBlog

A blog app for Odin Project.`Node` backend and `React` Frontend

## Hosting Locally

- Requirements
  - Node js >=18
  - Yarn
  - Docker + Docker compose (RECOMMENDED)
    OR
  - postgres

- Services
  - Backend API : `http://localhost:8080`

    _Could be different if port is occupied by some different service_

  - Viewer And Author : `http://localhost:5472` / `http://localhost:5473`

```sh
git clone git@github.com:devnchill/OdinBlog.git
cd OdinBlog
yarn install

# ensure that env variables are properly set,take a look at example env files present in backend and viewer

# Start backend API and database
docker compose up

# Start frontend apps (in separate terminals)
yarn workspace @odinblog/frontend-viewer dev
yarn workspace @odinblog/frontend-author dev
```
