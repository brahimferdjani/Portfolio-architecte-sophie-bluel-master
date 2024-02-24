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

async function renderCategories() {
    const categories = await getCategories();
    let html = "";
    categories.forEach(category => {
        let htmlSegment = `<button>${category.name}</button>`;
        html += htmlSegment;
    });
    let bouttonTous = `<button>Tous</button>`

    const bouttons = document.querySelector(".bouttons");
    bouttons.innerHTML = bouttonTous + html;
}

const filtreBoutton = document.querySelector(".bouttons button");
console.log(filtreBoutton);

async function filtreWorks(id) {
    const works = await getWorks();
    const filtreDeWorks = works.filter(function (work) {
        return work.categoryId == id;
    });
    return filtreDeWorks;
}

async function init() {
    const works = await getWorks();
    renderWorks(works);
    getCategories();
    renderCategories();
}

init();