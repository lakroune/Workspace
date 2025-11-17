document.getElementById('close-modal-add').addEventListener('click', (e) => {
    let elementClick = e.target

    elementClick.closest('div.position-absolute').classList.toggle('d-none')
    document.getElementById('model-add-staff').querySelector('form').reset();
})

document.getElementById("input-photo-preview").addEventListener('keyup', function () {
    document.getElementById('photo-preview').src = document.getElementById("input-photo-preview").value
})