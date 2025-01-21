Proiect TW

- BACKEND:

  - Pentru a rula aplicatia se va naviga in 
  directorul "backend" si se vor rula comenzile:

          npm install
          node index.js

  - Este indicat inainte de rularea comenzilor de mai sus
  sa se stearga folderul "node_modules".
  - Acestea vor instala dependintele proiectului
  si vor porni aplicatia pe portul 3001.
  - Am ales o baza de date sqlite pentru a stoca
  datele si Sequelize pentru ORM.
  - In aplicatie sunt prezente entitatile: Director,
  Movie si User cu relatii intru Movie si Director
  si User si Movie.
  - Pentru a functiona frontend-ul cu backend-ul
      am folosit pachetul "cors".
  - Operatiuni:
    - Toate operatiunile pe modele (adaugare, editare
    , stergere, get) sunt definite in index.js din
    folderul "backend".
    - Pe langa operatiunile de baza exista si o operatiune
    de adaugare a filmului la in lista de favorite.
    - La get de utilizator vor fi trimise si filmele
    adaugate de acesta la favorite.


- Frontend:
  - Pentru frontend am ales React.
  - Aplicatia se afla in folderul "frontend".
  - Pentru a rula partea de frontend se va intra
  in acest folder si se va rula comanda:

        npm start