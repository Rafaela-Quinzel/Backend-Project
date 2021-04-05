<h1 style="color: orange;"> Backend-Project</h1>

<p style='color:red'>This is some red text.</p>
<font color="red">This is some text!</font>
These are <b style='color:red'>red words</b>.

<h3 style="color: orange; border-bottom: 1px solid; width: 290px;">Projeto Fullstack - Repositório Backend<h3>

<p style="margin-top: 5px; font-size: 16px;">
   Este projeto foi desenvolvido no curso da <strong>Labenu</strong> é uma API com funcionalidades básicas para uma streaming de músicas.
</p> 

<p style="margin-top: 4%;">Para utilizar este projeto você precisa dos primeiros passos abaixo:</p>
<ul style="font-size: 14px;">
    <li>Clonar este repositório</li>
    <li>Executar o comando npm install no terminal</li>
    <li>Criar um arquivo .env na raiz do projeto e preencher com os valores corretos.</li>
</ul>
<p style="font-size: 14px; margin-left: 45px">Exemplo:</p>
    <div style="font-size: 14px; margin-left: 80px">
        <p># endereço do host<p>
        <p>DB_HOST = 00.000.000.000</p>
        <p>PORT = 0000</p>
        <p>DB_USER = nome-usuario</p>
        <p>DB_PASSWORD = 1a2b3c4d5e</p>
        <p>DB_NAME = nome-banco</p>
        <p>JWT_KEY = chave</p>
        <p>JWT_EXPIRES_IN = 1d</p>
        <p>BCRYPT_COST = 12</p>
    </div>
<div style="margin-top: 5%; font-size: 14px;">
    <p style="">
      No arquivo <strong style="color: rgb(43, 109, 170);">ProjetoFULLSTACK.sql</strong> estão todas as tabelas que foram criadas para guardar as informações no banco de dados.
    </p>
    <p>
      Para criar estas tabelas no seu banco de dados basta clicar em 
      <strong style="color: rgb(43, 109, 170);">Run SQL</strong> 
      e as tabelas serão criadas.
    </p>
</div>

<p style="margin-top: 5%;">Para rodar este projeto:</p>
<ul style="font-size: 14px;">
    <li>npm run start</li>
    <li>npm run dev</li>
    <li>npm run test (testes com jest)</li>
</ul>

<div style="margin-top: 5%;">
<p style="font-size: 18px">Endpoints existentes neste projeto:</p>
<p style="font-size: 14px;">
   São divididos em três partes: endpoints relacionados aos usuários, as músicas e as playlists.
</p>

<div style="margin-left: 5px;">
    <p style="style=font-size: 16px; margin-left: 35px; margin-top: 2%; color: rgb(238, 133, 13); border-bottom: 1px solid; width: 182px; font-weight: bolder;">
       Endpoints de Usuários:
    </p>
    <ul style="font-size: 14px;">
       <li>Para criar um novo usuário.</li>
    </ul>
    <p style="margin-left: 35px; margin-left: 8%;">
       <strong style="color: rgb(245,166,35);">POST</strong> 
       SignUp
    </p>
    <p style="font-size: 14px; border: 1px solid; padding: 6px; margin-left: 8%; width: 400px;">
        https://backend-fullstack-labenu.herokuapp.com/user/signup
    </p>
    <p style="font-size: 14px; margin-left: 8%; font-weight: bolder;">
        Body Requisição:
    <p>
    <code style="font-size: 14px; color: green; display: grid;">
        <div style="font-size: 14px; margin-left: 8%; border: 1px solid; width: 240px; padding: 20px;">
            {
                "name":"usuario",
                "email":"usuario@email.com.br",
                "nickname":"usuario",
                "password":"123456"
            }
        </div>
    </code>
    <br/>
    <ul style="font-size: 14px; margin-top: 2%;">
       <li>Fazer Login</li>
    </ul>
    <p style="margin-left: 35px; margin-left: 8%;">
       <strong style="color: rgb(245,166,35);">POST</strong> 
       Login
    </p>
    <p style="font-size: 14px; border: 1px solid; padding: 6px; margin-left: 8%; width: 400px;">
       https://backend-fullstack-labenu.herokuapp.com/user/login
    </p>
    <p style="font-size: 14px; margin-left: 8%; font-weight: bolder;">
       Body Requisição:
    <p>
    <code style="font-size: 14px; color: green;">
        <div style="font-size: 14px; margin-left: 8%; border: 1px solid; width: 250px; padding: 15px;">
            {
                "email":"usuario@email.com.br",
                "password":"123456"
            }
        </div>
    </code>
    <p style="font-size: 14px; margin-left: 8%; margin-top: 4%; font-weight: bolder;">
       Body Resposta:
    <p>
    <code style="font-size: 14px; color: rgb(8, 107, 114);">
        <div style="font-size: 14px; margin-left: 8%; border: 1px solid; width: 250px; padding: 18px;">
            "token": {
                "accessToken":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImZiNTEzMTIxLTE0MTEtNDZiZC1hMjEwLTQ0OGQ2YjA0ODIzZSIsImlhdCI6MTYxNzY2MDkxNiwiZXhwIjoxNjE3NzQ3MzE2fQ.QYDQ7IOi3yaSjNpu_Nwew00Pcnlw593KkBSZJ4VYZNc",
                "username":"Rafaela"
            }
        </div>
        </code>
