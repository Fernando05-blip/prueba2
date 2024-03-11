// Espero el DOM
$(document).ready(function () {
    
    //declaro variables
    const heroForm = $("#heroForm") // id del formulario
    const heroNumber = $("#heroNumber") // numero del input
    const heroResult = $("#heroResult") // id Template html
    const chartContainer = $("#chartContainer")// id de gráfico

    // proceso el formulario
   heroForm.on("submit", function(event){
        event.preventDefault() // quito el evento default en el DOM

        // remuevo clases de validación
        heroNumber.removeClass("is-valid is-invalid")

        //capturo el numero del input
        const heroNumberInput = parseInt(heroNumber.val().trim())
        console.log(heroNumberInput)

        //validar el número del input
        if(heroNumberInput > 0) {
            heroNumber.addClass("is-valid");
            getSuperHero(heroNumberInput)
        }else {
            heroNumber.addClass("is-invalid");
        }

   })


    // consumir la API via Ajax
    // Superhero API
    // https://www.superheroapi.com/api.php/4905856019427443/

    const getSuperHero = (superHeroNumberFn) => {
        $.ajax({
            url: `https://www.superheroapi.com/api.php/4905856019427443/${superHeroNumberFn}` , //agrego el nùmero detectado de pokeNumberUser
            method: "GET",
            success(heroData){

                const miSuperHero =  { // creo un objeto para manipular
                nombre: heroData.name,
                imagen: heroData.image,
                altura: heroData.appearance.height,
                peso: heroData.appearance.weight,
                conexiones: heroData.connections,
                publicacion: heroData.biography.publisher,
                ocupacion: heroData.work.occupation,
                aparicion: heroData.biography,
                stats: heroData.powerstats // este es un array
            }
            const estadisticas = Object.entries(miSuperHero.stats).map(([label, y]) => {
                return ({
                    label: label,
                    y: y
                })
             })
             var options = {
                title: {
                    text: "Super estadísticas"
                },
                data: [{
                        type: "pie",
                        startAngle: 45,
                        showInLegend: "true",
                        legendText: "{label}",
                        indexLabel: "{label} ({y})",
                        yValueFormatString:"#,##0.#"%"",
                        dataPoints: estadisticas
                }]
            }
            chartContainer.CanvasJSChart(options) // llamamos a las variable option creada recién

            //pinto el template html
            heroResult.html(
                `
                <div class="card">
                    <img src="${miSuperHero.imagen.url}" alt="" class="card-img-top">
                    <div class="card-body">
                        <h5>Nombre: ${miSuperHero.nombre}</h5>
                        <p>Conexiones: ${miSuperHero.conexiones["group-affiliation"]} </p>
                        <p>Publicado por: ${miSuperHero.publicacion}</p>
                    </div>
                        <ul class="list-group list-group-flush">
                            <li class="list-group-item"><p class="bold">Ocupación: </p> ${miSuperHero.ocupacion} </li>
                            <li class="list-group-item"><p class="bold">Primera aparición: </p> ${miSuperHero.aparicion["first-appearance"]} </li>
                            <li class="list-group-item"><p class="bold">Altura: </p> ${miSuperHero.altura}</li>
                            <li class="list-group-item"><p class="bold">Peso: </p> ${miSuperHero.peso}</li>
                            <li class="list-group-item"><p class="bold">Alianzas: </p> ${miSuperHero.conexiones.relatives}</li>
                    </ul>
                </div>
                `
            )
            },
            error(error){
                console.log(error)
            }

        })
    }

});