async function getData() {
    const response = await fetch("https://isro.vercel.app/api/centres")
    const result = await response.json();
    return result;
}
const searchBtn = document.querySelector("#search-btn");


const handleSearchClick=()=> {
    const result = getData();
    console.log(result);
    result.then((resolve)=>{
        // console.log(resolve["centres"]);
        const centers=resolve["centres"]
        const searchInput=document.querySelector("#search-input").value;
        const searchBy=searchInput.charAt(0).toUpperCase()+searchInput.substring(1);
        const filterBy=document.querySelector("input[type='radio']:checked").value;
        const filteredCenters=centers.filter((center)=>{
            return center[`${filterBy}`].includes(searchBy)
        });
        
        papulateCardContainer(filteredCenters)
    })
}
searchBtn.addEventListener('click', handleSearchClick);

function papulateCardContainer(centers) {
    const cardContainer = document.querySelector("#card-container")
    cardContainer.innerText=""
    centers.map((card) => {
        const cardItem=document.createElement("div");
        cardItem.classList.add("card");

        const center=document.createElement("div")
        center.classList.add("center")
        const centerHead=document.createElement("div")
        centerHead.classList.add("heading")
        centerHead.innerText="CENTER";
        const centerName=document.createElement("div")
        centerName.classList.add("value")
        centerName.innerText=card["name"]
        center.appendChild(centerHead)
        center.appendChild(centerName)
        cardItem.appendChild(center);
        
        const city=document.createElement("div")
        city.classList.add("city")
        const cityHead=document.createElement("div")
        cityHead.classList.add("heading")
        cityHead.innerText="City";
        const cityName=document.createElement("div")
        cityName.classList.add("value")
        cityName.innerText=card["Place"]
        city.appendChild(cityHead)
        city.appendChild(cityName)
        cardItem.appendChild(city);
        
        const state=document.createElement("div")
        state.classList.add("state")
        const stateHead=document.createElement("div")
        stateHead.classList.add("heading")
        stateHead.innerText="STATE";
        const stateName=document.createElement("div")
        stateName.classList.add("value")
        stateName.innerText=card["State"]
        state.appendChild(stateHead)
        state.appendChild(stateName)
        cardItem.appendChild(state);

        cardContainer.appendChild(cardItem);

    })

}
