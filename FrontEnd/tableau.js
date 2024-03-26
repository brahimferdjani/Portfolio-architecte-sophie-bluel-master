async function getWorks() {
    const url = "http://localhost:5678/api/works";
    try {
        const reponse = await fetch(url);
        return await reponse.json();

    } catch (error) {
        console.log(error);
    }
}

async function renderWorks(works) {
    let html = "";
    works.forEach(work => {
        let htmlSegment = `<figure>
                            <img src="${work.imageUrl}" >
                            <figcaption>${work.title}</figcaption>
                        </figure>`;

        html += htmlSegment;
    });

    const gallery = document.querySelector(".gallery");
    gallery.innerHTML = html;
}

async function getCategories() {
    const url = "http://localhost:5678/api/categories";
    try {
        const reponse = await fetch(url);
        return await reponse.json();
    } catch (error) {
        console.log(error);
    }
}

function effectTous() {
    const bouttonTous = document.createElement("button");
    const contentTous = document.createTextNode("tous");
    bouttonTous.appendChild(contentTous);
    const positionTous = document.querySelector(".bouttons");
    positionTous.appendChild(bouttonTous);
    bouttonTous.addEventListener("click", async () => {
        const works = await getWorks();
        renderWorks(works);
    })


}

async function renderCategories() {
    const categories = await getCategories();
    let html = "";
    categories.forEach(category => {
        let divButton = document.createElement("div");
        let htmlSegment = `<button id=${category.id}>${category.name}</button>`;
        divButton.innerHTML = htmlSegment;
        divButton.querySelector("button").addEventListener("click", () => {
            filtreWorks(category.id);
        });
        const bouttons = document.querySelector(".bouttons");
        bouttons.appendChild(divButton);
    });
}

async function filtreWorks(id) {
    const works = await getWorks();
    const filtreDeWorks = works.filter(function (work) {
        return work.categoryId === id;
    });
    return renderWorks(filtreDeWorks);
}

function headSettingFontScript() {
    if (localStorage.token) {
        const htmlHead = document.querySelector("head");
        const fontAwesomeScript = document.createElement("script");
        fontAwesomeScript.setAttribute("src", "https://kit.fontawesome.com/53eb4fa86e.js");
        fontAwesomeScript.setAttribute("crossorigin", "anonymous");
        htmlHead.appendChild(fontAwesomeScript);
        console.log(htmlHead);
    }
}

function bannerModeEdition() {
    if (localStorage.token) {
        const body = document.querySelector("body");
        const divBanner = document.createElement("div");
        const iFontAwesome = document.createElement("i");
        const textEdition = document.createElement("p");
        const textEditionTitle = document.createTextNode("Mode édition");
        textEdition.appendChild(textEditionTitle);
        console.log(textEdition);
        iFontAwesome.classList.add("fa-regular");
        iFontAwesome.classList.add("fa-pen-to-square");
        divBanner.appendChild(iFontAwesome);
        divBanner.appendChild(textEdition);
        divBanner.classList.add("modale");
        body.prepend(divBanner);
    }
}

function logout() {
    if (localStorage.token) {
        const ulNavbar = document.querySelector("header nav ul li");
        const loginSelect = ulNavbar.nextElementSibling.nextElementSibling;
        const hrefSegment = "<a href=\"login.html\">logout</a>";
        loginSelect.innerHTML = hrefSegment;
        /* loginSelect.addEventListener("click", ()=>{
             localStorage.removeItem(token);
         }) */
    }
}


function buttonEdit() {
    if (localStorage.token) {
        const portfolio = document.querySelector("#portfolio");
        const modifierHtml = `<a href="#"><i class="fa-regular fa-pen-to-square"></i>modifier</a>`
        const createDiv = document.createElement("div");
        const createSpan = document.createElement("div");
        const sectionH2 = document.querySelector("#portfolio h2");
        createSpan.innerHTML = modifierHtml;
        portfolio.prepend(createDiv);
        createDiv.append(sectionH2);
        createDiv.append(createSpan);
        createDiv.setAttribute("class", "new_flex");
        createSpan.setAttribute("class", "new_flex");
        createSpan.classList.add("new_align");
    }
}

function editEvent() {
    const h2Select = document.querySelector("#portfolio h2");
    const aEditSelect = h2Select.nextElementSibling.firstChild;
    console.log(aEditSelect);
    aEditSelect.addEventListener("click", (event) => {
        const popHTML = `<div class="popup">
                            <a href=#><i class="fa-solid fa-x"></i></a>
                            <h3>Galerie photo</h3>
                            <div class="gallery"></div>
                            <button class="button">Ajouter une photo</button>
                        </div>`;
        const createDiv = document.createElement("div");
        createDiv.innerHTML = popHTML;
        createDiv.setAttribute("class", "popupBackground");
        createDiv.classList.add("active");
        const bodySelect = document.querySelector("body");
        bodySelect.prepend(createDiv);
        event.preventDefault();

        const xSelect = document.querySelector(".popup a");
        xSelect.addEventListener("click", (event)=>{
            createDiv.classList.remove("active");
            event.preventDefault();
        })
    })
}

function closeEdit () {
    const popupBackground = document.querySelector(".popupBackground")
    const xSelect = document.querySelector(".popup i.fa-x");
    console.log();
}

async function init() {
    console.log(localStorage.token);
    const works = await getWorks();
    renderWorks(works);
    getCategories();
    if (!localStorage.token) {
        effectTous();
        renderCategories();
    }
    headSettingFontScript();
    bannerModeEdition();
    logout();
    buttonEdit();
    editEvent();
}

init();