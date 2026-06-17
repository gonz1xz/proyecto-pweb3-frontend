import { apiRequest } from './request.js';

export async function loadCars() {
    const tableBody = document.getElementById("carsTable").querySelector("tbody");
    
    try {
        const response = await apiRequest("http://localhost:3000/cars/car-list", {
            method: "GET"
        });

        tableBody.innerHTML = "";

        response.cars.forEach(car => {
            const row = document.createElement("tr");

            const brandCell = document.createElement("td");
            brandCell.textContent = car.brand;

            const modelCell = document.createElement("td");
            modelCell.textContent = car.model;

            const yearCell = document.createElement("td");
            yearCell.textContent = car.year;

            const plateCell = document.createElement("td");
            plateCell.textContent = car.plate;

            row.appendChild(brandCell);
            row.appendChild(modelCell);
            row.appendChild(yearCell);
            row.appendChild(plateCell);

            tableBody.appendChild(row);
        });

    } catch (error) {
        console.error("Error al cargar autos:", error);
    }
}

export async function setupAddCarForm() {
    const form = document.getElementById("addCarForm");

    form.addEventListener("submit", async (e) => {
        e.preventDefault();

        const carData = {
            brand: document.getElementById("brand").value,
            model: document.getElementById("model").value,
            year: document.getElementById("year").value,
            plate: document.getElementById("plate").value
        };

        try {
            const response = await apiRequest("http://localhost:3000/cars/add-car", {
                method: "POST",
                body: JSON.stringify(carData)
            });

            alert(response.message);
            
            const modalEl = document.getElementById('addCarModal');
            const modal = bootstrap.Modal.getInstance(modalEl);
            modal.hide();
            
            form.reset();
            await loadCars();
            
        } catch (error) {
            console.error("Error al guardar:", error);
            alert("Hubo un error al guardar el vehículo.");
        }
    });
}