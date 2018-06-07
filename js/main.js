class Soldier {

  async getSoldier(soldier) {
    const profileResponse = await fetch(`js/file.json`);

    const profile = await profileResponse.json();
    
    return {
      profile: profile,
    }
  }
}


// if (window.matchMedia("min-width:2000px)").matches) {
// UI.showHover();
// } else {
//   console.log('no');
// }

class UI {
  constructor() {
    this.soldierProfile = document.getElementById('profile');
    this.toys = document.getElementById('toys');
    this.hoverImage = document.querySelector('.hoverImage');
  }

  

  //Display profile in UI
  showProfile(joe) {
    
    this.soldierProfile.innerHTML = `

    <div class="card card-body mb-3">
    <h2 class="card-title text-center card-header-name">${joe.codename}</h2>
      <div class="row">
        <div class="col-md-3 text-center">
          <img class="img-fluid mb-2" src="${joe.picture}">

        </div>
        <div class="col-md-9">
          <span class="badge badge-primary">Faction: ${joe.faction}</span>
          <span class="badge badge-primary">Sex: ${joe.sex}</span>
          <span class="badge badge-primary">Height: ${joe.height}</span>
          <span class="badge badge-primary">Weight: ${joe.weight}</span>

          <br><br>
          <ul class="list-group">
            <li class="list-group-item">Name: ${joe.name}</li>
            <li class="list-group-item">Grade: ${joe.grade}</li>
            <li class="list-group-item">Birthplace: ${joe.birthplace}</li>
            <li class="list-group-item">Primary MOS: ${joe.primary}</li>
            <li class="list-group-item">Secondary MOS: ${joe.secondary}</li>
            <li class="list-group-item">Current: ${joe.current}</li>
          </ul>
          <br>
          <p class="list-group-item bio">${joe.bio}</p>
        </div> 
      </div>
    </div>
    `;
   
    document.querySelector('.nav-buttons').style.display = 'block';
  }


  showToys(getToy) {
    this.toys.innerHTML = `
    <div class="card card-toys" style="width:20rem">
      <img class="card-img-top" src="${getToy.toys.toy1.toyPicture}" alt="Card image cap">
      <div class="card-body">
        <h4 class="card-title">${getToy.toys.toy1.toyTitle}</h4>
        <p class="card-text">${getToy.toys.toy1.toyInfo}.</p>
        <a href=${getToy.toys.toy1.toyAmazon} class="btn btn-success btn-block" target="_blank">Buy On Amazon</a>
      </div>
    </div>`;
  }

  showHover(onHover) {

    let hoverImage = document.querySelector('.hoverImage');
    
    hoverImage.innerHTML = `
      <div class="container hover-container">
      <h2 class="text-center">${onHover.name}</h2>
        <div class="row">
          <div class="col-lg-4">
            <img class="hover-img" src=${onHover.picture}>
          </div>
          <div class="col-lg-8 mt-5 pt-5">
            <p class="text-center"> ${onHover.hoverBio}</p>
          </div>
       </div>
      </div>
      `;
    // let hoverImage = document.querySelector('.hoverImage');
    
    // hoverImage.innerHTML = `
    //   <div class="container hover-container">
    //   <h2 class="text-center">${onHover.name}</h2>
    //     <div class="row">
    //       <div class="col-lg-4">
    //         <img class="hover-img" src=${onHover.picture}>
    //       </div>
    //       <div class="col-lg-8 mt-5 pt-5">
    //         <p class="text-center"> ${onHover.hoverBio}</p>
    //       </div>
    //    </div>
    //   </div>
    //   `;
  }
 
  //Show alert message
  showAlert(message, className) {
    //Clear any remaining alerts
    this.clearAlert();
    //create div
    const div = document.createElement('div');
    //Add classes
    div.className = className;
    //Add text
    div.appendChild(document.createTextNode(message));
    //Get parent
    const container = document.querySelector('.searchContainer');
    //Get search box
    const search = document.querySelector('.search');
    //Insert Alert
    container.insertBefore(div, search);

    //Timout after 3sec
    setTimeout(()=> {
      this.clearAlert();
    }, 2000);
  }

