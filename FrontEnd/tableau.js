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

function effectTous () {
    const bouttonTous = document.createElement("button");
    const contentTous = document.createTextNode("tous");
    bouttonTous.appendChild(contentTous);
    console.log(bouttonTous);
    const positionTous = document.querySelector(".bouttons");
    positionTous.appendChild(bouttonTous);
    bouttonTous.addEventListener("click", async ()=>{
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
        divButton.innerHTML= htmlSegment;
        divButton.querySelector("button").addEventListener("click", ()=>{
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

async function init() {
    const works = await getWorks();
    renderWorks(works);
    getCategories();
    effectTous();
    renderCategories();
}

init();