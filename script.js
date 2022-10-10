
let mappedPokemons = [];
let lengthPokemons;

let init = async () => {
    let pokemons = await getPokemons();
    console.log(pokemons);

    mappedPokemons = pokemons.map(mapPokemon);
    resultado = [...mappedPokemons]
    console.log(mappedPokemons);

    printPokemon(mappedPokemons);
    printButtons(mappedPokemons);
    printSearch();
    printSortTypes();
}

let getPokemons = async () => {

    let pokemons = [];

    for (let i = 1; i < 152; i++) {
        const pokemonResult = await fetch("https://pokeapi.co/api/v2/pokemon/" + i + "/");
        const pokemonJson = await pokemonResult.json();

        pokemons.push(pokemonJson);
    }

    return pokemons;
}

let mapPokemon = (pokemon) => {
    return {
        id: pokemon.id,
        name: pokemon.name,
        forms: pokemon.sprites,
        types: pokemon.types,
        height: pokemon.height,
        weight: pokemon.weight,
        abilities: pokemon.abilities,
        stats: pokemon.stats
    }
}

let inicio = 0;
let max = 20;
let filaResto;

let printPokemon = (array) => {
    let divPokemons$$ = document.querySelector(".pokemons");
    divPokemons$$.innerHTML= "";
    console.log(array);

    filaResto = array.length % 4;

    for (inicio; inicio < max; inicio++) {
        if (filaResto != 0 && inicio >= array.length) {
            inicio = inicio - (16 + filaResto);
            return ;
        } else if (filaResto == 0 && inicio >= array.length) {
            inicio = inicio - 20;
            return ;
        } else {
            let element = array[inicio];
            let id = element.id;
            let name = element.name;
            let forms = element.forms;
            let {versions} = forms;
            let {"generation-v" : g5} = versions;
            let {"black-white" : bw} = g5;
            let {animated} = bw;
            let imgP;
            let gif;

            if (toggle == false) {
                imgP = forms.front_default;
                gif = animated.front_default;
            } else if (toggle == true) {
                imgP = animated.front_shiny;
                gif = animated.front_shiny;
            }

            let types = element.types;

            let rS = name.slice(1);
            let pL = name.charAt(0).toUpperCase();

            name = pL + rS;
        
            let galery$$ = document.createElement("figure");
            galery$$.className = "galeria"
            galery$$.innerHTML = `<figcaption class="nombre">&#8194;${name}&#8194;</figcaption>
                                  <figcaption class="id">&#8194;N.º ${id}&#8194;</figcaption>
                                 `;
        
            let img$$ = document.createElement("img");
            img$$.className = "pokemon-img";
            img$$.setAttribute("src", imgP);
            img$$.setAttribute("alt", name);

            img$$.addEventListener("mouseover", function mouseOver () {
                img$$.setAttribute("src", gif);
            })

            img$$.addEventListener("mouseout", function mouseOut () {
                img$$.setAttribute("src", imgP);
            })

            let stats = element.stats;

            img$$.addEventListener("click", function panel () {

                let divDetalles$$ = document.createElement("table")
                divDetalles$$.className = "panelPokemon"
                
                for (let y = 0; y < stats.length; y++) {
                    let stat = stats[y];
                    let statNumber = stat.base_stat;
                    let statData = stat.stat;
                    let {"name" : statName} = statData;

                    let sRS = statName.slice(1);
                    let sPL = statName.charAt(0).toUpperCase();

                    statName = sPL + sRS;

                    let statTable$$ = document.createElement("tr")
                    statTable$$.innerHTML = `<td>${statName}</td>
                                             <td>${statNumber}</td>`;
                    
                    divDetalles$$.appendChild(statTable$$);
                }

                divDetalles$$.addEventListener("click", function quitarPanel () {
                    divDetalles$$.style.display = "none";
                })
                
                galery$$.appendChild(divDetalles$$);
            })


            galery$$.appendChild(img$$);
            divPokemons$$.appendChild(galery$$);

            let divTypes$$ = document.createElement("div");
            divTypes$$.className = "div-tipos";

            for (let x = 0; x < types.length; x++) {
                let type = types[x];
                let {"type" : tipo} = type;
                let nombreTipo = tipo.name;

                let tRS = nombreTipo.slice(1);
                let tPL = nombreTipo.charAt(0).toUpperCase();

                nombreTipo = tPL + tRS;

                let type$$ = document.createElement("figcaption");
                type$$.className = "tipos";
                type$$.textContent = nombreTipo;

                if (nombreTipo.toLowerCase() == "normal") {
                    type$$.style.backgroundColor = "#A8A878";
                } else if (nombreTipo.toLowerCase() == "fire") {
                    type$$.style.backgroundColor = "#F08030";
                } else if (nombreTipo.toLowerCase() == "water") {
                    type$$.style.backgroundColor = "#6890F0";
                } else if (nombreTipo.toLowerCase() == "electric") {
                    type$$.style.backgroundColor = "#F8D030";
                } else if (nombreTipo.toLowerCase() == "grass") {
                    type$$.style.backgroundColor = "#78C850";
                } else if (nombreTipo.toLowerCase() == "flying") {
                    type$$.style.backgroundColor = "#A890F0";
                } else if (nombreTipo.toLowerCase() == "rock") {
                    type$$.style.backgroundColor = "#B8A038";
                } else if (nombreTipo.toLowerCase() == "steel") {
                    type$$.style.backgroundColor = "#B8B8D0";
                } else if (nombreTipo.toLowerCase() == "ground") {
                    type$$.style.backgroundColor = "#E0C068";
                } else if (nombreTipo.toLowerCase() == "bug") {
                    type$$.style.backgroundColor = "#A8B820";
                } else if (nombreTipo.toLowerCase() == "poison") {
                    type$$.style.backgroundColor = "#A040A0";
                } else if (nombreTipo.toLowerCase() == "ice") {
                    type$$.style.backgroundColor = "#98D8D8";
                } else if (nombreTipo.toLowerCase() == "fighting") {
                    type$$.style.backgroundColor = "#C03028";
                } else if (nombreTipo.toLowerCase() == "psychic") {
                    type$$.style.backgroundColor = "#F85888";
                } else if (nombreTipo.toLowerCase() == "dark") {
                    type$$.style.backgroundColor = "#705848";
                } else if (nombreTipo.toLowerCase() == "ghost") {
                    type$$.style.backgroundColor = "#705898";
                } else if (nombreTipo.toLowerCase() == "dragon") {
                    type$$.style.backgroundColor = "#7038F8";
                } else {
                    type$$.style.backgroundColor = "#F0B6BC";
                }

                divTypes$$.appendChild(type$$);
                galery$$.appendChild(divTypes$$);
            }
        }
    }

    inicio = inicio - 20;
    console.log(inicio);
}

