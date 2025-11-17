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
document.getElementById('experiences-container').addEventListener('click', (e) => {
    let elementClick = e.target
    if (elementClick.tagName === "I") {
        elementClick.closest('div.experience').remove()
    }
})



function createExp(poste, entreprise, dateStart, dateEnd) {
    return {
        poste: poste,
        entreprise: entreprise,
        date_start: dateStart,
        date_end: dateEnd || "Présent"
    };
}
function createStaff(name, role, phone, email, photourl, experiences) {
    let IDwerker = Number(localStorage.getItem("id_worker")) || 0
    worker = {
        id: IDwerker,
        fullname: name,
        role: role,
        phone: phone,
        email: email,
        photourl: photourl,
        etat: "NotYet",
        experiences: experiences
    }
    localStorage.setItem('id_worker', ++IDwerker)
    return worker
}

document.getElementById('btn').addEventListener('click', () => {



 })

function show_Unassigned_Staff_list() {
    let staff_table = JSON.parse(localStorage.getItem("staff_table")) || []
    document.getElementById("Unassigned-Staff-list").innerHTML = ""
    staff_table.forEach(staff => {
        if (staff.etat === "NotYet") { 
            let staff_card = document.createElement("div")
            staff_card.className = "card m-1 p-0 bg-light"
            staff_card.setAttribute('id', staff.id)
            staff_card.innerHTML = ` <div class="card-body m-0 p-1 d-flex  gap-4 align-items-center" >
                                    <img src=" ${staff.photourl} " width="44" class="rounded-circle" alt="Photo">
                                    <div class="  ">
                                        <span class=" d-block fs-12"> ${staff.fullname}</span>
                                        <span class="  text-muted   fw-bold fs-10"> ${staff.role}</span>
                                    </div>
                                 </div> `
            document.getElementById("Unassigned-Staff-list").appendChild(staff_card)
        }
    });
}
