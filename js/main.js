class Github {

  async getUser(user) {
    const profileResponse = await fetch(`js/file.json`);
;

    const profile = await profileResponse.json();

    
    return {
      profile: profile,
      
      
    }
  }
}

class UI {
  constructor() {
    this.profile = document.getElementById('profile');
  }

  //Display profile in UI
  showProfile(joe) {
    this.profile.innerHTML = `
    <div class="card card-body mb-3">
      <div class="row">
        <div class="col-md-3">
          <img class="img-fluid mb-2" src="${joe.picture}">
          <a href="${joe.html_url}" target="_blank" class="btn btn-primary btn-block mb-4">View Profile</a>
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
    this.profile.innerHTML = '';
  }
}




//Init Github
const github = new Github;

//Init UI
const ui = new UI;

//Search Input
const searchUser = document.getElementById('searchSoldier');

//Search Input Event Listener
searchUser.addEventListener('keyup', (e) => {
  const userText = e.target.value.toLowerCase();

  if (userText !== '') {
    //Make http call
    github.getUser(userText)
    .then(data => {
  
      if (userText === 'snake-eyes' || userText === 'snake eyes') {
        ui.showProfile(data.profile.snakeEyes);
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





      console.log(data.profile.Fido);
    });
  } else {
    //Clear Profile
    ui.clearProfile();
  }


  //prevent enter from removing text and removing character info
  window.addEventListener('change', function(e) {
    if (e.keyIdentifier == 'U+000A' || e.keyIdentifier == 'Enter' || e.keyCode == 13) {
        if (e.target.nodeName == 'INPUT' && e.target.type == 'text') {
            e.preventDefault();
            return false;
        }
    }
}, true);

});




let name = document.querySelectorAll('.soldier-name');

for (let i = 0; i < name.length; i++) {
  name[i].addEventListener('click', function(){
    let getName = name[i].textContent.toLowerCase();

    if (getName == 'snake-eyes') {
      github.getUser(name)
      .then(data => {
        ui.showProfile(data.profile.snakeEyes);
        document.getElementById('searchSoldier').value = getName;
      });
    }
    else if (getName == 'outback') {
      github.getUser(name)
      .then(data => {
        ui.showProfile(data.profile.outback);
        document.getElementById('searchSoldier').value = getName;
      });
    }
    else if (getName == 'cobra commander' || getName == 'cobra-commander') {
      github.getUser(name)
      .then(data => {
        ui.showProfile(data.profile.cobraCommander);
        document.getElementById('searchSoldier').value = getName;
      });
    }
    else if (getName == 'destro') {
      github.getUser(name)
      .then(data => {
        ui.showProfile(data.profile.destro);
        document.getElementById('searchSoldier').value = getName;
      });
    }

  });
}



