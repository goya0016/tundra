const app={
    people:[],
    savedPeople:[],
    baseUrl:"",
    KEY:"Nipun",
    init:()=>{
       app.touchListeners();
    },
    touchListeners:()=>{
        let target = document.querySelector(".card");
        let tiny = new tinyshell(target);

        tiny.addEventListener("swipeleft", app.delete);
        tiny.addEventListener("swiperight", app.save);
        document.getElementById('home').addEventListener('click',app.showData);
        document.getElementById('saved').addEventListener('click',app.showSaved);

        app.addData();
    },
    addData:()=>{
        let url=`http://griffis.edumedia.ca/mad9022/tundra/get.profiles.php?gender`;
        fetch(url)
        .then(response=>{
            return response.json();
        })
        .then(data=>{
            let imgurl = decodeURIComponent(data.imgBaseURL);
            app.baseUrl="https:"+imgurl;
            app.people = data.profiles;
            app.showData();
        
                      
        })
    },
    showData:()=>{
        document.querySelector(".card").classList.add('active');
        document.querySelector(".details").classList.remove('active');

        if(app.people.length<=1){
            app.addData();
        }
        let firstElement = app.people[0];
        document.querySelector("img").src = `${app.baseUrl}${firstElement.avatar}`;
        document.querySelector(".name").textContent = `${firstElement.first} ${firstElement.last}`;
        document.querySelector(".gender").textContent = `Gender: ${firstElement.gender}`;
        document.querySelector(".distance").textContent = `Distance: ${firstElement.distance}`;

    },
    delete:(ev)=>{
        app.people.splice([0],1);
        app.showData();
    },
    save:(ev)=>{
        app.savedPeople.push(app.people[0])
        sessionStorage.setItem(app.KEY,JSON.stringify(app.savedPeople))
        app.people.splice([0],1);
        app.showData();
    },
    showSaved:()=>{
        document.querySelector(".card").classList.remove("active");
        document.querySelector(".details").classList.add("active");
       
          let str = sessionStorage.getItem(app.KEY);
          app.savedPeople = JSON.parse(str);

        let secondPage = document.querySelector('.details');
        secondPage.innerHTML="";
         app.savedPeople.forEach(element => {
             let div= document.createElement('div');
             let icon= document.createElement('button');
             let  img = document.createElement('img');
                let name = document.createElement('span');
                let gender = document.createElement("span");
                icon.textContent="delete";
                img.setAttribute('src', app.baseUrl+element.avatar);
                img.setAttribute('alt',"logo");
                img.setAttribute('class','logo');

                name.textContent=`${element.first} ${element.last}`;
                gender.textContent=` ${element.gender} ${element.distance}`;
            div.setAttribute("data-target-id", element.id);
                div.appendChild(img);
                name.appendChild(gender);
                img.insertAdjacentElement("afterend",name);
                div.insertAdjacentElement('beforeend',icon);

                secondPage.appendChild(div);
                icon.addEventListener('click',app.deleteItem)
         });
        
    },
    deleteItem:(ev)=>{
   let clicked = ev.target;
   let item = clicked.closest("[data-target-id]");
   let id = parseInt(item.getAttribute("data-target-id"));
   let gotElement = app.savedPeople.findIndex(element=>element.id==id)
   app.savedPeople.splice(gotElement, 1);
   sessionStorage.setItem(app.KEY,JSON.stringify(app.savedPeople));
   app.showSaved();
    }
}
const ready = "cordova" in window ? "deviceready" : "DOMContentLoaded";
document.addEventListener(ready, app.init);