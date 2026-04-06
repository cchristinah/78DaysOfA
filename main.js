const totalAs = 78;

const captions = [
    "The First A", "Inked A No.1", "Sandwich Wrapper A", "Inked A No.2",
    "Keychain A", "Crumpled Paper A", "Inked A No.3", "Wasabi A",
    "Rubber Band A", "Inked A No.4", "Banana A", "Grid Paper A",
    "Inked A No.5", "Opened Door A", "Sandwich Box A", "Inked A No.6",
    "Shelf A No.1", "Inked A No.7", "Hole Puncher A", "Lotion A",
    "Necklace A", "Wet Floor A", "Inked A No.8", "Crayon A No.1",
    "Jellyfish A", "Broken Mirror A", "Wire A No.1", "Stool A",
    "Pressed Lotion A", "Pencil Shaving A", "Yellow Staircase A No.1", "Inked A No.9",
    "Hairclip A", "Inked A No.10", "Subway A", "Inked A No.11",
    "The Grange A", "Coffee Stained A", "Shelf A No.2", "Wire A No.2",
    "Inked A No.10", "Wire A No.3", "Sticker A", "Inked A No.11",
    "String A", "Crumpled Paper Straw A", "Cat Bed A", "Crayon A No.2",
    "Squashed Lotion A", "OCADU Building A", "Paint A No.1", "Inked A No.12",
    "Lip Gloss A", "Inked A No.13", "Inked A No.14", "Stippled A",
    "Pressed Lip Gloss A", "Bubbles A", "Inked A No.15", "Railing A",
    "Inked A No.16", "Yellow Staircase A No.2", "Pastel A", "Paint A No.2",
    "Inked A No.17", "Wire A No.4", "Zoo A", "Monkey A",
    "Yellow Staircase A No.3", "Pipes A", "Frog Figure Shadow A", "Pill A",
    "Yellow Staircase A No.4", "Bird and Chair A", "Yellow Staircase A No.5", "Crayon A No.3",
    "Inked A No.18", "Ripped Tissue A"
];

const categories = [
    "Drawn","Drawn","Food","Drawn","Object","Found","Drawn","Food",
    "Found","Drawn","Food","Drawn","Drawn","Infrastructure","Food","Drawn",
    "Furniture","Drawn","Found","Product","Object","Found","Drawn","Drawn",
    "Animal","Found","Infrastructure","Furniture","Product","Found",
    "Yellow Staircase","Drawn","Object","Drawn","Infrastructure","Drawn",
    "Infrastructure","Found","Furniture","Infrastructure","Drawn","Infrastructure",
    "Found","Drawn","Found","Found","Furniture","Drawn","Product","Infrastructure",
    "Drawn","Drawn","Product","Drawn","Drawn","Drawn","Product","Product",
    "Drawn","Infrastructure","Drawn","Yellow Staircase","Drawn","Drawn",
    "Drawn","Infrastructure","Animal","Animal","Yellow Staircase","Infrastructure",
    "Object","Product","Yellow Staircase","Furniture","Yellow Staircase","Drawn",
    "Drawn","Found"
];

/* ---------------- Home Page ---------------- */

function renderCarousel() {
    const carousel = document.getElementById("carousel");
    if (!carousel) return;

    for (let i = 1; i <= totalAs * 2; i++) {
        const index = ((i - 1) % totalAs) + 1;

        const img = document.createElement("img");
        img.src = `images/DIDOArtboard${index}.svg`;
        img.alt = `A ${index}`;

        carousel.appendChild(img);
    }
}


function saveA(id, caption, category) {
    const collection = JSON.parse(localStorage.getItem("myACollection")) || [];

    const alreadySaved = collection.some(item => item.id === id);

    if (!alreadySaved) {
        collection.push({ id, caption, category });
        localStorage.setItem("myACollection", JSON.stringify(collection));
    }
}

function setupGenerateButton() {
    const button = document.getElementById("generate");
    const display = document.getElementById("result");

    if (!button || !display) return;

    button.addEventListener("click", () => {
    const savedCollection = JSON.parse(localStorage.getItem("myACollection")) || [];

    const collectedIds = savedCollection.map(item => item.id);

    const availableAs = [];

    for (let i = 1; i <= totalAs; i++) {
        if (!collectedIds.includes(i)) {
            availableAs.push(i);
        }
    }
    if (availableAs.length === 0) {
        display.innerHTML = `<p class="caption">Congratulations! You’ve collected all 78 A’s!!! 
        Go to your 'Collection' to view them and 'About' to learn about this project.</p>`;
        return;
    }

    const randomA = availableAs[Math.floor(Math.random() * availableAs.length)];

    const caption = captions[randomA - 1] || "No caption yet";
    const category = categories[randomA - 1] || "Uncategorized";

    display.innerHTML = `
        <img src="images/DIDOArtboard${randomA}.svg">
        <p class="caption">${randomA}/${totalAs} ${caption}</p>
    `;

    saveA(randomA, caption, category);
});
}

/* ---------------- Collection Page ---------------- */



function renderCollection() {
    const collectionDiv = document.getElementById("collection");
    if (!collectionDiv) return;

    const savedCollection = JSON.parse(localStorage.getItem("myACollection")) || [];

    collectionDiv.innerHTML = "";

    const grouped = savedCollection.reduce((acc, item) => {
        const category = item.category || "Uncategorized";

        if (!acc[category]) acc[category] = [];
        acc[category].push(item);

        return acc;
    }, {});

    Object.keys(grouped).sort().forEach(category => {

        const section = document.createElement("div");
        section.classList.add("category-row");

        const title = document.createElement("h2");
        title.classList.add("category-title");
        title.textContent = category;

        const row = document.createElement("div");
        row.classList.add("category-items");

        grouped[category].forEach(item => {
            const container = document.createElement("div");
            container.classList.add("collection-item");

            container.innerHTML = `
                <img src="images/DIDOArtboard${item.id}.svg">
                <p>${item.id}/78</p>
                <p>${item.caption}</p>
            `;

            row.appendChild(container);
        });

        section.appendChild(title);
        section.appendChild(row);
        collectionDiv.appendChild(section);
    });
}

function setupResetButton() {
    const resetBtn = document.getElementById("reset");
    if (!resetBtn) return;

    resetBtn.addEventListener("click", () => {
        const confirmReset = confirm("Reset your collection? This will delete all saved As and cannot be undone!");

        if (confirmReset) {
            localStorage.removeItem("myACollection");
            renderCollection();
        }
    });
}

/* ---------------- INIT ---------------- */

function init() {
    setupGenerateButton();
    renderCarousel();
    setupResetButton(); // ✅ ALWAYS run this

    if (document.getElementById("collection")) {
        renderCollection();
    }
}

document.addEventListener("DOMContentLoaded", init);