let printButtons = (array) => {
    lengthPokemons = array.length;
    console.log(array);

    let divButtons$$ = document.querySelector(".botones");
    divButtons$$.innerHTML = "";

    let buttonUp$$ = document.createElement("button");
        buttonUp$$.className = "boton";
        buttonUp$$.innerHTML = "&uArr;";
        buttonUp$$.addEventListener("click", function clickUp () {
                if (inicio <= 0 || max <= 20) {
                    return ;
                } else {
                    inicio = inicio - 4;
                    max = max - 4;
                    printPokemon(array);
                    console.log(inicio);
                    console.log(max);
                }
            }
        );
    
    let buttonDown$$ = document.createElement("button");
        buttonDown$$.className = "boton";
        buttonDown$$.innerHTML = "&dArr;";
        buttonDown$$.addEventListener("click", function clickDown () {
                if (inicio >= lengthPokemons - 20 || max >= lengthPokemons) {
                    return ;
                } else {
                    inicio = inicio + 4;
                    max = max + 4;
                    printPokemon(array);
                    console.log(inicio);
                    console.log(max);
                }
            }
        );
    
        divButtons$$.appendChild(buttonUp$$);
        divButtons$$.appendChild(buttonDown$$);
}

let value;
let resultado;

function clickSearch (searchValue) {
    inicio = 0;
    max = 20;

    console.log(searchValue);
    value = searchValue;

    resultado = mappedPokemons.filter(busqueda);
    console.log(resultado);

    printPokemon(resultado);
    printButtons(resultado);
}

let busqueda = (array) => {

    let coincidencia = array.name.toLowerCase();

    if (coincidencia.includes(value)) {
        console.log(array);
        return array;
    } 
}

let search$$ = document.querySelector(".search");

let toggle = false;

