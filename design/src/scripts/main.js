import "../index.html";
import "./global";
import ImgPreviewer from "img-previewer";
import Fnon from "fnon";

const imgPreviewer = new ImgPreviewer(".dashboard");

const galleryItems = document.querySelectorAll(".gallery_item");
const editdocModal = document.querySelector(".modal#editdoc");
const mailDocModal = document.querySelector(".modal#maildoc");
const editDocID = editdocModal.querySelector("#docID");
const editDocPreviousTitle = editdocModal.querySelector("#previoustitle");
const noDocMsg = document.querySelector("#nodocmsg");

const mailDocID = mailDocModal.querySelector("#mailDocID");
const mailDocTitle = mailDocModal.querySelector("#mailDocTitle");

const deleteItem = (id) => {
    galleryItems.forEach((item) => {
        if (item.getAttribute("id") === id) {
            item.remove();
        }
    });

    if (document.querySelectorAll(".gallery_item").length === 0) {
        noDocMsg.classList.remove("d-none");
    }
};

galleryItems.forEach((item) => {
    const src = item.querySelector(".image_container img").getAttribute("src");
    const docTitle = item.querySelector(".doc_title").textContent;
    const downloader = item.querySelector(".downloader");
    const editButton = item.querySelector(".editButton");
    const mailButton = item.querySelector(".mailButton");
    const deleteButton = item.querySelector(".deleteButton");

    downloader.setAttribute("href", src);
    editButton.addEventListener("click", () => {
        editDocID.value = item.getAttribute("id");
        editDocPreviousTitle.value = docTitle;
    });

    mailButton.addEventListener("click", () => {
        mailDocID.value = item.getAttribute("id");
        mailDocTitle.value = docTitle;
    });

    deleteButton.addEventListener("click", () => {
        // const confirmDeletation = confirm(
        //     `Do you really want to delete ${docTitle}`
        // );
        // if (confirmDeletation) {
        //     deleteItem(item.getAttribute("id"));
        // }
        Fnon.Ask.Danger(
            `Do you really want to delete <b>${docTitle}</b>? <br> <img src="${src}" height="100" class="rounded">`,
            "Confirmation",
            "Yes",
            "Cancel",
            (result) => {
                if (result) {
                    deleteItem(item.getAttribute("id"));
                }
            }
        );
    });
});
