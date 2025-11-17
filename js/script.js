document.getElementById('close-modal-add').addEventListener('click', (e) => {
    let elementClick = e.target

    elementClick.closest('div.position-absolute').classList.toggle('d-none')
    document.getElementById('model-add-staff').querySelector('form').reset();
})

document.getElementById("input-photo-preview").addEventListener('keyup', function () {
    document.getElementById('photo-preview').src = document.getElementById("input-photo-preview").value
})



let countExp = 2
document.getElementById("add-exp").addEventListener('click', function () {
    let experienceform = document.createElement('div')
    experienceform.className = 'experience p-1'
    experienceform.innerHTML = `
                             <div class="d-flex justify-content-between p-1">
                            <span class="badge bg-success p-2">
                                Experience ${countExp++}
                            </span>
                            <button type="button" class=" bg-opacity-0 bg-light border-0 text-danger ">
                                <i class="bi bi-file-earmark-x">
                                </i>
                            </button>
                        </div>
                        <div class=" d-flex flex-column  fs-12 gap-1 ">
                            <label for="poste">Poste</label>
                            <input type="text" placeholder="Poste" class=" border p-1 rounded " name="postes" required>
                            <label for="entreprise"> Entreprise</label>
                            <input type="text" placeholder="Entreprise" class="border p-1 rounded " name="entreprises"
                                required>
                            <div class="d-flex justify-content-between gap-1">
                                <span class="flex-grow-1">date start</span> <span class="flex-grow-1"> date end</span>
                            </div>
                            <div class="d-flex justify-content-between gap-1">
                                <input type="date" placeholder="Années (ex: 2019-2022)"
                                    class="flex-grow-1 border p-1 rounded  " name="date_start" required>
                                <input type="date" placeholder="Années (ex: 2019-2022)"
                                    class="flex-grow-1 border rounded" name="date_end" required>
                            </div>
                        </div>
    `
    document.getElementById('experiences-container').appendChild(experienceform)
})