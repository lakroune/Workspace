assign_Staff_to_Carte()
show_Unassigned_Staff_list()
let countExp = 2

document.getElementById('close-modal-add').addEventListener('click', (e) => {
    let elementClick = e.target
    elementClick.closest('div.position-absolute').classList.toggle('d-none')
    document.getElementById('model-add-staff').querySelector('form').reset();
})


document.getElementById("input-photo-preview").addEventListener('keyup', function () {
    document.getElementById('photo-preview').src = document.getElementById("input-photo-preview").value

})


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
                                <input type="date"  class="flex-grow-1 border p-1 rounded " name="date_start" required>
                                <input type="date" class="flex-grow-1 border rounded" name="date_end" required>
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


document.getElementById('btn').addEventListener('click', () => {

    const name_input = document.getElementById('model-add-staff').querySelector('input[name="name"]');
    const role_input = document.getElementById('model-add-staff').querySelector('select[name="role"]');
    const phone_input = document.getElementById('model-add-staff').querySelector('input[name="phone"]');
    const email_input = document.getElementById('model-add-staff').querySelector('input[name="email"]');
    const photo_input = document.getElementById('model-add-staff').querySelector('input[name="photo"]');
    const experiences = document.getElementById('experiences-container').querySelectorAll('div.experience');

    /////validation des champs 
    let isValid = true
    const nameRegex = /^[A-Za-z\s]{3,13}$/;
    const emailRegex = /^[a-zA-Z0-9_.-]{3,15}@[a-zA-Z]{3,8}\.[a-zA-Z]{2,5}$/;
    const phoneRegex = /^0[5-7]{1}[0-9]{8}$/;


    if (!nameRegex.test(name_input.value.trim())) {
        alert('Name invalid: Must be 3-13 letters and spaces');
        name_input.focus();
        return
    }
    if (role_input.value.trim() == "") {
        alert('Please select a role.');
        role_input.focus();
        return
    }
    if (!phoneRegex.test(phone_input.value.trim())) {
        alert('Phone invalid: Must be 05/06/07 followed by 8 digits');
        phone_input.focus();
        return
    }
    if (!emailRegex.test(email_input.value.trim())) {
        alert('Email invalid: Must be in the format user@domain.com');
        email_input.focus();
        return
    }



    let experiencestable = []
    if (experiences) {
        experiences.forEach(element => {
            let poste = element.querySelector('input[name="postes"]')
            let entreprise = element.querySelector('input[name="entreprises"]')
            let date_start = element.querySelector('input[name="date_start"]')
            let date_end = element.querySelector('input[name="date_end"]')
            // validation/ regExp pour experiences
            const posteRegex = /^[A-Za-z\s]{3,30}$/;
            const entrepriseRegex = /^[A-Za-z0-9\s]{3,30}$/;

            if (poste && !posteRegex.test(poste.value.trim())) {
                alert('Job Title invalid: Must be 3-30 letters ');
                poste.focus();
                isValid = false
                return
            }
            if (entreprise && !entrepriseRegex.test(entreprise.value.trim())) {
                alert('Company Name invalid: Must be 3-30 letters,')
                isValid = false
                return
            }
            if (date_start == "" || date_end == "") {
                alert('Start date and end date are required for each experience.')
                isValid = false
                return
            }

            const startDate = new Date(date_start.value);
            const endDate = new Date(date_end.value);


            if (startDate > endDate) {
                alert('input date invalid: Start date must be before or equal to end date.');
                isValid = false
                return
            }


            if (isValid) {
                experiencestable.push({
                    poste: poste.value,
                    entreprise: entreprise.value,
                    date_start: startDate.getTime(),
                    date_end: endDate.getTime()
                });
            }

        });
    }

    if (isValid && experiencestable.length > 1) {
        for (let i = 0; i < experiencestable.length; i++) {
            const expA = experiencestable[i];
            for (let j = i + 1; j < experiencestable.length; j++) {
                const expB = experiencestable[j];

                if (expA.date_start <= expB.date_end && expB.date_start <= expA.date_end) {
                    alert(`Date invalid: Experiences for "${expA.poste}" (${new Date(expA.date_start).getFullYear()}-${new Date(expA.date_end).getFullYear()}) and "${expB.poste}" (${new Date(expB.date_start).getFullYear()}-${new Date(expB.date_end).getFullYear()}) are overlapping!`);
                    isValid = false;
                    break;
                }
            }
            if (!isValid) {
                break;
            }
        }
    }



    if (isValid === true) {
        const finalExperiences = experiencestable.map(exp => ({
            poste: exp.poste,
            entreprise: exp.entreprise,
            date_start: new Date(exp.date_start).getFullYear() + "/" + new Date(exp.date_start).getMonth(),
            date_end: new Date(exp.date_end).getFullYear() + "/" + new Date(exp.date_end).getMonth()
        }));


        let newStaff = createStaff(name_input.value, role_input.value, phone_input.value, email_input.value, photo_input.value, finalExperiences) // Using finalExperiences instead of calling createExp on the spot

        let staff_table = JSON.parse(localStorage.getItem("staff_table")) || []
        staff_table.push(newStaff)
        localStorage.setItem("staff_table", JSON.stringify(staff_table))
        document.getElementById('model-add-staff').querySelector('form').reset();
        document.getElementById("model-add-staff").classList.toggle('d-none')
        show_Unassigned_Staff_list()
    }
})
document.getElementById("btn-add-staff").addEventListener('click', () => {
    document.getElementById("model-add-staff").classList.toggle('d-none')
})




