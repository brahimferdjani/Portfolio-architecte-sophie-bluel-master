//let donneeSauvegarde = window.localStorage.getItem("tableau");

async function getWorks() {
    const url = "http://localhost:5678/api/works"; // .catch (function (){console.log(error);})
    try {
        const reponse = await fetch(url);
        return await reponse.json();
    } catch (error) {
        console.log(error);
    }
}

//const resultat = await getWorks();
//const sauvegarde = JSON.stringify(resultat);
//window.localStorage.setItem("tableau", sauvegarde);

async function renderWorks() {
    const works = await getWorks();
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

async function renderCategories() {
    const categories = await getCategories();
    /* let html = "";
    categories.forEach(category => {
        let htmlSegment = `<figure>
                            <img src="${work.imageUrl}" >
                            <figcaption>${work.title}</figcaption>
                        </figure>`;

        html += htmlSegment;
    });

    const gallery = document.querySelector(".gallery");
    gallery.innerHTML = html; */
}

async function filterObjet () {

    const boutonFiltrerObjets = document.querySelector(".objets");

    const works = await getWorks();

    boutonFiltrerObjets.addEventListener("click", function () {
        const objetsFiltrees = works.filter(function (work) {
            return work.categoryId == 1;
        });
        console.log(objetsFiltrees);

        const imageWorks = works.map(work => work.imageUrl);
        const imageTitle = works.map(work => work.title);

        for (let i = works.length-1; i>=0; i--){
            if (works[i].categoryId != 1){
                imageWorks.splice(i,1);
                imageTitle.splice(i,1);
            }
        }
    });
}

filterObjet();

async function filterAppartements () {

    const boutonFiltrerObjets = document.querySelector(".appartements");

    const works = await getWorks();

    boutonFiltrerObjets.addEventListener("click", function () {
        const objetsFiltrees = works.filter(function (work) {
            return work.categoryId == 2;
        });
        console.log(objetsFiltrees);
    });
}

filterAppartements();

async function filterHotel () {

    const boutonFiltrerObjets = document.querySelector(".hotels");

    const works = await getWorks();

    boutonFiltrerObjets.addEventListener("click", function () {
        const objetsFiltrees = works.filter(function (work) {
            return work.categoryId == 3;
        });
        console.log(objetsFiltrees);
    });
}

filterHotel();



function init() {
    getWorks();
    console.log(getWorks());
    getCategories();
    console.log(getCategories());
    renderWorks();
    renderCategories();
}

init();