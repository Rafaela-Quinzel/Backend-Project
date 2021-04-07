# Backend-Project

*Projeto Fullstack - Repositório Backend*

Este projeto foi desenvolvido no curso da **Labenu** é uma API com funcionalidades básicas para uma streaming de músicas.

**Para utilizar este projeto você precisa dos primeiros passos abaixo:**

- Clonar este repositório
- Executar o comando npm install no terminal
- Criar um arquivo .env na raiz do projeto e preencher com os valores corretos.
```
   #endereço do host
   DB_HOST = 00.000.000.000
   PORT = 0000
   DB_USER = nome-usuario
   DB_PASSWORD = 1a2b3c4d5e
   DB_NAME = nome-banco
   JWT_KEY = chave
   JWT_EXPIRES_IN = 1d
   BCRYPT_COST = 12
````

No arquivo `ProjetoFULLSTACK.sql` estão todas as tabelas que foram criadas para guardar as informações no banco de dados.
 
Para criar estas tabelas no seu banco de dados basta clicar em `Run SQL` e as tabelas serão criadas.

**Para rodar este projeto:**
- npm run start
- npm run dev
- npm run test (testes com jest)

**Os endpoints existentes neste projeto são divididos em três partes:** endpoints relacionados aos usuários, as músicas e as playlists.


***Endpoints de Usuários:***
 
 **POST** SignUp

- Para criar um novo usuário

```
   https://apisoundlab.herokuapp.com/user/signup
```

Body Requisição:

```json
   {
      "name":"usuario",
      "email":"usuario@email.com.br",
      "nickname":"usuario",
      "password":"123456"
   }
```

**POST** Login

- Fazer Login

```
   https://apisoundlab.herokuapp.com/user/login
```

Body Requisição:

```json
   {
      "email":"usuario@email.com.br",
      "password":"123456"
   }
```

Body Resposta:

```json
"token": {
"accessToken":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImZiNTEzMTIxLTE0MTEtNDZiZC1hMjEwLTQ0OGQ2YjA0ODIzZSIsImlhdCI6MTYxNzY2MDkxNiwiZXhwIjoxNjE3NzQ3MzE2fQ.QYDQ7IOi3yaSjNpu_Nwew00Pcnlw593KkBSZJ4VYZNc",
"username":"usuario"
}
```

<br/>

***Endpoints de Músicas:***

**POST** Create Music

- Para criar uma nova música

```
   https://apisoundlab.herokuapp.com/music/create
```

Authorization(token)

```json
Authorization: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImZiNTEzMTIxLTE0MTEtNDZiZC1hMjEwLTQ0OGQ2YjA0ODIzZSIsImlhdCI6MTYxNTA2NTU3MywiZXhwIjoxNjE1MTUxOTczfQ.IuXjGbKiAMZZmTKhzWKD3RsboN7qRwOO7z4xUqupgso
```

Body

```json
{
   "title":"música teste",
   "author":"autor teste",    
   "file":"https://www.musica.com",
   "genre":["Hip-Hop", "Rap"],
   "album":"teste"
}
```

**GET** Musics

- Ver todas as músicas cadastradas

```
   https://apisoundlab.herokuapp.com/music
```

Authorization(token)

```json
Authorization: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImZiNTEzMTIxLTE0MTEtNDZiZC1hMjEwLTQ0OGQ2YjA0ODIzZSIsImlhdCI6MTYxNTA2NTU3MywiZXhwIjoxNjE1MTUxOTczfQ.IuXjGbKiAMZZmTKhzWKD3RsboN7qRwOO7z4xUqupgso
```

**GET** Music By Id

- Buscar música por id

```
   https://apisoundlab.herokuapp.com/music/d9eab937-d269-44a8-b7d5-38e03f818f76
```

Authorization(token)

```
Authorization: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImZiNTEzMTIxLTE0MTEtNDZiZC1hMjEwLTQ0OGQ2YjA0ODIzZSIsImlhdCI6MTYxNTA2NTU3MywiZXhwIjoxNjE1MTUxOTczfQ.IuXjGbKiAMZZmTKhzWKD3RsboN7qRwOO7z4xUqupgso
```


**DELETE** Music By Id

- Deletar uma música buscado a mesma pelo id

```
   https://apisoundlab.herokuapp.com/music/delete/d9eab937-d269-44a8-b7d5-38e03f818f76
