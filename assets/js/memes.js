---
---

var detailsModal = document.getElementById('detailsModal');
const modal = new bootstrap.Modal(detailsModal);
detailsModal.addEventListener('show.bs.modal', function (event) {
  enablePlaceholder();

  // Button that triggered the modal
  let button = event.relatedTarget;
  // Extract info from data-bs-* attributes
  let link = button.getAttribute('data-bs-link');
  let title = link.split("memes/").pop();
  title = title.split("videos/").pop();
  let date = button.getAttribute('data-bs-date');
  let user = button.getAttribute('data-bs-user');

  document.getElementById("modalTitle").innerHTML = title;
  document.getElementById("modalDate").innerHTML = date;
  document.getElementById("modalUser").innerHTML = user;

  if (link.includes(".mp4") || link.includes(".mov")) {
    document.getElementById("modalImg").src = "";
    document.getElementById("modalImg").style.display = "none";
    document.getElementById("modalVidSrc").src = link;
    document.getElementById("modalVid").style.display = "block";
    document.getElementById("modalVid").load();
    document.getElementById("modalVid").play();
  } else {
    document.getElementById("modalVidSrc").src = "";
    document.getElementById("modalVid").style.display = "none";
    document.getElementById("modalImg").src = link;
    document.getElementById("modalImg").style.display = "block";
  }

  let img = document.getElementById("modalImg");
  if (img.complete) {
    disablePlaceholder();
  } else {
    img.addEventListener('load', disablePlaceholder);
    img.addEventListener('error', function() {
      disablePlaceholder();
      console.log('error loading image');
    });
  }
})



function showRandom() {
  enablePlaceholder();

  // file.path item example: /assets/img/memes/2021-07-12--rsmall.zloty--b.jpg
  const siteUrl = "{{site.url}}";
  const file = fileArray[Math.floor(Math.random()*fileArray.length)];
  const path = file.path;
  const filename = file.basename;
  console.log(filename);
  const date = filename.split("--")[0];
  const user = filename.split("--")[1].replace("-", " ");

  document.getElementById("modalTitle").innerHTML = filename;
  document.getElementById("modalDate").innerHTML = date;
  document.getElementById("modalUser").innerHTML = user;

  if (path.includes(".mp4")) {
    document.getElementById("modalImg").src = "";
    document.getElementById("modalImg").style.display = "none";
    document.getElementById("modalVidSrc").src = siteUrl + path;
    document.getElementById("modalVid").style.display = "block";
  } else {
    document.getElementById("modalVidSrc").src = "";
    document.getElementById("modalVid").style.display = "none";
    document.getElementById("modalImg").src = siteUrl + path;
    document.getElementById("modalImg").style.display = "block";
  }


  let img = document.getElementById("modalImg");
  if (img.complete) {
    disablePlaceholder();
  } else {
    img.addEventListener('load', disablePlaceholder);
    img.addEventListener('error', function() {
      disablePlaceholder();
      console.log('error loading image');
    });
  }
  modal.show();
}



// Stop video when exiting modal
detailsModal.addEventListener('hide.bs.modal', function (event) {
  document.getElementById("modalVid").pause();
})



function enablePlaceholder() {
  document.getElementById("modalTitle").classList.add("placeholder");
  document.getElementById("modalImg").classList.add("placeholder");
  document.getElementById("modalVid").classList.add("placeholder");
  document.getElementById("modalDateWrapper").classList.add("placeholder");
  document.getElementById("modalUserWrapper").classList.add("placeholder");
}
function disablePlaceholder() {
  document.getElementById("modalTitle").classList.remove("placeholder");
  document.getElementById("modalImg").classList.remove("placeholder");
  document.getElementById("modalVid").classList.remove("placeholder");
  document.getElementById("modalDateWrapper").classList.remove("placeholder");
  document.getElementById("modalUserWrapper").classList.remove("placeholder");
}