</div>

<div style="margin-left: 5px; margin-top: 10%;">
    <p style="style=font-size: 18px; margin-left: 35px; margin-top: 4%; color: rgb(238, 133, 13); border-bottom: 1px solid; width: 180px; font-weight: bolder;">
        Endpoints de Músicas:
    </p>
    <ul style="font-size: 14px;">
       <li>Para criar uma nova música</li>
    </ul>
    <p style="margin-left: 35px; margin-left: 8%;">
      <strong style="color: rgb(245,166,35);">POST</strong>
      Create Music
    </p>
    <p style="font-size: 14px; border: 1px solid; padding: 6px; margin-left: 8%; width: 400px;">
       https://backend-fullstack-labenu.herokuapp.com/music/create
    </p>
    <p style="font-size: 14px; margin-left: 8%; font-weight: bolder;">
       Authorization(token)
    </p>
    <p style="font-size: 14px; border: 1px solid; padding: 8px; margin-left: 8%; width: 480px;">
       Authorization: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImZiNTEzMTIxLTE0MTEtNDZiZC1hMjEwLTQ0OGQ2YjA0ODIzZSIsImlhdCI6MTYxNTA2NTU3MywiZXhwIjoxNjE1MTUxOTczfQ.IuXjGbKiAMZZmTKhzWKD3RsboN7qRwOO7z4xUqupgso
    </p>
    <p style="font-size: 14px; margin-left: 8%; font-weight: bolder;">
       Body
    <p>
    <code style="font-size: 14px; color: green; display: grid;">
        <div style="font-size: 14px; margin-left: 8%; border: 1px solid; width: 210px; padding: 20px 60px 20px 30px;">
            {
                "title":"música teste",
                "author":"autor teste",    
                "file":"https://www.musica.com",
                "genre":["Hip-Hop", "Rap"],
                "album":"teste"
            }
        </div>
    </code>
    <br/>
    <ul style="font-size: 14px; margin-top: 2%;">
       <li>Ver todas as músicas cadastradas</li>
    </ul>
    <p style="margin-left: 35px; margin-left: 8%;">
      <strong style="color: rgb(21, 122, 7);">GET</strong> 
      Musics
    </p>
    <p style="font-size: 14px; border: 1px solid; padding: 6px; margin-left: 8%; width: 350px;">
       https://backend-fullstack-labenu.herokuapp.com/music
    </p>
    <p style="font-size: 14px; margin-left: 8%; font-weight: bolder;">
       Authorization(token)
    </p>
    <p style="font-size: 14px; border: 1px solid; padding: 8px; margin-left: 8%; width: 480px;">
       Authorization: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImZiNTEzMTIxLTE0MTEtNDZiZC1hMjEwLTQ0OGQ2YjA0ODIzZSIsImlhdCI6MTYxNTA2NTU3MywiZXhwIjoxNjE1MTUxOTczfQ.IuXjGbKiAMZZmTKhzWKD3RsboN7qRwOO7z4xUqupgso
    </p>
    <p style="font-size: 14px; margin-left: 8%; margin-top: 4%; font-weight: bolder;">
    <br/>
    <ul style="font-size: 14px;">
       <li>Buscar música por id</li>
    </ul>
    <p style="margin-left: 35px; margin-left: 8%;">
      <strong style="color: rgb(21, 122, 7);">GET</strong>
      Music By Id
    </p>
    <p style="font-size: 14px; border: 1px solid; padding: 6px; margin-left: 8%; width: 620px;">
       https://backend-fullstack-labenu.herokuapp.com/music/d9eab937-d269-44a8-b7d5-38e03f818f76
    </p>
    <p style="font-size: 14px; margin-left: 8%; font-weight: bolder;">
       Authorization(token)
    </p>
    <p style="font-size: 14px; border: 1px solid; padding: 8px; margin-left: 8%; width: 480px;">
       Authorization: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImZiNTEzMTIxLTE0MTEtNDZiZC1hMjEwLTQ0OGQ2YjA0ODIzZSIsImlhdCI6MTYxNTA2NTU3MywiZXhwIjoxNjE1MTUxOTczfQ.IuXjGbKiAMZZmTKhzWKD3RsboN7qRwOO7z4xUqupgso
    </p>
    <br/>
    <ul style="font-size: 14px;">
       <li>Deletar uma música</li>
    </ul>
    <p style="margin-left: 35px; margin-left: 8%;">
      <strong style="color: red;">DELETE</strong>
      Delete Music By Id
    </p>
    <p style="font-size: 14px; border: 1px solid; padding: 6px; margin-left: 8%; width: 660px;">
       https://backend-fullstack-labenu.herokuapp.com/music/delete/d9eab937-d269-44a8-b7d5-38e03f818f76
    </p>
    <p style="font-size: 14px; margin-left: 8%; font-weight: bolder;">
       Authorization(token)
    </p>
    <p style="font-size: 14px; border: 1px solid; padding: 8px; margin-left: 8%; width: 480px;">
       Authorization: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImZiNTEzMTIxLTE0MTEtNDZiZC1hMjEwLTQ0OGQ2YjA0ODIzZSIsImlhdCI6MTYxNTA2NTU3MywiZXhwIjoxNjE1MTUxOTczfQ.IuXjGbKiAMZZmTKhzWKD3RsboN7qRwOO7z4xUqupgso
    </p>