```

Authorization(token)

```json
Authorization: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImZiNTEzMTIxLTE0MTEtNDZiZC1hMjEwLTQ0OGQ2YjA0ODIzZSIsImlhdCI6MTYxNTA2NTU3MywiZXhwIjoxNjE1MTUxOTczfQ.IuXjGbKiAMZZmTKhzWKD3RsboN7qRwOO7z4xUqupgso
```

<br/>

***Endpoints de Playlists:***

**POST** Create Playlist

- Para criar uma nova playlist

```
   https://apisoundlab.herokuapp.com/playlist/create
```

Authorization(token)

```json
Authorization: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImZiNTEzMTIxLTE0MTEtNDZiZC1hMjEwLTQ0OGQ2YjA0ODIzZSIsImlhdCI6MTYxNTA2NTU3MywiZXhwIjoxNjE1MTUxOTczfQ.IuXjGbKiAMZZmTKhzWKD3RsboN7qRwOO7z4xUqupgso
```

Body

```json
   {
      "title":"Playlist Teste", 
      "subtitle":"Testando Endpoint"
   }
```

**POST** Add track to Playlist

- Adicionar músicas em uma playlist específica

```
   https://apisoundlab.herokuapp.com/playlist/track
```

Authorization(token)

```json
Authorization: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImZiNTEzMTIxLTE0MTEtNDZiZC1hMjEwLTQ0OGQ2YjA0ODIzZSIsImlhdCI6MTYxNTA2NTU3MywiZXhwIjoxNjE1MTUxOTczfQ.IuXjGbKiAMZZmTKhzWKD3RsboN7qRwOO7z4xUqupgso
```

Body

```json
   {
      "music_id":"1d94fddf-94cf-4c02-a7b6-93170ae0d392",
      "playlist_id":"0d92eed5-2cc6-48f2-a12e-1d7dfa25ab40"
   }
```

**GET** Playlists By User

- Ver todas as playlists cadastradas do usuário logado

```
   https://apisoundlab.herokuapp.com/playlist
```

Authorization(token)

```json
Authorization: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImZiNTEzMTIxLTE0MTEtNDZiZC1hMjEwLTQ0OGQ2YjA0ODIzZSIsImlhdCI6MTYxNTA2NTU3MywiZXhwIjoxNjE1MTUxOTczfQ.IuXjGbKiAMZZmTKhzWKD3RsboN7qRwOO7z4xUqupgso
```

**GET** Playlist By Id

- Buscar playlist por id

```
   https://apisoundlab.herokuapp.com/playlist/0d92eed5-2cc6-48f2-a12e-1d7dfa25ab40
```

Authorization(token)
```json
Authorization: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImZiNTEzMTIxLTE0MTEtNDZiZC1hMjEwLTQ0OGQ2YjA0ODIzZSIsImlhdCI6MTYxNTA2NTU3MywiZXhwIjoxNjE1MTUxOTczfQ.IuXjGbKiAMZZmTKhzWKD3RsboN7qRwOO7z4xUqupgso
```

**DELETE** Delete Playlist

- Deletar uma playlist através do id

```
   https://apisoundlab.herokuapp.com/playlist/delete/703fd85e-4385-49c2-8df3-0598756e3736
```

Authorization(token)

```json
Authorization: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImZiNTEzMTIxLTE0MTEtNDZiZC1hMjEwLTQ0OGQ2YjA0ODIzZSIsImlhdCI6MTYxNTA2NTU3MywiZXhwIjoxNjE1MTUxOTczfQ.IuXjGbKiAMZZmTKhzWKD3RsboN7qRwOO7z4xUqupgso
```

**DELETE** Delete Music From Playlist

- Remover uma música de uma playlist específica

```
   https://apisoundlab.herokuapp.com/playlist/0d92eed5-2cc6-48f2-a12e-1d7dfa25ab40/music?1d94fddf-94cf-4c02-a7b6-93170ae0d392
```

Authorization(token)

```json
Authorization: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImZiNTEzMTIxLTE0MTEtNDZiZC1hMjEwLTQ0OGQ2YjA0ODIzZSIsImlhdCI6MTYxNTA2NTU3MywiZXhwIjoxNjE1MTUxOTczfQ.IuXjGbKiAMZZmTKhzWKD3RsboN7qRwOO7z4xUqupgso
```
<br/>
**Bibliotecas, Frameworks e recursos utilizados neste projeto:**

<ul style="font-size: 14px; margin-left: 25px;">
   <li>Express</li>
   <li>Cors</li>
   <li>Axios</li>
   <li>Dayjs</li>
   <li>Dotenv</li>
   <li>Jest</li>
   <li>Knex</li>
   <li>uuid</li>
   <li>bcryptjs</li>
   <li>jsonwebtoken</li>
   <li>mysql</li>
   <li>typescript</li>
   <li>ts-jest</li>
   <li>ts-node-dev</li>
</ul>



