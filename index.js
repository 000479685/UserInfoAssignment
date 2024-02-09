const API_URL = "https://reqres.in/api/users";

let userInfoData = [];
const userContainer = document.getElementById("user-container");
const detailContainer = document.getElementById("user-clicked-info");

async function getUserInfo() {
  // JUST TO UNDERSTAND HOW IT WORKS WITH THEN CATCH BLOCK
  // fetch(API_URL).then((data) => {
  //     return data.json();
  // }).then((dataJSON) => {
  //     createCardUI();
  // }).catch((error) => {
  //     userInfoData = dataInJson.data || [];
  // })
  try {
    const data = await fetch(API_URL);
    const dataInJson = await data.json();
    userInfoData = dataInJson.data;
    generateAllCards(userInfoData)
  } catch (error) {
    console.log("There was an error", error);
    userInfoData = [];
  }
}

function createCardUI(user) {
  let cardUI = `
    <div class="card  m-4" style="width: 18rem;">
  <img src=${user.avatar} class="card-img-top" alt="...">
  <div class="card-body">
    <h1>${user.first_name} ${user.last_name}</h1>
    <p class="card-text">${user.email}</p>
  </div>
  <button class="btn btn-primary" onclick="clickGetDetails(${user.id})">Get Details</button>
</div>
    `;

  userContainer.innerHTML += cardUI;
}

function generateAllCards(userData = []) {
    for(let i = 0 ; i < userData.length; i++) {
        createCardUI(userData[i]);
    }
}

async function clickGetDetails(id)
{
  try
  {
    const data = await fetch(API_URL);
    const dataInJson = await data.json();
    userInfoData = dataInJson.data;
    // id, email, first_name, last_name
    createDetailUI(userInfoData[id - 1]);
  } 
  catch (error) 
  {
    console.log("There was an error", error);
    userInfoData = [];
  }
}

function createDetailUI(user)
{
  detailContainer.innerHTML = "";
  detailContainer.innerHTML += `
  <table class="table table-striped">
  <tr>
    <td>
      id
    </td>
    <td>
      ${user.id}
    </td>
  </tr>
  <tr>
    <td>
      First Name
    </td>
    <td>
      ${user.first_name}
    </td>
  </tr>
  <tr>
    <td>
      Last Name
    </td>
    <td>
      ${user.last_name}
    </td>
  </tr>
  <tr>
    <td>
      Email
    </td>
    <td>
      ${user.email}
    </td>
  </tr>
  </table>
  `
}

getUserInfo();
