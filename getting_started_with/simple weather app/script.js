const temperaturefield = document.querySelector(".temperature p");
const locationfield = document.querySelector(".time-Location p:nth-child(1)");
const dateAndTimefield = document.querySelector(".time-Location p:nth-child(2)");
const conditionfield = document.querySelector(".weather-condition p:nth-child(1)");
const searchfield = document.querySelector(".search_area");
const form = document.querySelector("form");

form.addEventListener('submit', searchForLocation);

const fetchResults = async (targetLocation) => {
    let url = `http://api.weatherapi.com/v1/current.json?key=2b05147acbc74a74a51120312251104&q=${targetLocation}&aqi=no`;

    const res = await fetch(url);
    const data = await res.json();
    console.log(data);

    if (data.error) {
        alert(data.error.message);
        return;
    }

    let locationName = data.location.name;
    let time = data.location.localtime;
    let temp = data.current.temp_c;
    let condition = data.current.condition.text;

    updateDetails(temp, locationName, time, condition);
};

function updateDetails(temp, locationName, time, condition) {

    let splitdate = time.split(' ')[0]
    let splitime = time.split(' ')[1]
    let current_date = getDayName(new Date(splitdate).getDay())


    temperaturefield.innerText = `${temp}°C`;
    locationfield.innerText = locationName;
    dateAndTimefield.innerText = `${splitdate} ${current_date} ${splitime}`;
    conditionfield.innerText = condition;
}

function searchForLocation(e) {
    e.preventDefault();
    const target = searchfield.value.trim();
    if (target) {
        fetchResults(target);
    }
}

function getDayName(number) {
    switch (number) {
        case 0:
            return 'Sunday'
        case 1:
            return 'Monday'
        case 2:
            return 'Tuesday'
        case 3:
            return 'Wednesday'
        case 4:
            return 'Thursday'
        case 5:
            return 'Friday'
        case 6:
            return 'Saturday'
    }
}
