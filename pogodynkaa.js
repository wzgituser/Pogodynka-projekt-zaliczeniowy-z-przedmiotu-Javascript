
        const inputElement = document.querySelector('.inputEl')
        const forecastDocument = document.querySelector('.forecastEl')
        const otherInfoDocument = document.querySelector('.otherData')
        const rightModulDocument = document.querySelector('.iconContainer')
        const leftModulDocument = document.querySelector('.cityName')
        const cityBtn = document.querySelector('.btnList')

        inputElement.addEventListener('keyup', function (e) {
            const eTargetMIasto = e.target.value
            getDatafromInput(eTargetMIasto)
            console.log(eTargetMIasto)
        })
        function getDatafromInput(eTargetMIasto) {
            fetch(`https://www.wowapi.pl/pogoda/miasta?szukaj=${eTargetMIasto}`)
                .then(request => request.json())
                .then(function (data) {
                    const cityN = '';
                    if (data.lenght === data[1]) {
                        const cityN = data[0].nazwa
                        forecastDocument.innerHTML = '';
                        getCurrentWeather(cityN)
                    } else {
                        return
                    }
                })
        }
        function getCurrentData() {
            fetch('https://www.wowapi.pl/pogoda/miasta')
                .then(response => response.json())
                .then(function (data) {
                    console.log(data)
                    getList(data)
                })
        }
        getCurrentData()
        let city = '';

        function getList(data) {
            let cityName = ''
            for (const key of data) {
                let city = key.nazwa;
                const li = document.createElement('a');
                li.innerHTML = `<a>${city}</a>`;
                li.className = 'cityButton';
                li.addEventListener('click', function (e) {
                    if (e.target) {
                        this.innerHTML = city;
                        let cityName = city;
                        getCurrentWeather(cityName)
                        console.log(cityName)
                    } else if (!e.target) {
                        return
                    }
                });
                cityBtn.append(li);
            }
        }
        function defaultCity() {
            const defaultValue = "Białystok"
            getCurrentWeather(defaultValue)
        }
        defaultCity()
        //const defaultCity = (val)=>{}
        function getCurrentWeather(cityName, cityN, defaultValue) {

            fetch('https://www.wowapi.pl/pogoda/prognoza?miasto=' + cityName || cityN || defaultValue)
                .then(response => response.json())
                .then(function (currentWeather) {
                    console.log(currentWeather)
                    if (currentWeather) {
                        if (forecastDocument.innerHTML !== '') {
                            forecastDocument.innerHTML = '';
                            combineTriggerToday(currentWeather)
                            combineTriggerTomorrow(currentWeather)
                            combineTriggerDayAfterTomorrow(currentWeather)
                        } else {
                            combineTriggerToday(currentWeather)
                            combineTriggerTomorrow(currentWeather)
                            combineTriggerDayAfterTomorrow(currentWeather)
                        }
                        if (rightModulDocument.innerHTML !== '') {
                            rightModulDocument.innerHTML = '';
                            rightModul(currentWeather)
                        } else {
                            rightModul(currentWeather)
                        }
                        if (leftModulDocument.innerHTML !== '') {
                            leftModulDocument.innerHTML = '';
                            leftModul(currentWeather, cityName)
                        } else {
                            leftModul(currentWeather, cityName)
                        }
                    } else {
                        return console.error('404 there is no of the current weather response');
                    }
                })
        }
        function leftModul(currentWeather, cityName) {
            const dateEl = new Date()
            const { ikonka, opis, temperatura, wiatrKierunek, wiatrKierunekSłownie, wiatrPrędkość, wschódSłońca, zachmurzenie, zachódSłońca } = currentWeather.teraz
            const left = document.createElement('div')
            left.innerHTML = `<p class='cityParagraph'>Pogoda  ${cityName}</p>
                            <p class='dataEl'>${dateEl.getHours()}:${dateEl.getMinutes()}</p>
                            <p class='tempEl'>${temperatura}&#730</p>`
            left.className = 'leftModulClass'
            if (currentWeather) {
                leftModulDocument.appendChild(left)
            } else {
                //dodać setTimeOut
                //leftModulDocument.innerHTML =`<img src='/ikonki/snoring.png' height='200' width='200'/>`
                return
            }
            // }else if(leftModulDocument.innerHTML !== ''){
            //     leftModulDocument.innerHTML = ''
            // }

        }
        function rightModul(currentWeather) {
            const { ikonka, opis, temperatura, wiatrKierunek, wiatrKierunekSłownie, wiatrPrędkość, wschódSłońca, zachmurzenie, zachódSłońca } = currentWeather.teraz
            const right = document.createElement('li')
            right.innerHTML = `<img class='iconEl' src='./ikonki/${ikonka}.png' width='200' height='200' />
                    <p class='opisEl'>${opis}</p>`
            right.className = 'rightModul'
            if (currentWeather) {
                rightModulDocument.appendChild(right)
            } else {
                //dodać setTimeOut
                //rightModulDocument.innerHTML = `<img src='/ikonki/snoring.png' height='200' width='200'/>`
                return
            }
        }
        function otherInfoWind(currentWeather) {
            const { ikonka, opis, temperatura, wiatrKierunek, wiatrKierunekSłownie, wiatrPrędkość, wschódSłońca, zachmurzenie, zachódSłońca } = currentWeather.teraz
            const otherDataElement = document.createElement('div')
            otherDataElement.innerHTML = `<p>Wiatr w kierunku</p> <img src='./ikonki/${wiatrKierunek}.png width='50' height='50'/>
                    <p class='wiatr'>"${wiatrKierunekSłownie}"</p><p>Prędkość wiatru ${wiatrPrędkość}</p>`
            otherDataElement.className = 'otherInfoEl'
            if (currentWeather) {
                otherInfoDocument.append(otherDataElement)
            } else {
                return //dodać img settimeout
            }

        }
        function otherInfoSun(currentWeather) {
            const { ikonka, opis, temperatura, wiatrKierunek, wiatrKierunekSłownie, wiatrPrędkość, wschódSłońca, zachmurzenie, zachódSłońca } = currentWeather.teraz
            const otherSunData = document.createElement('div')
            otherSunData.innerHTML = `<p class='sunSetEl'>Wschód słońca:${wschódSłońca}</p>
                    <p class='sunDownEl'>Zachód słońca:${zachódSłońca}</P>`
            otherSunData.className = 'sunPositionoEl'
            if (currentWeather) {
                otherInfoDocument.appendChild(otherSunData)
            } else {
                return //dodać img settimeout
            }
        }
        function combineTriggerToday(currentWeather) {
            const { dziś: { ikonka, opis, temperatura, wiatrKierunek, wiatrKierunekSłownie, wiatrPrędkość, wschódSłońca, zachmurzenie, zachódSłońca } } = currentWeather.prognoza
            const temp = temperatura;
            const info = opis;
            const icon = ikonka;
            const windSpeed = wiatrPrędkość;
            const day = "Dziś"

            forecastCombine(temp, info, icon, day, windSpeed)
        }
        function combineTriggerTomorrow(currentWeather) {
            const { jutro: { ikonka, opis, temperatura, wiatrKierunek, wiatrKierunekSłownie, wiatrPrędkość, wschódSłońca, zachmurzenie, zachódSłońca } } = currentWeather.prognoza
            const temp = temperatura;
            const info = opis;
            const icon = ikonka;
            const windSpeed = wiatrPrędkość;
            const day = "Jutro"

            forecastCombine(temp, info, icon, day, windSpeed)
        }
        function combineTriggerDayAfterTomorrow(currentWeather) {
            const { pojutrze: { ikonka, opis, temperatura, wiatrKierunek, wiatrKierunekSłownie, wiatrPrędkość, wschódSłońca, zachmurzenie, zachódSłońca } } = currentWeather.prognoza
            const temp = temperatura;
            const info = opis;
            const icon = ikonka;
            const windSpeed = wiatrPrędkość;
            const day = "Pojutrze"

            forecastCombine(temp, info, icon, day, windSpeed)
        }
        function forecastCombine(temp, info, icon, day, windSpeed) {

            const liToday = document.createElement('div')
            liToday.innerHTML = `<p class='pList'>${day}</p><p class='pList'>${temp}&#730</p>
                    <img class='pList' src='./ikonki/${icon}.png' width='100' heught='100'/><p class='pList'>${info}</p><p class='pList' id='pw'>Predkość wiatru ${windSpeed}</p>`
            liToday.className = 'forecastList'
            liToday.style.listStyle = 'none'
            forecastDocument.appendChild(liToday)
        }
        //event.key/////key.up///d//dropdown//list////eventlistyner//elements/////
   