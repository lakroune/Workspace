let maxArchives_room = 3
let maxConference_room = 10
let maxReception_room = 5
let maxStaff_room = 4
let maxSecurity_room = 2
let maxServer_room = 3
 
assign_Staff_to_Carte()
show_Unassigned_Staff_list()

let countExp = 2
photodefault = "https://st3.depositphotos.com/2546551/18320/v/600/depositphotos_183201822-stock-illustration-male-profile-picture.jpg"
document.getElementById('close-modal-add').addEventListener('click', (e) => {
    let elementClick = e.target
    elementClick.closest('div.position-absolute').classList.toggle('d-none')
    document.getElementById('model-add-staff').querySelector('form').reset();
    document.getElementById('photo-preview').src = photodefault

})


document.getElementById("input-photo-preview").addEventListener('keyup', function () {
    document.getElementById('photo-preview').src = document.getElementById("input-photo-preview").value
    document.getElementById('photo-preview').onerror = () => {
        document.getElementById('photo-preview').src = photodefault
    }
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
                            <label for="poste">Job</label>
                            <input type="text" placeholder="Developer" class=" border p-1 rounded " name="postes" required>
                            <label for="entreprise"> Company Name </label>
                            <input type="text" placeholder="Youcode" class="border p-1 rounded " name="entreprises"
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
    const photo_input = document.getElementById('photo-preview')
    const experiences = document.getElementById('experiences-container').querySelectorAll('div.experience');

    /////validation des champs 
    let isValid = true
    const nameRegex = /^[A-Za-z\s]{3,30}$/;
    const emailRegex = /^[a-zA-Z0-9_.-]{3,20}@[a-zA-Z]{3,15}\.[a-zA-Z]{2,6}$/;
    const phoneRegex = /^\+212[5-7]{1}[0-9]{8}$/;




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
        alert('Phone invalid: Must be +212 then 05/06/07 followed by 8 digits');
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
            const posteRegex = /^[A-Za-z0-9()\s]{3,30}$/;
            const entrepriseRegex = /^[A-Za-z0-9(&"'|)/.\-\s]{3,30}$/;

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


        let newStaff = createStaff(name_input.value, role_input.value, phone_input.value, email_input.value, photo_input.src, finalExperiences)

        let staff_table = JSON.parse(localStorage.getItem("staff_table")) || []
        staff_table.push(newStaff)
        localStorage.setItem("staff_table", JSON.stringify(staff_table))
        document.getElementById('model-add-staff').querySelector('form').reset();
        document.getElementById("model-add-staff").classList.toggle('d-none')
        document.getElementById('photo-preview').src = photodefault
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
    div.className = "   d-flex  justify-content-center align-items-center  bg-dark   bg-opacity-75  top-0  vh-100 w-100 d-flex position-absolute  modelshowstaff"
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
    div.className = "   d-flex  justify-content-center align-items-center  bg-dark   bg-opacity-75  top-0  vh-100 w-100 d-flex position-absolute  modelshowstaff"
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
        photourl: photourl != "" ? photourl : photodefault,
        etat: "NotYet",
        experiences: experiences
    }
    localStorage.setItem('id_worker', ++IDwerker)
    return worker
}

function show_Unassigned_Staff_list() {
    let staff_table = JSON.parse(localStorage.getItem("staff_table")) || []
    document.getElementById("Unassigned-Staff-list").innerHTML = ""
    let countWorkerunassaign = true
    staff_table.forEach(staff => {
        if (staff.etat === "NotYet") {

            let staff_card = document.createElement("div")
            staff_card.className = "card m-1 p-0 bg-light"
            staff_card.setAttribute('id', staff.id)
            staff_card.innerHTML = ` <div role="button" class="card-body m-0 p-1 d-flex  gap-4 align-items-center "  >
                                    <img src=" ${staff.photourl} " width="44" class="rounded-circle" alt="Photo">
                                    <div class=" p-0 m-0 ">
                                        <span class=" d-block fs-12"> ${staff.fullname}</span>
                                        <span class="  text-muted   fw-bold fs-10"> ${staff.role}</span>
                                    </div>
                                 </div> `
            document.getElementById("Unassigned-Staff-list").appendChild(staff_card)
            countWorkerunassaign = false
        }
    });

    if (countWorkerunassaign) {
        let UnassignedEmptyContainer = document.createElement('div');
        UnassignedEmptyContainer.className = "text-center p-3";

        UnassignedEmptyContainer.innerHTML = `
            <div class="mb-3">
                <i class="bi bi-people" style="font-size: 90px; color: #ced4da;"></i> 
            </div>
            <p class="text-muted mb-2">
                No workers found.
            </p>
            
        `;
        document.getElementById("Unassigned-Staff-list").appendChild(UnassignedEmptyContainer);
    }
}

// ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
function addWorkerToRoom(worker, room) {
    const roomCard = document.getElementById(room).querySelector("div.cards-continer")
    const divWorker = document.createElement("div");
    divWorker.className = "  w-auto d-flex  p-1 position-relative  gap-1 justify-content-between align-items-center  bg-success rounded-circle  worker-asigne-to-room border";
    divWorker.id = worker.id
    divWorker.setAttribute("role", "button")
    document.getElementById(room).classList.remove("bg-danger")
    divWorker.innerHTML = `
        <img src="${worker.photourl}" 
             width="50" height="50" class="rounded-1 border bg-warning border-2">
        <button  type="button" class="bg-opacity-100  btn-close bg-danger    align-self-start   d-flex align-items-start  border-0   text-danger p-0   position-absolute end-0  top-0" style="font-size: 13px;  " onclick="removeWorkerFromRoom(${worker.id})">
        </button>`

    roomCard.appendChild(divWorker)
}

function countWorkerFromRoom(room, etat, maxworker) {
    let staff_table = JSON.parse(localStorage.getItem("staff_table")) || [];
    let contWorker = staff_table.filter(elelment => elelment.etat === etat) || [];
    document.getElementById(room).querySelector("span.count").textContent = contWorker.length;
    document.getElementById(room).querySelector("span.maxworker").textContent = maxworker;
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
    countWorkerFromRoom("ArchivesRoom", "Archives_room", maxArchives_room)
    countWorkerFromRoom("StaffRoom", "Staff_room", maxStaff_room)
    countWorkerFromRoom("SecurityRoom", "Security_room", maxSecurity_room)
    countWorkerFromRoom("ServerRoom", "Server_room", maxServer_room)
    countWorkerFromRoom("ConferenceRoom", "Conference_room", maxConference_room)
    countWorkerFromRoom("Reception", "Reception_room", maxReception_room)
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
    return `  <div class="card  bg-ligth border-0    w-4p  w-3p   ">
            <div class="  d-flex justify-content-between align-items-center p-2 border-bottom bg-light">            
             <span class="fw-bold"> Worker Details</span> 
            <button type="button" class="btn-close" ></button>
            </div>
            <div class="p-3 ">

                <div class="d-flex justify-content-start gap-3 align-items-center  p-2 border-bottom ">
                    <div class="rounded-circle bg-warning p-1 ">
                        <img src="${staff.photourl}" width="100" height="100" class="rounded-4 border border-4" alt="Photo staff">
                    </div>

                    <div class=" d-flex flex-column m-2 justify-content-center align-items-start ">
                        <span class=" fw-bold">${staff.fullname}</span>
                        <i class="text-muted fw-bold fs-12">${staff.role}</i>
                        <i class="text-muted   fs-12"> ${staff.etat !== "NotYet" ? " assigned to " + staff.etat : " Not assigned yet"}</i>
                    </div>
                </div>

                <h6 class=" text-secondary  pt-2      fs-12">📞 CONTACT</h6>
                <div class="border-bottom  mb-4">

                    <div class=" mb-2 fs-12">
                        <span class="d-block fw-bold ">PHONE</span>
                        <span class="text-dark">${staff.phone}</span>
                    </div>

                    <div class=" mb-2 fs-12">
                        <span class="d-block fw-bold ">EMAIL</span>
                        <span class="text-dark"> ${staff.email}</span>
                    </div>
                </div>

                <h6 class=" fs-12 p-1 text-muted fw-bold  border-bottom">💼 EXPERIENCES </h6>

                <div class="list-group fs-12 list-group-flush  scroll-y ">
                    ${showExp(staff.experiences) ? showExp(staff.experiences) : emptyExp()}
                     
                </div>

            </div>
        </div>`
}

function showExp(experiences) {
    return experiences.map((experience) => {
        return ` <div class="list-group-item d-flex justify-content-between align-items-start p-1 border-bottom">
                        <div>
                            <span class="fw-bold d-block"> ${experience.poste}</span>
                            <small class="text-muted p-1">${experience.entreprise}</small>
                        </div>
                        <span class="badge bg-secondary mt-1">${experience.date_start} - ${experience.date_end}</span>
                    </div>`
    }).join('');
}
function emptyExp() {
    return ` <div class="list-group-item d-flex justify-content-between align-items-start p-2   ">
                         
                           <i class="bi bi-briefcase" style="font-size: 30px; color: #adb5bd;"></i>
                            <small class="text-muted p-1 w-75 text-center fs-12">No professional experience has been recorded for this worker yet. </small>
                     
                          </div>`
}



document.getElementById('add_workers_Archives_room').addEventListener('click', function () {
    let workers = JSON.parse(localStorage.getItem("staff_table"))
    let count_worker_assignto_this_room = workers.filter(worker => worker.etat === 'Archives_room')
    if (count_worker_assignto_this_room.length < maxArchives_room) {
        document.getElementById('model-filter-staff').classList.remove('d-none')
        document.getElementById('model-filter-staff').setAttribute('data-room', 'Archives_room')
        let workers_in_archives_room = workers.filter(worker => worker.etat === 'NotYet' && worker.role !== "Cleaning Staff")
        affiche_list_worker_filter(workers_in_archives_room, "Workers Authorized to  Archives Room ")
    }
    else {
        alert("The Archives room is full. Maximum of " + maxArchives_room + " workers allowed.")
    }
})

document.getElementById('add_workers_Conference_room').addEventListener('click', function () {
    let workers = JSON.parse(localStorage.getItem("staff_table"))
    let count_worker_assignto_this_room = workers.filter(worker => worker.etat === 'Conference_room')
    if (count_worker_assignto_this_room.length < maxConference_room) {
        document.getElementById('model-filter-staff').classList.remove('d-none')
        document.getElementById('model-filter-staff').setAttribute('data-room', 'Conference_room')
        let workers_in_conference_room = workers.filter(worker => worker.etat === 'NotYet')
        affiche_list_worker_filter(workers_in_conference_room, "Workers Authorized to  Conference Room")
    }
    else {
        alert("The Conference room is full. Maximum of " + maxConference_room + " workers allowed.")
    }
})


document.getElementById('add_workers_Reception_room').addEventListener('click', function () {
    let workers = JSON.parse(localStorage.getItem("staff_table"))
    let count_worker_assignto_this_room = workers.filter(worker => worker.etat === 'Reception_room')

    if (count_worker_assignto_this_room.length < maxReception_room) {
        document.getElementById('model-filter-staff').classList.remove('d-none')
        document.getElementById('model-filter-staff').setAttribute('data-room', 'Reception_room')
        let workers_in_Reception_room = workers.filter(worker =>
            worker.etat === 'NotYet' &&
            (worker.role !== "IT Technician" && worker.role !== "Security Officer" && worker.role !== "Other")
        )
        affiche_list_worker_filter(workers_in_Reception_room, "Workers Authorized to  Reception Room")
    }
    else {
        alert("The Reception room is full. Maximum of " + maxReception_room + " workers allowed.")
    }
})

document.getElementById('add_workers_Server_room').addEventListener('click', function () {
    let workers = JSON.parse(localStorage.getItem("staff_table"))
    let count_worker_assignto_this_room = workers.filter(worker => worker.etat === 'Server_room')
    if (count_worker_assignto_this_room.length < maxServer_room) {
        document.getElementById('model-filter-staff').classList.remove('d-none')
        document.getElementById('model-filter-staff').setAttribute('data-room', 'Server_room')
        let workers_in_Server_room = workers.filter(worker =>
            worker.etat === 'NotYet' &&
            (worker.role !== "Security Officer" && worker.role !== "Receptionist"  && worker.role !== "Other")
        )
        affiche_list_worker_filter(workers_in_Server_room, "Workers Authorized to  Server Room")
    }
    else {
        alert("The Server room is full. Maximum of " + maxServer_room + " workers allowed.")
    }
})
document.getElementById('add_workers_Security_room').addEventListener('click', function () {
    let workers = JSON.parse(localStorage.getItem("staff_table"))
    let count_worker_assignto_this_room = workers.filter(worker => worker.etat === 'Security_room')
    if (count_worker_assignto_this_room.length < maxSecurity_room) {
        document.getElementById('model-filter-staff').classList.remove('d-none')
        document.getElementById('model-filter-staff').setAttribute('data-room', 'Security_room')
        let workers_in_Security_room = workers.filter(worker =>
            worker.etat === 'NotYet' &&
            (worker.role !== "Receptionist" && worker.role !== "IT Technician" && worker.role !== "Other")
        )
        affiche_list_worker_filter(workers_in_Security_room, "Workers Authorized to  Security Room")
    }
    else {
        alert("The Security room is full. Maximum of " + maxSecurity_room + " workers allowed.")
    }
})

document.getElementById('add_workers_Staff_room').addEventListener('click', function () {
    let workers = JSON.parse(localStorage.getItem("staff_table"))
    let count_worker_assignto_this_room = workers.filter(worker => worker.etat === 'Staff_room')
    if (count_worker_assignto_this_room.length < maxStaff_room) {
        document.getElementById('model-filter-staff').classList.remove('d-none')
        document.getElementById('model-filter-staff').setAttribute('data-room', 'Staff_room')
        let workers_in_Staff_room = workers.filter(worker => worker.etat === 'NotYet')
        affiche_list_worker_filter(workers_in_Staff_room, "Workers Authorized to  Staff Room")
    }
    else {
        alert("The Staff room is full. Maximum of " + maxStaff_room + " workers allowed.")
    }
})



function affiche_list_worker_filter(whoker_in_room, title) {
    document.getElementById('model-filter-staff').innerHTML = "";
    document.getElementById('model-filter-staff').appendChild(affiche_worker_filter_title(title));


    if (whoker_in_room.length > 0) {
        let roomFullContainer = document.createElement('div');
        roomFullContainer.className = " scroll-y h-75 p-3";
        whoker_in_room.forEach(worker => {
            roomFullContainer.appendChild(affiche_worker_filter(worker));
        });
        document.getElementById('model-filter-staff').appendChild(roomFullContainer)
    } else {
        let roomEmptyContainer = document.createElement('div');
        roomEmptyContainer.className = "text-center p-3";

        roomEmptyContainer.innerHTML = `
            <div class="mb-3">
                <i class="bi bi-people" style="font-size: 90px; color: #ced4da;"></i> 
            </div>
            <p class="text-muted mb-2 fs-14">
             No workers are authorized to enter the room
            </p>
        `;

        document.getElementById('model-filter-staff').append(roomEmptyContainer);
    }
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
    let carttitile = document.createElement('div');
    carttitile.className = "d-flex justify-content-between align-items-center p-3 border-bottom bg-light ";
    carttitile.innerHTML =
        ` <span class="fs-14">${title}</span> 
          <button type="button" class="btn-close" ></button>
        `;
    carttitile.addEventListener('click', (e) => {
        if (e.target.classList.contains('btn-close')) {
            document.getElementById('model-filter-staff').classList.toggle('d-none');
        }
    });

    return carttitile;
}
function affiche_worker_filter(worker) {
    let cartworker = document.createElement('div')
    cartworker.setAttribute("role", "button")
    cartworker.className = "d-flex bg-light  border justify-content-center align-items-center m-1 rounded p-1 worker "
    cartworker.id = worker.id
    cartworker.innerHTML =
        `  
                    <div class=" ">
                        <img id="photo-preview" width="44" height="44" class="rounded-5" src="${worker.photourl}"
                            alt="preview" />
                    </div>
                    <div class="flex-grow-1" >
                        <div class=" p-1 fs-12  d-flex flex-column ">
                            <label>${worker.fullname} </label>
                            <label class="">${worker.role} </label>
                        </div>

                    </div>
            `
    return cartworker
}
