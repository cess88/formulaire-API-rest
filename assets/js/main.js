//*****contient la liste d utilisateur ******/
const api = "http://localhost:3001/"


function subscribe() {

  let obj = {
  name: document.querySelector('#name').value,
    firstname: document.querySelector('#firstname').value,
    mail: document.querySelector('#email').value,
    password: document.querySelector('#passWord').value
   }
    fetch(api + "user",  {
      method: 'POST',
      body: JSON.stringify(obj),
      headers: {
        'Content-Type': 'application/json'
      },
    })
    .then(response => {
        if (response.status == 500) {  //***renvoi un message d'erreur si plusieurs utilisateur avec meme mail *******/
            response.json()
            .then(res =>{
                let div = document.createElement('div') //****passer le css au js ****/
                div.id = "error"  //****passer le css au js ****/
                div.innerText = res   //****passer le css au js ****/
                document.querySelector('main').appendChild(div)   //****passer le css au js ****/
            })
        }else{
            window.location = "./listUser.html"  //****renvoi au html windows onload ****/
        }
    })
    .catch(err => {
        console.log(err);
    });
   
}


async function getUsers() {
    fetch(api + "users")
        .then(response => response.json())
        .then(users => {
            createUserList(users)
        })
        .catch(error => console.error(error));
}



async function createUserList(users) {
    let container = document.querySelector("#cardContainer")
    container.innerHTML = ""
    for (let i = 0; i < users.length; i++) {
        let article = document.createElement("article") // je créé un article qui fera office de card
        article.classList.add('card')// je lui donne une classe qui lui donnera un style bootstrap

        let cardBody = document.createElement("div") // je créé une div qui contiendra le corps de ma card
        cardBody.classList.add("card-body")//je lui donne une classe qui lui donnera un style bootstrap

        let title = document.createElement("H2") // je créé un element <h2>
        title.innerText = `${users[i].name} ${users[i].firstname}` // j'insere le nom et le prenom de l'utilisateur a l'interieur

        let mail = document.createElement("H2") // je créé un element H2
        mail.innerText = users[i].mail // j'insere le mail de l'utilisateur a l'interieur

        let btnDelete = document.createElement("button") // je cree un element de type <button>
        btnDelete.type = "button" // je lui donne le type button
        btnDelete.innerText = "supprimer" //j'insere a l'interieur la chaine "supprimer"
        btnDelete.addEventListener("click", function () { // je lui donne un ecouteur d'evenement de type "click" qui lancera la fonction qui supprimera un user
            deleteUser(users[i]._id)
        })
        let btnModif = document.createElement("button") // je cree un element de type <button>
        btnModif.type = "button" // je lui donne le type button
        btnModif.innerText = "Modifier" //j'insere a l'interieur la chaine "supprimer"
        btnModif.addEventListener("click", function () { // je lui donne un ecouteur d'evenement de type "click" qui lancera la fonction qui supprimera un user
            navigateTomodifUser(users[i]._id)
        })
        container.appendChild(btnModif) // j'inser dans mon container le bouton
        container.appendChild(btnDelete) // j'inser dans mon container le bouton
        container.appendChild(article)//j'insere dans mon containe l'article
        article.appendChild(cardBody) // j'insere dans l'article le cardBody
        cardBody.appendChild(title) //j'insere dans le cardBody mon title 
        cardBody.appendChild(mail) //j'insere dans mon cardBody mail
    }

}


function searchUserByMail() {
    let criterialResearch = document.querySelector("#email").value
    fetch(api + "user/findByMail/" + criterialResearch)
        .then(response => response.json())
        .then(users => {
            let tab = [users]
            createUserList(tab)
        })
        .catch(error => console.error(error));
}


async function deleteUser(userId) {
    fetch(api + "user/" + userId,
        {
            method: "delete"
        })
        .then(response => response.json())
        .then(data=> {
            console.log(data)
            getUsers()
        })
}

//********** modif utilisateur***********//

function searchUserByMailtwo() {
    let criterialResearch = document.querySelector("#email").value //faire une recherche par critere ici mail**value. pour rentrer une valeur */
    fetch(api + "user/findByMail/" + criterialResearch)
        .then(response => response.json())
        .then(users => {
            let tab = [users]
           modifUserList(tab)
        })
        .catch(error => console.error(error));
}

async function navigateTomodifUser(userId) {
    fetch(api + "user/findById/" + userId,
        {
            method: "get"
        })
        .then(response => response.json())
        .then(data=> {
            localStorage.setItem("user", JSON.stringify(data))//***json.stringify=convertir json en chaine****//  */
            window.location = "./modifUsers.html"
        })
}

function initModifUser(){
    let user = JSON.parse(localStorage.getItem("user")) //***json.parse=convertir une chaine en json****//  */
    console.log(user.mail);
    document.querySelector('#name').value = user.name
    document.querySelector('#firstname').value = user.firstname
    document.querySelector('#email').value = user.mail
    document.querySelector('#passWord').value = user.password
    document.querySelector('#btnModif').addEventListener('click',()=>{
        modifUser(user._id)
    })
}

function modifUser(userId) {
    let obj = {
      name: document.querySelector('#name').value,
      firstname: document.querySelector('#firstname').value,
      mail: document.querySelector('#email').value,
      password: document.querySelector('#passWord').value,
     }
      fetch(api + "user/" + userId,  {
        method: 'put',
        body: JSON.stringify(obj),
        headers: {
          'Content-Type': 'application/json'
        },
      })
      .then(response => response.json())
      .then(response => {
          document.location.href="./listUser.html";
  
      })
     
  }




