const app = {
  people: [],
  savedPeople: [],
  baseUrl: "",
  KEY: "Nipun",
  init: () => {
    app.touchListeners();
    app.addData();
  },
  touchListeners: () => {
    document.getElementById("home").addEventListener("click", app.showData);
    document.getElementById("saved").addEventListener("click", app.showSaved);
    app.addData();
  },
  createDiv: () => {
    let homePage = document.querySelector(".homePage");
    let div = document.createElement("div");
    div.setAttribute("class", "card");
    div.classList.add("fixed", "dot");

    homePage.appendChild(div);

    let target = document.querySelector(".card");
    let tiny = new tinyshell(target);

    tiny.addEventListener("swipeleft", app.delete);
    tiny.addEventListener("swiperight", app.save);
    app.showData();
  },
  addData: () => {
    let url = `http://griffis.edumedia.ca/mad9022/tundra/get.profiles.php?gender`;
    fetch(url)
      .then(response => {
        return response.json();
      })
      .then(data => {
        let imgurl = decodeURIComponent(data.imgBaseURL);
        app.baseUrl = "https:" + imgurl;
        app.people = data.profiles;
        app.createDiv();
      });
  },
  showData: () => {
    document.querySelector(".homePage").classList.add("active");
    document.querySelector(".details").classList.remove("active");

    document.querySelector(".save").classList.remove("current");
    document.querySelector(".home").classList.add("current");
    let div = document.querySelector(".card");

    setTimeout(() => {
      div.classList.remove("dot");
      div.classList.add("active");
    }, 300);
    if (app.people.length <= 1) {
      app.addData();
    }
    let firstElement = app.people[0];
    if (div.innerHTML != "") {
    } else {
      let img = document.createElement("img");
      let name = document.createElement("p");
      let gender = document.createElement("p");
      let distance = document.createElement("p");

      img.setAttribute("src", `${app.baseUrl}${firstElement.avatar}`);
      img.setAttribute("alt", "image");

      name.textContent = `${firstElement.first} ${firstElement.last}`;
      gender.textContent = `Gender: ${firstElement.gender}`;
      distance.textContent = `Distance: ${firstElement.distance}`;

      div.appendChild(img);
      img.insertAdjacentElement("afterend", name);
      name.insertAdjacentElement("afterend", gender);
      gender.insertAdjacentElement("afterend", distance);
    }
  },
  delete: ev => {
    document.getElementById("swipeLeft").classList.add("overlay", "message");
    let div = document.querySelector(".card");
    setTimeout(() => {
      document
        .getElementById("swipeLeft")
        .classList.remove("overlay", "message");
      div.classList.add("goleft");

      div.parentElement.removeChild(div);
      app.createDiv();
    }, 500);
    app.people.splice([0], 1);
  },
  save: ev => {
    let div = document.querySelector(".card");
    document.getElementById("swipeRight").classList.add("overlay", "message");
    setTimeout(() => {
      document
        .getElementById("swipeRight")
        .classList.remove("overlay", "message");

      div.classList.add("goRight");
      div.parentElement.removeChild(div);
      app.createDiv();
    }, 500);

    app.savedPeople.push(app.people[0]);
    sessionStorage.setItem(app.KEY, JSON.stringify(app.savedPeople));
    app.people.splice([0], 1);
  },
  showSaved: () => {
    let secondPage = document.querySelector(".savedContent");

    document.querySelector(".home").classList.remove("current");
    document.querySelector(".save").classList.add("current");

    if (app.savedPeople.length == 0) {
      document.querySelector(".homePage").classList.remove("active");
      document.querySelector(".details").classList.add("active");

      secondPage.innerHTML = "";

      let p = document.createElement("p");
      p.textContent = "You dont have any profiles saved.";
      p.setAttribute("class", "content");

      secondPage.insertAdjacentElement("beforeend", p);
    } else {
      document.querySelector(".homePage").classList.remove("active");
      document.querySelector(".details").classList.add("active");

      let str = sessionStorage.getItem(app.KEY);
      app.savedPeople = JSON.parse(str);

      secondPage.innerHTML = "";
      app.savedPeople.forEach(element => {
        let li = document.createElement("li");
        li.setAttribute("class", "list-item");

        let listItem = document.createElement("div");
        listItem.setAttribute("class", "list-text");

        let icon = document.createElement("i");
        let img = document.createElement("img");
        let name = document.createElement("span");

        icon.setAttribute("class", "icon delete");
        img.setAttribute("src", app.baseUrl + element.avatar);
        img.setAttribute("alt", "logo");
        img.setAttribute("class", "avatar");

        name.textContent = `${element.first} ${element.last}`;
        li.setAttribute("data-target-id", element.id);
        li.appendChild(img);
        listItem.appendChild(name);
        name.insertAdjacentElement("afterend", icon);
        li.insertAdjacentElement("beforeend", listItem);

        secondPage.appendChild(li);
        icon.addEventListener("click", app.deleteItem);
      });
    }
  },
  deleteItem: ev => {
    let clicked = ev.target;
    let item = clicked.closest("[data-target-id]");
    let id = parseInt(item.getAttribute("data-target-id"));
    let gotElement = app.savedPeople.findIndex(element => element.id == id);
    app.savedPeople.splice(gotElement, 1);
    sessionStorage.setItem(app.KEY, JSON.stringify(app.savedPeople));
    app.showSaved();
  }
};
const ready = "cordova" in window ? "deviceready" : "DOMContentLoaded";
document.addEventListener(ready, app.init);