  //Clear Alert Message
  clearAlert() {
    const currentAlert = document.querySelector('.alert');

    if (currentAlert) {
      currentAlert.remove();
    }
  }

  //Clear profile
  clearProfile() {
    this.soldierProfile.innerHTML = '';
    this.toys.innerHTML = '';
    document.querySelector('.nav-buttons').style.display = 'none';
  }
}

//Init soldier
const soldier = new Soldier;




//Init UI
const ui = new UI;

//Search Input
const searchSoldier = document.getElementById('searchSoldier');

//Search Input Event Listener
searchSoldier.addEventListener('keyup', (e) => {
  const userText = e.target.value.toLowerCase();

  if (userText !== '') {
    //Make http call
    soldier.getSoldier(userText)
    .then(data => {
  
      if (userText === 'snake-eyes' || userText === 'snake eyes') {
        ui.showProfile(data.profile.snakeEyes);
        ui.showToys(data.profile.snakeEyes);
      } else if (userText === 'outback') {
        ui.showProfile(data.profile.outback);
      } else if (userText === 'cobra commander' || userText === 'cobra-commander') {
        ui.showProfile(data.profile.cobraCommander);
      } else if (userText === 'destro') {
        ui.showProfile(data.profile.destro);
      }
      else {
        ui.showAlert('This Soldier Was Not Found', 'alert alert-danger');
      }
    });
  } else {
    //Clear Profile
    ui.clearProfile();
  }


  //prevent enter from removing text and removing character info in search input
  window.addEventListener('change', function(e) {
    if (e.keyIdentifier == 'U+000A' || e.keyIdentifier == 'Enter' || e.keyCode == 13) {
      if (e.target.nodeName == 'INPUT' && e.target.type == 'text') {
        e.preventDefault();
        return false;
      }
    }
  }, true);

  e.preventDefault();
});


//CLICK CHARACTER NAME AND DISPLAY PROFILE

// //get drop down name
let name = document.querySelectorAll('.soldier-name');

//loop through and get index for name selected
for (let i = 0; i < name.length; i++) {
  name[i].addEventListener('click', function(){
    changeToProfile();
    let getName = name[i].textContent.toLowerCase();

    //show profile if clicked
    if (getName == 'snake-eyes') {
      soldier.getSoldier(name)
      .then(data => {
        ui.showProfile(data.profile.snakeEyes);
        ui.showToys(data.profile.snakeEyes);
        document.getElementById('searchSoldier').value = getName;
      });
    }
    else if (getName == 'outback') {
      soldier.getSoldier(name)
      .then(data => {
        ui.showProfile(data.profile.outback);
        ui.showToys(data.profile.outback);
        document.getElementById('searchSoldier').value = getName;
      });
    }
    else if (getName == 'cobra commander' || getName == 'cobra-commander') {
      soldier.getSoldier(name)
      .then(data => {
        ui.showProfile(data.profile.cobraCommander);
        ui.showToys(data.profile.cobraCommander);
        document.getElementById('searchSoldier').value = getName;
      });
    }
    else if (getName == 'destro') {
      soldier.getSoldier(name)
      .then(data => {
        ui.showProfile(data.profile.destro);
        ui.showToys(data.profile.destro);
        document.getElementById('searchSoldier').value = getName;
      });
    }

  });

}





// on mouseover display small image of soldier
for (let i = 0; i < name.length; i++) {
  name[i].addEventListener('mouseover', function(){
    let getName = name[i].textContent.toLowerCase();

    let hoverImage = document.querySelector('.hoverImage');
    hoverImage.style.display = 'block';
    document.querySelector('.overlay').style.display = 'block';


    //show hover profile if clicked
    if (getName == 'snake-eyes') {
      soldier.getSoldier(name)
      .then(data => {
        ui.showHover(data.profile.snakeEyes);
      });
    }
    else if (getName == 'outback') {
      soldier.getSoldier(name)
      .then(data => {
        ui.showHover(data.profile.outback);
      });
    }
    else if (getName == 'cobra commander' || getName == 'cobra-commander') {
      soldier.getSoldier(name)
      .then(data => {
        ui.showHover(data.profile.cobraCommander);
      });
    }
    else if (getName == 'destro') {
      soldier.getSoldier(name)
      .then(data => {
        ui.showHover(data.profile.destro);
      });
    }
  });
}
























