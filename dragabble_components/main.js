//get all elements that has .card. put it in a collection named cards
const cards = document.querySelectorAll(".card");
const resetBtn = document.getElementById('reset');

//initiate variables and set their initial values
let grabPointX = 0; //how far from the card's left edge did u click
let grabPointY = 0; //how far from the card's top edge did u click
let draggedCard = null; //for setting what card is currently being dragged
let highestZ = 3; // for keeping the last clicked card be at the topmost of the stack

//loop through the "cards" collection and take one card, call it card
cards.forEach((card) => {

    // eto ang starting poing ng lahat ng cards mo. sa pwestong to sila babalik pag natrigger yung reset fucntion
    card.dataset.originalLeft = card.offsetLeft;
    card.dataset.originalTop = card.offsetTop;
    //bantayan mo tong card na to, pag na mousedown yan (click press), irecord mo sya sa "mouseEvent"
    card.addEventListener('pointerdown', (mouseEvent) => {
        card.classList.remove("sliding");
        //pag may naclick nang card, iseset mo sya ngayon as the current card, o yung draggedCard.
        //sya na yung value ng dragged card
        draggedCard = card;

        //set cardBox as the variable na maghahawak ng info ng clicked na element
        //kung gaano sya kalayo sa top, left, right, bottom + height saka width
        //basically locates where the clicked element is
        const cardBox = card.getBoundingClientRect();


        // so grabPointX/Y = "how far my finger/cursor is from the card's top-left corner"
        // this is the part na "naka-grab" mo sa card, kaya "grabPoint" — need natin to
        // para habang dumadrag, di sya nagjajump papuntang cursor position, kundi
        // sumusunod dun mismo sa hinawakan mong parte ng card
        grabPointX = mouseEvent.clientX - cardBox.left;
        grabPointY = mouseEvent.clientY - cardBox.top;

        // every set click on another card puts that card onto a higher zIndex meaning the last clicked card stays at the top
        // card 3 zIndex = 3 
        // card2 zIndex = 2
        // card1 zIndex = 1 -> (1)click => highestZ (3) + card1 (1) = zIndex card1 = 4 (HIGHEST ZINDEX = TOPMOST CARD)
        highestZ++;
        card.style.zIndex = highestZ;
        resetBtn.style.zIndex = highestZ + 1;

    });

});


window.addEventListener('pointermove', (mouseEvent) => {
    if (!draggedCard) return;

    // draggedCard.style.left = `${mouseEvent.clientX - grabPointX}px`;
    // draggedCard.style.top = `${mouseEvent.clientY - grabPointY}px`;

    // basically sa part ng code na to, nilalagay mo na yung bagong position ng card as you drag.
    // bale draggedCard.style.left is: current mouse/finger position (clientX) minus
    // grabPointX (yung layo ng hawak mo mula sa left edge ng card)
    // this is to change the card's CSS position under position: absolute; top/left:(n)px
    //
    // tip: kung tinanggal mo yung grabPointX/Y dito, yung TOP-LEFT corner ng card
    // yung susunod sa cursor/finger mo, hindi na yung eksaktong parte na hinawakan mo
    draggedCard.style.left = (mouseEvent.clientX - grabPointX) + "px";
    draggedCard.style.top = (mouseEvent.clientY - grabPointY) + "px";

});

window.addEventListener('pointerup', () => {
    if (!draggedCard) return;
    draggedCard = null;
});

resetBtn.addEventListener("click", () => {
    cards.forEach((card) => {
        card.classList.add("sliding");

        card.style.left = card.dataset.originalLeft + "px";
        card.style.top = card.dataset.originalTop + "px";
    });
});