let printSearch = () => {
    search$$.innerHTML = "";

    let input$$ = document.createElement("input");
    input$$.className= "buscador";

    let buttonSearch$$ = document.createElement("button");
    buttonSearch$$.className= "boton-buscar";
    buttonSearch$$.textContent = "Buscar"
    buttonSearch$$.addEventListener("click", () => clickSearch(input$$.value));

    let toggleN$$ = document.createElement("img");
    toggleN$$.style.display = "none";
    toggleN$$.className = "toggle"
    toggleN$$.setAttribute("src", "./assets/icons8-actualizar-64-arc.png");
    toggleN$$.addEventListener("click", () => {
        toggleN$$.style.display = "none";
        toggleS$$.style.display = "flex";
        toggle = false;
        inicio = 0;
        max = 20;
        printPokemon(resultado);
        printButtons(resultado);
    });

    let toggleS$$ = document.createElement("img");
    toggleS$$.className = "toggle"
    toggleS$$.setAttribute("src", "./assets/icons8-actualizar-64.png");
    toggleS$$.addEventListener("click", () => {
        toggleN$$.style.display = "flex";
        toggleS$$.style.display = "none";
        toggle = true;
        inicio = 0;
        max = 20;
        printPokemon(resultado);
        printButtons(resultado);
    });

    search$$.appendChild(input$$);
    search$$.appendChild(buttonSearch$$);
    search$$.appendChild(toggleN$$);
    search$$.appendChild(toggleS$$);
}

let pokemonTypes = [
    "normal",
    "fire",
    "water",
    "electric",
    "grass",
    "flying",
    "rock",
    "steel",
    "ground",
    "bug",
    "poison",
    "ice",
    "fighting",
    "psychic",
    "dark",
    "ghost",
    "dragon",
    "fairy"
];

let printSortTypes = () => {
    let sortTypes$$ = document.querySelector(".listaTipos");

    for (let x = 0; x < pokemonTypes.length; x++) {
        let type = pokemonTypes[x];

        let tRS = type.slice(1);
        let tPL = type.charAt(0).toUpperCase();

        type = tPL + tRS;

        let tipo$$ = document.createElement("p");
        tipo$$.className = "sortTipos";
        tipo$$.textContent = type;

        tipo$$.addEventListener("click", () => searchType(tipo$$.textContent.toLowerCase()))

        if (type.toLowerCase() == "normal") {
            tipo$$.style.backgroundColor = "#A8A878";
        } else if (type.toLowerCase() == "fire") {
            tipo$$.style.backgroundColor = "#F08030";
        } else if (type.toLowerCase() == "water") {
            tipo$$.style.backgroundColor = "#6890F0";
        } else if (type.toLowerCase() == "electric") {
            tipo$$.style.backgroundColor = "#F8D030";
        } else if (type.toLowerCase() == "grass") {
            tipo$$.style.backgroundColor = "#78C850";
        } else if (type.toLowerCase() == "flying") {
            tipo$$.style.backgroundColor = "#A890F0";
        } else if (type.toLowerCase() == "rock") {
            tipo$$.style.backgroundColor = "#B8A038";
        } else if (type.toLowerCase() == "steel") {
            tipo$$.style.backgroundColor = "#B8B8D0";
        } else if (type.toLowerCase() == "ground") {
            tipo$$.style.backgroundColor = "#E0C068";
        } else if (type.toLowerCase() == "bug") {
            tipo$$.style.backgroundColor = "#A8B820";
        } else if (type.toLowerCase() == "poison") {
            tipo$$.style.backgroundColor = "#A040A0";
        } else if (type.toLowerCase() == "ice") {
            tipo$$.style.backgroundColor = "#98D8D8";
        } else if (type.toLowerCase() == "fighting") {
            tipo$$.style.backgroundColor = "#C03028";
        } else if (type.toLowerCase() == "psychic") {
            tipo$$.style.backgroundColor = "#F85888";
        } else if (type.toLowerCase() == "dark") {
            tipo$$.style.backgroundColor = "#705848";
        } else if (type.toLowerCase() == "ghost") {
            tipo$$.style.backgroundColor = "#705898";
        } else if (type.toLowerCase() == "dragon") {
            tipo$$.style.backgroundColor = "#7038F8";
        } else {
            tipo$$.style.backgroundColor = "#F0B6BC";
        }

        sortTypes$$.appendChild(tipo$$);
    }
}

let clickType;
let resultadoType;

function searchType (typeValue) {
    inicio = 0;
    max = 20;

    console.log(typeValue);
    clickType = typeValue;

    resultadoType = mappedPokemons.filter(busquedaType);
    console.log(resultadoType);

    printPokemon(resultadoType);
    printButtons(resultadoType);
}


let busquedaType = (array) => {

    let coincidenciaType;
    let types = array.types;

    for (let i = 0; i < types.length; i++) {
        let type = types[i];
        let tipo = type.type
        coincidenciaType += tipo.name;
    }

    if (coincidenciaType.includes(clickType)) {
        console.log(array);
        return array;
    } 
}

init();