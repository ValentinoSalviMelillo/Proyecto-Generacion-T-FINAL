let contador = 0;
let FooterBox = document.getElementsByClassName("footerChild");
let pendientes = FooterBox[0];
let completadas = FooterBox[1];

function adicionar() {
    let input = document.getElementById("input");
    let prioritySelect = document.getElementById("priority");
    let priorityValue = prioritySelect.value;

    if (input.value !== "") {
        const father = document.getElementById("container");
        let tarea = document.createElement("div");
        tarea.setAttribute("class", `containerChild ${priorityValue.toLowerCase()}`);  // Agregar clase según la prioridad
        tarea.setAttribute("data-priority", priorityValue);

        tarea.innerHTML = "<label class='label'><input type='checkbox' onchange='tareasCumplidas()'>‎ ‎ ‎ " + input.value + " (Prioridad: " + priorityValue + ")</label><i onclick='remove(this)' class='fa-solid fa-trash-can'></i>";
        father.append(tarea);
        contador++;
        pendientes.innerHTML = "Tareas pendientes: " + contador;

        // Animación de aparición
        tarea.style.opacity = '0';
        setTimeout(() => {
            tarea.style.opacity = '1';
        }, 10);

        updateProgressBar();
    }
    input.value = "";
}

function remove(elemento) {
    let item = elemento.parentElement;
    
    // Actualizar el contador de tareas pendientes
    if (!item.querySelector("input[type='checkbox']").checked) {
        contador--;
        pendientes.innerHTML = "Tareas pendientes: " + contador;
    }

    item.remove();

    updateProgressBar();
    tareasCumplidas();  // Actualiza también el contador de tareas completadas
}

function tareasCumplidas() {
    let checkboxList = document.querySelectorAll("input[type='checkbox']:checked");
    let realizadas = checkboxList.length;
    completadas.innerHTML = "Completadas: " + realizadas;

    // Actualiza las tareas pendientes
    contador = document.querySelectorAll(".containerChild").length - realizadas;
    pendientes.innerHTML = "Tareas pendientes: " + contador;

    updateProgressBar();
}

function updateProgressBar() {
    const totalTasks = document.querySelectorAll('.containerChild').length;
    const completedTasks = document.querySelectorAll("input[type='checkbox']:checked").length;
    const progress = totalTasks === 0 ? 0 : (completedTasks / totalTasks) * 100;

    const progressBar = document.getElementById("progress-bar");
    const progressPercentage = document.getElementById("progress-percentage");
    progressBar.value = progress;
    progressPercentage.innerText = `${Math.round(progress)}%`;
}