</div>

<div style="margin-left: 5px; margin-top: 10%;">
    <p style="style=font-size: 18px; margin-left: 35px; margin-top: 4%; color: rgb(238, 133, 13); border-bottom: 1px solid; width: 180px; font-weight: bolder;">
        Endpoints de Playlists:
    </p>
    <ul style="font-size: 14px;">
       <li>Para criar uma nova playlist</li>
    </ul>
    <p style="margin-left: 35px; margin-left: 8%;">
      <strong style="color: rgb(245,166,35);">POST</strong>
      Create Playlist
    </p>
    <p style="font-size: 14px; border: 1px solid; padding: 6px; margin-left: 8%; width: 400px;">
       https://backend-fullstack-labenu.herokuapp.com/playlist/create
    </p>
    <p style="font-size: 14px; margin-left: 8%; font-weight: bolder;">
       Authorization(token)
    </p>
    <p style="font-size: 14px; border: 1px solid; padding: 8px; margin-left: 8%; width: 480px;">
       Authorization: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImZiNTEzMTIxLTE0MTEtNDZiZC1hMjEwLTQ0OGQ2YjA0ODIzZSIsImlhdCI6MTYxNTA2NTU3MywiZXhwIjoxNjE1MTUxOTczfQ.IuXjGbKiAMZZmTKhzWKD3RsboN7qRwOO7z4xUqupgso
    </p>
    <p style="font-size: 14px; margin-left: 8%; font-weight: bolder;">
       Body
    <p>
    <code style="font-size: 14px; color: green; display: grid;">
        <div style="font-size: 14px; margin-left: 8%; border: 1px solid; width: 250px; padding: 20px 40px 20px 40px;">
            {
                "title":"Playlist Teste", 
                "subtitle":"Testando Endpoint"
            }
        </div>
    </code>
    <br/>
    <ul style="font-size: 14px;">
       <li>Adicionar músicas em uma playlist específica</li>
    </ul>
    <p style="margin-left: 35px; margin-left: 8%;">
      <strong style="color: rgb(245,166,35);">POST</strong>
      Add track to Playlist
    </p>
    <p style="font-size: 14px; border: 1px solid; padding: 6px; margin-left: 8%; width: 400px;">
       https://backend-fullstack-labenu.herokuapp.com/playlist/track
    </p>
    <p style="font-size: 14px; margin-left: 8%; font-weight: bolder;">
       Authorization(token)
    </p>
    <p style="font-size: 14px; border: 1px solid; padding: 8px; margin-left: 8%; width: 480px;">
       Authorization: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImZiNTEzMTIxLTE0MTEtNDZiZC1hMjEwLTQ0OGQ2YjA0ODIzZSIsImlhdCI6MTYxNTA2NTU3MywiZXhwIjoxNjE1MTUxOTczfQ.IuXjGbKiAMZZmTKhzWKD3RsboN7qRwOO7z4xUqupgso
    </p>
    <p style="font-size: 14px; margin-left: 8%; font-weight: bolder;">
       Body
    <p>
    <code style="font-size: 14px; color: green; display: grid;">
        <div style="font-size: 14px; margin-left: 8%; border: 1px solid; width: 460px; padding: 20px 5px 20px 40px;">
            {
                "music_id":"1d94fddf-94cf-4c02-a7b6-93170ae0d392",
                "playlist_id":"0d92eed5-2cc6-48f2-a12e-1d7dfa25ab40"
            }
        </div>
    </code>
    <br/>
    <ul style="font-size: 14px; margin-top: 2%;">
       <li>Ver todas as playlists cadastradas do usuário logado</li>
    </ul>
    <p style="margin-left: 35px; margin-left: 8%;">
      <strong style="color: rgb(21, 122, 7);">GET</strong> 
      Playlists By User
    </p>
    <p style="font-size: 14px; border: 1px solid; padding: 6px; margin-left: 8%; width: 355px;">
       https://backend-fullstack-labenu.herokuapp.com/playlist
    </p>
    <p style="font-size: 14px; margin-left: 8%; font-weight: bolder;">
       Authorization(token)
    </p>
    <p style="font-size: 14px; border: 1px solid; padding: 8px; margin-left: 8%; width: 480px;">
       Authorization: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImZiNTEzMTIxLTE0MTEtNDZiZC1hMjEwLTQ0OGQ2YjA0ODIzZSIsImlhdCI6MTYxNTA2NTU3MywiZXhwIjoxNjE1MTUxOTczfQ.IuXjGbKiAMZZmTKhzWKD3RsboN7qRwOO7z4xUqupgso
    </p>
    <br/>
    <ul style="font-size: 14px;">
       <li>Buscar playlist por id</li>
    </ul>
    <p style="margin-left: 35px; margin-left: 8%;">
      <strong style="color: rgb(21, 122, 7);">GET</strong>
      Playlist By Id
    </p>
    <p style="font-size: 14px; border: 1px solid; padding: 6px; margin-left: 8%; width: 620px;">
       https://backend-fullstack-labenu.herokuapp.com/playlist/0d92eed5-2cc6-48f2-a12e-1d7dfa25ab40
    </p>
    <p style="font-size: 14px; margin-left: 8%; font-weight: bolder;">
       Authorization(token)
    </p>
    <p style="font-size: 14px; border: 1px solid; padding: 8px; margin-left: 8%; width: 480px;">
       Authorization: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImZiNTEzMTIxLTE0MTEtNDZiZC1hMjEwLTQ0OGQ2YjA0ODIzZSIsImlhdCI6MTYxNTA2NTU3MywiZXhwIjoxNjE1MTUxOTczfQ.IuXjGbKiAMZZmTKhzWKD3RsboN7qRwOO7z4xUqupgso
    </p>
    <br/>
    <ul style="font-size: 14px;">
      <li>Deletar uma playlist</li>
    </ul>
    <p style="margin-left: 35px; margin-left: 8%;">
      <strong style="color: red;">DELETE</strong>
      Delete Playlist
    </p>
    <p style="font-size: 14px; border: 1px solid; padding: 6px; margin-left: 8%; width: 660px;">
       https://backend-fullstack-labenu.herokuapp.com/playlist/delete/703fd85e-4385-49c2-8df3-0598756e3736
    </p>
    <p style="font-size: 14px; margin-left: 8%; font-weight: bolder;">
       Authorization(token)
    </p>
    <p style="font-size: 14px; border: 1px solid; padding: 8px; margin-left: 8%; width: 480px;">
       Authorization: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImZiNTEzMTIxLTE0MTEtNDZiZC1hMjEwLTQ0OGQ2YjA0ODIzZSIsImlhdCI6MTYxNTA2NTU3MywiZXhwIjoxNjE1MTUxOTczfQ.IuXjGbKiAMZZmTKhzWKD3RsboN7qRwOO7z4xUqupgso
    </p>
    <br/>
    <ul style="font-size: 14px;">
      <li>Remover uma música de uma playlist específica</li>
    </ul>
    <p style="margin-left: 35px; margin-left: 8%;">
      <strong style="color: red;">DELETE</strong>
      Delete Music From Playlist
    </p>
    <p style="font-size: 14px; border: 1px solid; padding: 6px; margin-left: 8%; width: 940px;">
       https://backend-fullstack-labenu.herokuapp.com/playlist/0d92eed5-2cc6-48f2-a12e-1d7dfa25ab40/music?1d94fddf-94cf-4c02-a7b6-93170ae0d392
    </p>
    <p style="font-size: 14px; margin-left: 8%; font-weight: bolder;">
       Authorization(token)
    </p>
    <p style="font-size: 14px; border: 1px solid; padding: 8px; margin-left: 8%; width: 480px;">
       Authorization: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImZiNTEzMTIxLTE0MTEtNDZiZC1hMjEwLTQ0OGQ2YjA0ODIzZSIsImlhdCI6MTYxNTA2NTU3MywiZXhwIjoxNjE1MTUxOTczfQ.IuXjGbKiAMZZmTKhzWKD3RsboN7qRwOO7z4xUqupgso
    </p>
</div>

<div style="margin-left: 5px;">
    <p style="style=font-size: 16px; margin-left: 35px; margin-top: 5%; color: rgb(238, 133, 13); border-bottom: 1px solid; width: 475px; font-weight: bolder;">Bibliotecas, Frameworks e recursos utilizados neste projeto:</p>
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
</div>


