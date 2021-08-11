const IsPrivate = document.getElementById("isprivate")
const Room = document.getElementById("room")

function Submit() {
  if (IsPrivate.checked) {
    alert("Checked")
  } else {
    alert("Unchecked")
  }
}
