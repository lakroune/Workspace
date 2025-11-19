show_Unassigned_Staff_list()

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

document.getElementById('btn').addEventListener('click', () => {
    const name_input = document.getElementById('model-add-staff').querySelector('input[name="name"]');
    const role_input = document.getElementById('model-add-staff').querySelector('select[name="role"]');
    const phone_input = document.getElementById('model-add-staff').querySelector('input[name="phone"]');
    const email_input = document.getElementById('model-add-staff').querySelector('input[name="email"]');
    const photo_input = document.getElementById('model-add-staff').querySelector('input[name="photo"]');
    const experiences = document.getElementById('experiences-container').querySelectorAll('div.experience');
    let experiencestable = []
    if (experiences) {
        experiences.forEach(element => {
            experiencestable.push(createExp(element.querySelector('input[name="postes"]').value, element.querySelector('input[name="entreprises"]').value, element.querySelector('input[name="date_start"]').value, element.querySelector('input[name="date_end"]').value))
        });
    }
    let newStaff = createStaff(name_input.value, role_input.value, phone_input.value, email_input.value, photo_input.value, experiencestable)
    let staff_table = JSON.parse(localStorage.getItem("staff_table")) || []
    staff_table.push(newStaff)
    localStorage.setItem("staff_table", JSON.stringify(staff_table))
    document.getElementById('model-add-staff').querySelector('form').reset();

    document.getElementById("model-add-staff").classList.toggle('d-none')
    show_Unassigned_Staff_list()
})

document.getElementById("btn-add-staff").addEventListener('click', () => {
    document.getElementById("model-add-staff").classList.toggle('d-none')
})



document.getElementById('add_workers_Archives_room').addEventListener('click', function () {
    document.getElementById('model-filter-staff').classList.remove('d-none')
    document.getElementById('model-filter-staff').setAttribute('data-room', 'Archives_room')
    let workers = JSON.parse(localStorage.getItem("staff_table"))
    let workers_in_archives_room = workers.filter(worker => worker.role === "Manager" && worker.etat === 'NotYet')
    affiche_list_worker_filter(workers_in_archives_room, "ligal")
})


document.getElementById('add_workers_Conference_room').addEventListener('click', function () {
    document.getElementById('model-filter-staff').classList.remove('d-none')
    document.getElementById('model-filter-staff').setAttribute('data-room', 'Conference_room')
    let workers = JSON.parse(localStorage.getItem("staff_table"))
    let workers_in_conference_room = workers.filter(worker => worker.etat === 'NotYet')
    affiche_list_worker_filter(workers_in_conference_room, "ligal")
})



document.getElementById('add_workers_Reception_room').addEventListener('click', function () {
    document.getElementById('model-filter-staff').classList.remove('d-none')
    document.getElementById('model-filter-staff').setAttribute('data-room', 'Reception_room')
    let workers = JSON.parse(localStorage.getItem("staff_table"))
    let workers_in_Reception_room = workers.filter(worker => worker.etat === 'NotYet' && (worker.role === "Manager" || worker.role === "Receptionist"))
    affiche_list_worker_filter(workers_in_Reception_room, "ligal")
})
document.getElementById('add_workers_Server_room').addEventListener('click', function () {
    document.getElementById('model-filter-staff').classList.remove('d-none')
    document.getElementById('model-filter-staff').setAttribute('data-room', 'Server_room')
    let workers = JSON.parse(localStorage.getItem("staff_table"))
    let workers_in_Server_room = workers.filter(worker => worker.etat === 'NotYet' && (worker.role === "Manager" || worker.role === "IT Technician" || worker.role === "Cleaning staff"))
    affiche_list_worker_filter(workers_in_Server_room, "ligal")
})

document.getElementById('add_workers_Security_room').addEventListener('click', function () {
    document.getElementById('model-filter-staff').classList.remove('d-none')
    document.getElementById('model-filter-staff').setAttribute('data-room', 'Security_room')
    let workers = JSON.parse(localStorage.getItem("staff_table"))
    let workers_in_Security_room = workers.filter(worker => worker.etat === 'NotYet' && (worker.role === "Manager" || worker.role === "Security Officer" || worker.role === "Cleaning staff"))
    affiche_list_worker_filter(workers_in_Security_room, "ligal")

})

