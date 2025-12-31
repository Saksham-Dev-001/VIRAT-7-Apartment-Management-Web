import { db } from "./firebase.js";
import {
  collection,
  addDoc,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

window.sendNotification = async function () {
  const title = nTitle.value.trim();
  const message = nMessage.value.trim();
  const to = nTo.value;

  if (!title || !message) {
    alert("Fill all fields");
    return;
  }

  await addDoc(collection(db, "notifications"), {
    title,
    message,
    to,
    createdAt: serverTimestamp(),
    readBy: []
  });

  alert("Notification sent");
  nTitle.value = "";
  nMessage.value = "";
};

function goBack() {
  window.history.back();
}

function openMenu() {
  alert("Menu coming soon");
}

function goTo(page) {
  window.location.href = page;
}