//on mouseover display small image of soldier
// for (let i = 0; i < name.length; i++) {
//   name[i].addEventListener('mouseover', function(){
//     let getName = name[i].textContent.toLowerCase();

//     let hoverImage = document.querySelector('.hoverImage');
//     hoverImage.style.display = 'block';
//     document.querySelector('.overlay').style.display = 'block';
//     // let test = document.querySelector('.test');
//     // test.style.display = 'block';

//     //show profile if clicked
//     if (getName == 'snake-eyes') {
//       // hoverImage.src = 'img/joe/snake-eyes.jpg';
//       hoverImage.innerHTML = `
//       <div class="container">
//         <div class="row">
//           <div class="col-md-6">
//             <img src='img/joe/snake-eyes.jpg'>
//           </div>
//           <div class="col-md-6">
//             <h2>Snake-Eyes</h2>
//           </div>
//         </div>
//       </div>
      
//       `;
//     }
//     else if (getName == 'outback') {
//       hoverImage.src = 'img/joe/outback.jpg';
//     }
//     else if (getName == 'cobra commander' || getName == 'cobra-commander') {
//       hoverImage.src = 'img/cobra/cobra-commander.jpg';
//     }
//     else if (getName == 'destro') {
//       hoverImage.src = 'img/cobra/destro.jpg';
//     }
//   });
// }
//on mouseout remove image of soldier
for (let i = 0; i < name.length; i++) {
  name[i].addEventListener('mouseout', function(){
    document.querySelector('.hoverImage').style.display = 'none';
    document.querySelector('.overlay').style.display = 'none';

  });
}







//show/hide profile/toys/gallery 
function changeToProfile() {
  document.querySelector('.go-profile').style.display = 'block';
  document.querySelector('.go-toys').style.display = 'none';
  document.querySelector('.go-gallery').style.display = 'none';
}

function changeToToys() {
  document.querySelector('.go-profile').style.display = 'none';
  document.querySelector('.go-toys').style.display = 'block';
  document.querySelector('.go-gallery').style.display = 'none';
}

function changeToGallery() {
  document.querySelector('.go-profile').style.display = 'none';
  document.querySelector('.go-toys').style.display = 'none';
  document.querySelector('.go-gallery').style.display = 'block';
}









// ALLOW DIV ELEMENT TO MAINTAIN BUTTON HOVER COLOR
function hover() {

  let header = document.querySelector(".nav-buttons");
  let btns = header.getElementsByClassName("nav-item-options");
  for (let i = 0; i < btns.length; i++) {
    btns[i].addEventListener("click", function() {
      let current = document.getElementsByClassName("active");
      current[0].className = current[0].className.replace(" active", "");
      this.className += " active";
    });
  }
};
hover();


function changeJoeMenuTab() {
  let panelProfile = document.querySelector('.panel-profile');
  let header = document.querySelector(".dropdown-menu");
  let btns = header.getElementsByClassName("soldier-name");
  for (let i = 0; i < btns.length; i++) {
    btns[i].addEventListener("click", function() {
      let current = document.getElementsByClassName("active");
      current[0].className = current[0].className.replace(" active", "");
      panelProfile.className += " active";
    });
  }
}
changeJoeMenuTab();

function changeCobraMenuTab() {
  let panelProfile = document.querySelector('.panel-profile');
  let header = document.querySelector(".dropdown-menu2");
  let btns = header.getElementsByClassName("soldier-name");
  for (let i = 0; i < btns.length; i++) {
    btns[i].addEventListener("click", function() {
      let current = document.getElementsByClassName("active");
      current[0].className = current[0].className.replace(" active", "");
      panelProfile.className += " active";
    });
  }
}
changeCobraMenuTab();