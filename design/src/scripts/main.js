import "../index.html";
import "./global";
import ImgPreviewer from "img-previewer";
import Fnon from "fnon";
import axios from "axios";
import { setAlert, removeAlert } from "./alerts";

const errorMsg = document.querySelector("#errorMsg");
const successMsg = document.querySelector("#successMsg");

const imgPreviewer = new ImgPreviewer(".gallery_container");

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

const newdocModal = document.querySelector(".modal#newdoc");
const newdocForm = document.querySelector("#newdocForm");

newdocForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const title = document.querySelector(
        "#newdocForm input[name='newdoc_title']"
    );
    const file = document.querySelector(
        "#newdocForm input[name='newdoc_file']"
    );

    const formData = new FormData();
    console.log(title.value);
    console.log(file.files);

    formData.append("title", title.value);
    formData.append("document", file.files[0]);

    axios
        .post("http://localhost:4000/api/docs", formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        })
        .then(function (response) {
            console.log(response);
            newdocForm.reset();
            newdocModal.querySelector(".btn-close").click();
            setAlert(successMsg, response.data.message, () => {
                setTimeout(() => {
                    removeAlert([successMsg]);
                }, 3000);
            });
        })
        .catch(function (error) {
            console.log(error.response);
            newdocForm.reset();
            newdocModal.querySelector(".btn-close").click();
            setAlert(errorMsg, error.response.data.message, () => {
                setTimeout(() => {
                    removeAlert([errorMsg]);
                }, 3000);
            });
        });
});
