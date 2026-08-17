const showModal = document.querySelector(".show-modal");
const backDrop = document.querySelector(".backdrop");
const closeModalBtn = document.querySelector(".close-modal");
const modal = document.querySelector(".modal");
const cancelBtn = document.querySelector(".btn-cancel");


function openModal(e) {
    backDrop.classList.remove("hidden");

}

function closeModal(e) {
    backDrop.classList.add("hidden");
}


backDrop.addEventListener("click", closeModal);
closeModalBtn.addEventListener("click", closeModal);
cancelBtn.addEventListener("click", closeModal);
modal.addEventListener("click", (e) => {
    e.stopPropagation()
});