document.getElementById('add_workers_Staff_room').addEventListener('click', function () {
    document.getElementById('model-filter-staff').classList.remove('d-none')
    document.getElementById('model-filter-staff').setAttribute('data-room', 'Staff_room')
    let workers = JSON.parse(localStorage.getItem("staff_table"))
    let workers_in_Staff_room = workers.filter(worker => worker.etat === 'NotYet')
    affiche_list_worker_filter(workers_in_Staff_room, "ligal")
})

// ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
function addWorkerToRoom(worker, room) {
    const roomCard = document.getElementById(room).querySelector("div.cards-continer")
    const divWorker = document.createElement("div");
    divWorker.className = "  w-auto d-flex  p-0  gap-1 justify-content-between  bg-light rounded   border";
    document.getElementById(room).classList.remove("bg-danger")
    divWorker.innerHTML = `
        <img src="${worker.photourl}" 
             width="38" height="38" class="rounded-circle">
        <div>
            <small class="fs-12 text-muted   " >${worker.fullname}</small>
            <small class="text-muted d-block fs-10">${worker.role}</small>
        </div>
        <button class=" bg-light   border-0 rounded  text-danger p-0 m-0" onclick="removeWorkerFromRoom(${worker.id})">
           x
        </button`
    roomCard.appendChild(divWorker)
}

function removeWorkerFromRoom(idworker) {
    let staff_table = JSON.parse(localStorage.getItem("staff_table")) || [];
    staff_table = staff_table.map(worker => {
        if (worker.id == Number(idworker)) {
            return { ...worker, etat: "NotYet" };
        }
        return worker;
    })
    localStorage.setItem('staff_table', JSON.stringify(staff_table))
    assign_Staff_to_Carte()
    show_Unassigned_Staff_list()
}

function reset_Staff_to_Carte() {
    document.getElementById("ConferenceRoom").querySelector("div.cards-continer").innerHTML = ""
    document.getElementById("StaffRoom").querySelector("div.cards-continer").innerHTML = ""
    document.getElementById("Reception").querySelector("div.cards-continer").innerHTML = ""
    document.getElementById("ServerRoom").querySelector("div.cards-continer").innerHTML = ""
    document.getElementById("SecurityRoom").querySelector("div.cards-continer").innerHTML = ""
    document.getElementById("ArchivesRoom").querySelector("div.cards-continer").innerHTML = ""
    document.getElementById("Reception").classList.add('bg-danger')
    document.getElementById("ServerRoom").classList.add('bg-danger')
    document.getElementById("SecurityRoom").classList.add('bg-danger')
    document.getElementById("ArchivesRoom").classList.add('bg-danger')

}


function affiche_worker_filter_title(title) {
    let carttitile = document.createElement('div')
    carttitile.className = "d-flex justify-content-between "
    carttitile.innerHTML =
        `   <span class="p-2"> ${title}  </span> 
         <button class="  border-0  bg-white bg-opacity-0  m-0 p-0  rounded  text-danger  ">
                   X
                </button>       
             `
    carttitile.addEventListener('click', (e) => {
        if (e.target.tagName === 'BUTTON')
            document.getElementById('model-filter-staff').classList.toggle('d-none')
    })
    return carttitile
}
function affiche_worker_filter(worker) {
    let cartworker = document.createElement('div')
    cartworker.className = "d-flex bg-light  border justify-content-center align-items-center m-1 rounded p-1 worker"
    cartworker.id = worker.id
    cartworker.innerHTML =
        `  
                    <div class=" ">
                        <img id="photo-preview" width="44" height="44" class="rounded-5" src="${worker.photourl}"
                            alt="preview" />
                    </div>
                    <div class="flex-grow-1">
                        <div class=" p-1 fs-12  d-flex flex-column ">
                            <label>${worker.fullname} </label>
                            <label class="">${worker.role} </label>
                        </div>

                    </div>
            `
    return cartworker
}






function affiche_list_worker_filter(whoker_in_room, title) {
    document.getElementById('model-filter-staff').innerHTML = ""
    document.getElementById('model-filter-staff').append(affiche_worker_filter_title(title))
    whoker_in_room.forEach(worker => {
        document.getElementById('model-filter-staff').append(affiche_worker_filter(worker))
    });
}