document.getElementById('Unassigned-Staff-list').addEventListener('click', (e) => {
    let card = e.target.closest('div.card');
    if (!card) return;

    let staff_table = JSON.parse(localStorage.getItem("staff_table")) || []
    let index = Number(card.getAttribute('id'))
    let div = document.createElement('div')
    div.className = "   d-flex  justify-content-center align-items-center  bg-dark   bg-opacity-75   vh-100 w-100 d-flex position-absolute  modelshowstaff"
    div.innerHTML = show_staff(staff_table[index])
    document.querySelector('body').appendChild(div)

    document.querySelector("div.modelshowstaff").addEventListener('click', (e) => {
        let buttuobclick = e.target
        if (buttuobclick.tagName === "BUTTON")
            document.querySelector("div.modelshowstaff").remove()
    });

})

document.querySelector('div.grid').addEventListener('click', (e) => {
    let elelmentclick = e.target
    let worker_assign = elelmentclick.closest('div.worker-asigne-to-room')
    if (elelmentclick.tagName === 'BUTTON')
        return

    let staff_table = JSON.parse(localStorage.getItem("staff_table")) || []
    let index = Number(worker_assign.getAttribute('id'))
    let div = document.createElement('div')
    div.className = "   d-flex  justify-content-center align-items-center  bg-dark   bg-opacity-75   vh-100 w-100 d-flex position-absolute  modelshowstaff"
    div.innerHTML = show_staff(staff_table[index])
    document.querySelector('body').appendChild(div)

    document.querySelector("div.modelshowstaff").addEventListener('click', (e) => {
        let buttuobclick = e.target
        if (buttuobclick.tagName === "BUTTON")
            document.querySelector("div.modelshowstaff").remove()
    });

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
// ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
function addWorkerToRoom(worker, room) {
    const roomCard = document.getElementById(room).querySelector("div.cards-continer")
    const divWorker = document.createElement("div");
    divWorker.className = "  w-auto d-flex  p-0  gap-1 justify-content-between  bg-light rounded  worker-asigne-to-room border";
    divWorker.id = worker.id
    document.getElementById(room).classList.remove("bg-danger")
    divWorker.innerHTML = `
        <img src="${worker.photourl}" 
             width="38" height="38" class="rounded-circle">
        <div>
            <small class="fs-12 text-muted   " >${worker.fullname}</small>
            <small class="text-muted d-block fs-10">${worker.role}</small>
        </div>
        <button class=" bg-light   border-0 rounded  text-danger p-0 m-0 " onclick="removeWorkerFromRoom(${worker.id})">
           x
        </button`
    roomCard.appendChild(divWorker)
}

function countWorkerFromRoom(room, etat) {
    let staff_table = JSON.parse(localStorage.getItem("staff_table")) || [];
    let contWorker = staff_table.filter(elelment => elelment.etat === etat) || [];
    document.getElementById(room).querySelector("span.count").textContent = contWorker.length;
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


function assign_Staff_to_Carte() {
    const staff_table = JSON.parse(localStorage.getItem("staff_table")) || [];
    reset_Staff_to_Carte()
    countWorkerFromRoom("ArchivesRoom", "Archives_room")
    countWorkerFromRoom("StaffRoom", "Staff_room")
    countWorkerFromRoom("SecurityRoom", "Security_room")
    countWorkerFromRoom("ServerRoom", "Server_room")
    countWorkerFromRoom("ConferenceRoom", "Conference_room")
    countWorkerFromRoom("Reception", "Reception_room")
    staff_table.forEach(staff => {
        switch (staff.etat) {
            case "Conference_room":
                addWorkerToRoom(staff, "ConferenceRoom")
                break;

            case "Reception_room":
                addWorkerToRoom(staff, "Reception");
                break;

            case "Server_room":
                addWorkerToRoom(staff, "ServerRoom");
                break;

            case "Security_room":
                addWorkerToRoom(staff, "SecurityRoom");
                break;

            case "Staff_room":
                addWorkerToRoom(staff, "StaffRoom");
                break;

            case "Archives_room":
                addWorkerToRoom(staff, "ArchivesRoom");
                break;

        }

    });

}



function show_staff(staff) {
    return `  <div class="card  bg-ligth border-0  w-25 ">
            <div class="  d-flex justify-content-end">
                <button class=" fs-4 p-2 bg-light   border-0 rounded  text-danger p-0 m-0">
                    x
                </button>
            </div>
            <div class="p-2 ">

                <div class="d-flex justify-content-start gap-3 align-items-center  p-1 border-bottom ">


                    <img src="${staff.photourl}" width="100" height="100"
                        class="rounded-circle border border-4" alt="Photo staff">


                    <div class=" d-flex flex-column justify-content-center align-items-center fs-12">
                        <span class=" fw-bold">${staff.fullname}</span>
                        <p class="text-muted">${staff.role}</p>
                    </div>
                </div>

                <h6 class=" text-secondary mt-1  fs-12">📞 CONTACT</h6>
                <div class="row mb-4">

                    <div class="col-md-6 mb-2 fs-12">
                        <span class="d-block fw-bold ">PHONE</span>
                        <span class="text-dark">${staff.phone}</span>
                    </div>

                    <div class="col-6 mb-2 fs-12">
                        <span class="d-block fw-bold ">EMAIL</span>
                        <span class="text-dark"> ${staff.email}</span>
                    </div>
                </div>

                <h6 class=" fs-12 mb-3">💼 Experiences </h6>

                <div class="list-group fs-12 list-group-flush  scroll-y ">
                    ${showExp(staff.experiences)}
                     
                </div>

            </div>
        </div>`
}

function showExp(experiences) {
    return experiences.map((experience) => {
        return ` <div class="list-group-item d-flex justify-content-between align-items-start px-0">
                        <div>
                            <span class="fw-bold d-block">${experience.poste}</span>
                            <small class="text-muted">${experience.entreprise}</small>
                        </div>
                        <span class="badge bg-secondary mt-1">${experience.date_start} - ${experience.date_end}</span>
                    </div>`
    });
}




document.getElementById('add_workers_Archives_room').addEventListener('click', function () {
    document.getElementById('model-filter-staff').classList.remove('d-none')
    document.getElementById('model-filter-staff').setAttribute('data-room', 'Archives_room')
    let workers = JSON.parse(localStorage.getItem("staff_table"))
    let workers_in_archives_room = workers.filter(worker => worker.role === "Manager" && worker.etat === 'NotYet')
    affiche_list_worker_filter(workers_in_archives_room, "Assign Staff to Room")
})

document.getElementById('add_workers_Conference_room').addEventListener('click', function () {
    document.getElementById('model-filter-staff').classList.remove('d-none')
    document.getElementById('model-filter-staff').setAttribute('data-room', 'Conference_room')
    let workers = JSON.parse(localStorage.getItem("staff_table"))
    let workers_in_conference_room = workers.filter(worker => worker.etat === 'NotYet')
    affiche_list_worker_filter(workers_in_conference_room, "Assign Staff to Room")
})



document.getElementById('add_workers_Reception_room').addEventListener('click', function () {
    document.getElementById('model-filter-staff').classList.remove('d-none')
    document.getElementById('model-filter-staff').setAttribute('data-room', 'Reception_room')
    let workers = JSON.parse(localStorage.getItem("staff_table"))
    let workers_in_Reception_room = workers.filter(worker => worker.etat === 'NotYet' && (worker.role === "Manager" || worker.role === "Receptionist"))
    affiche_list_worker_filter(workers_in_Reception_room, "Assign Staff to Room")
})
document.getElementById('add_workers_Server_room').addEventListener('click', function () {
    document.getElementById('model-filter-staff').classList.remove('d-none')
    document.getElementById('model-filter-staff').setAttribute('data-room', 'Server_room')
    let workers = JSON.parse(localStorage.getItem("staff_table"))
    let workers_in_Server_room = workers.filter(worker => worker.etat === 'NotYet' && (worker.role === "Manager" || worker.role === "IT Technician" || worker.role === "Cleaning staff"))
    affiche_list_worker_filter(workers_in_Server_room, "Assign Staff to Room")
})

document.getElementById('add_workers_Security_room').addEventListener('click', function () {
    document.getElementById('model-filter-staff').classList.remove('d-none')
    document.getElementById('model-filter-staff').setAttribute('data-room', 'Security_room')
    let workers = JSON.parse(localStorage.getItem("staff_table"))
    let workers_in_Security_room = workers.filter(worker => worker.etat === 'NotYet' && (worker.role === "Manager" || worker.role === "Security Officer" || worker.role === "Cleaning staff"))
    affiche_list_worker_filter(workers_in_Security_room, "Assign Staff to Room")

})

document.getElementById('add_workers_Staff_room').addEventListener('click', function () {
    document.getElementById('model-filter-staff').classList.remove('d-none')
    document.getElementById('model-filter-staff').setAttribute('data-room', 'Staff_room')
    let workers = JSON.parse(localStorage.getItem("staff_table"))
    let workers_in_Staff_room = workers.filter(worker => worker.etat === 'NotYet')
    affiche_list_worker_filter(workers_in_Staff_room, "ligal")
})




function affiche_list_worker_filter(whoker_in_room, title) {
    document.getElementById('model-filter-staff').innerHTML = ""
    document.getElementById('model-filter-staff').append(affiche_worker_filter_title(title))
    whoker_in_room.forEach(worker => {
        document.getElementById('model-filter-staff').append(affiche_worker_filter(worker))
    });
}

document.getElementById('model-filter-staff').addEventListener('click', (e) => {
    try {
        let elementClick = e.target
        if (elementClick.closest('div.worker')) {
            let staff_table = JSON.parse(localStorage.getItem("staff_table")) || []
            if (confirm(' Do you want to assign this worker to ' + document.getElementById('model-filter-staff').getAttribute('data-room'))) {

                staff_table = staff_table.map(worker => {
                    if (worker.id === Number(elementClick.closest('div.worker').getAttribute("id"))) {
                        return { ...worker, etat: document.getElementById('model-filter-staff').getAttribute('data-room') };
                    }
                    return worker;
                })
                localStorage.setItem('staff_table', JSON.stringify(staff_table))
                elementClick.closest('div.worker').remove()
                document.getElementById('model-filter-staff').classList.add('d-none');
                show_Unassigned_Staff_list()
                assign_Staff_to_Carte()
            }
        }
    } catch {
        alert('il y a  un erreur')
    }
})





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
