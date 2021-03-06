
        const inputElement = document.querySelector('.inputEl')
        const forecastDocument = document.querySelector('.forecastEl')
     // const otherInfoDocument = document.querySelector('.otherData')
        const rightModulDocument = document.querySelector('.iconContainer')
        const leftModulDocument = document.querySelector('.cityName')
        const cityBtn = document.querySelector('.btnList')
        const infoDiv = document.querySelector('.infoData')
        
        inputElement.addEventListener('keyup', function (e) {
            if(!e.target.value){
                cityBtn.innerHTML = ''    
            }
            if(e.which === 8 || e.which === 32 || e.which === 16){
                return false
            }
            if(e.target.value){
                const eTargetMIasto = e.target.value
                getDatafromInput(eTargetMIasto)
                console.log(eTargetMIasto)
            }  
            
            
        })
        function getDatafromInput(eTargetMIasto) {
            fetch(`https://weather-api-alpha.herokuapp.com/pogoda/miasta?szukaj=${eTargetMIasto}`)
                .then(request => request.json())
                .then(function (data) {
                    if(data){
                        const {nazwa,geo} = data
                        console.log(data)

                        const cityN = data[0].nazwa
                        forecastDocument.innerHTML = '';
                        getCurrentWeather(cityN) 
                        cityBtn.innerHTML = ''
                        cityBtn.className = 'newBtnList'
                        getList(data) 
                    }
                    if(data.lenght === data[0]){
                        cityBtn.innerHTML = ''
                    }
                })
        }
        function getCurrentData() {
            fetch('https://weather-api-alpha.herokuapp.com/pogoda/miasta')
                .then(response => response.json())
                .then(function (data) {
                    if(!data){
                        error()
                    }
                    console.log(data)
                    // getList(data)
                })
        }
        function error(){   
            cityBtn.innerHTML = `<img src='./ikonki/kr??cio??ek.svg' height='100' width='100' />`
            leftModulDocument.innerHTML = `<img src='./ikonki/kr??cio??ek.svg' height='100' width='100' />`
            rightModulDocument.innerHTML = `<img src='./ikonki/kr??cio??ek.svg' height='100' width='100' />`
            forecastDocument.innerHTML = `<img src='./ikonki/kr??cio??ek.svg' height='100' width='100' />`
            infoDiv.innerHTML = `<img src='./ikonki/kr??cio??ek.svg' height='100' width='100' />`    
        }
        // getCurrentData()
        let city = '';

        function getList(data) {       
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
                        inputElement.value=''
                    } else if (!e.target) {
                        return
                    }
                }); 
                cityBtn.append(li);
            }
        }
        function defaultCity() {
            const defaultValue = "Bia??ystok"
            getCurrentWeather(defaultValue)
        }
        defaultCity()
        function getCurrentWeather(cityName, cityN, defaultValue) {
            fetch('https://weather-api-alpha.herokuapp.com/pogoda/prognoza?miasto=' + cityName || cityN || defaultValue)
                .then(response => response.json())
                .then(function (currentWeather) {
                    console.log(currentWeather)
                    if(!currentWeather){
                        error()
                    }
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
                        if (infoDiv.innerHTML !== '') {
                            infoDiv.innerHTML = '';
                            infoBox(currentWeather)
                        } else {
                            infoBox(currentWeather)
                        }
                    } else {
                        /////innerHtml = kreciolek setimeout aftter zzzz png
                        return console.error('404 there is no of the current weather response');
                    }
                })
        }
       
        
        function infoBox(currentWeather){
            const { ikonka, opis, temperatura, wiatrKierunek, wiatrKierunekS??ownie, wiatrPr??dko????, wsch??dS??o??ca, zachmurzenie, zach??dS??o??ca } = currentWeather.teraz
             let icon = wiatrKierunekS??ownie;
             console.log(icon)
             const infoEl = document.createElement('div')
             infoEl.innerHTML = `<div class='infoDiv >
             <p class='classWsch??d' >S??o??ce wschodzi o ${wsch??dS??o??ca}</p>
             <p class='classZach??d'>S??o??ce zachodzi o ${zach??dS??o??ca}</p>
             <p class='classKierunek'>Pr??dko???? wiatru ${wiatrPr??dko????} km/h</p>
             <img class='${icon}' src='./ikonki/circle-arrow-up-solid.svg' height='50' height='50'/>
             <p class='classWiatr'>"${wiatrKierunekS??ownie}"</p></div>`
             infoDiv.appendChild(infoEl)

             
        }
        function leftModul(currentWeather, cityName) {
            const dateEl = new Date()
            const { ikonka, opis, temperatura, wiatrKierunek, wiatrKierunekS??ownie, wiatrPr??dko????, wsch??dS??o??ca, zachmurzenie, zach??dS??o??ca } = currentWeather.teraz
            const left = document.createElement('div')
            left.innerHTML = `<p class='cityParagraph'>Pogoda  ${cityName}</p>
                            <p class='dataEl'>${dateEl.getHours()}:${dateEl.getMinutes()}</p>
                            <p class='tempEl'>${temperatura}&#730</p>`
            left.className = 'leftModulClass'
            if (currentWeather) {
                leftModulDocument.appendChild(left)
            } else {
                
                return
            }
            

        }
        function rightModul(currentWeather) {
            const { ikonka, opis, temperatura, wiatrKierunek, wiatrKierunekS??ownie, wiatrPr??dko????, wsch??dS??o??ca, zachmurzenie, zach??dS??o??ca } = currentWeather.teraz
            const right = document.createElement('li')
            right.innerHTML = `<img class='iconEl' src='./ikonki/${ikonka}.png' width='200' height='200' />
                    <p class='opisEl'><span class='span'>${opis}</span></p>`
            right.className = 'rightModul'
            if (currentWeather) {
                rightModulDocument.appendChild(right)
            } else {
               
                return
            }
        }
        function otherInfoWind(currentWeather) {
            const { ikonka, opis, temperatura, wiatrKierunek, wiatrKierunekS??ownie, wiatrPr??dko????, wsch??dS??o??ca, zachmurzenie, zach??dS??o??ca } = currentWeather.teraz
            const otherDataElement = document.createElement('div')
            otherDataElement.innerHTML = `<p>Wiatr w kierunku</p> <img src='./ikonki/${wiatrKierunek}.png width='50' height='50'/>
                    <p class='wiatr'>"${wiatrKierunekS??ownie}"</p><p>Pr??dko???? wiatru ${wiatrPr??dko????}</p>`
            otherDataElement.className = 'otherInfoEl'
            if (currentWeather) {
                otherInfoDocument.append(otherDataElement)
            } else {
                return //doda?? img settimeout
            }

        }
        function otherInfoSun(currentWeather) {
            const { ikonka, opis, temperatura, wiatrKierunek, wiatrKierunekS??ownie, wiatrPr??dko????, wsch??dS??o??ca, zachmurzenie, zach??dS??o??ca } = currentWeather.teraz
            const otherSunData = document.createElement('div')
            otherSunData.innerHTML = `<p class='sunSetEl'>Wsch??d s??o??ca:${wsch??dS??o??ca}</p>
                    <p class='sunDownEl'>Zach??d s??o??ca:${zach??dS??o??ca}</P>`
            otherSunData.className = 'sunPositionoEl'
            if (currentWeather) {
                otherInfoDocument.appendChild(otherSunData)
            } else {
                return 
            }
        }
        function combineTriggerToday(currentWeather) {
            const { dzi??: { ikonka, opis, temperatura, wiatrKierunek, wiatrKierunekS??ownie, wiatrPr??dko????, wsch??dS??o??ca, zachmurzenie, zach??dS??o??ca } } = currentWeather.prognoza
            const temp = temperatura;
            const info = opis;
            const icon = ikonka;
            const windSpeed = wiatrPr??dko????;
            const day = "Dzi??"

            forecastCombine(temp, info, icon, day, windSpeed)
        }
        function combineTriggerTomorrow(currentWeather) {
            const { jutro: { ikonka, opis, temperatura, wiatrKierunek, wiatrKierunekS??ownie, wiatrPr??dko????, wsch??dS??o??ca, zachmurzenie, zach??dS??o??ca } } = currentWeather.prognoza
            const temp = temperatura;
            const info = opis;
            const icon = ikonka;
            const windSpeed = wiatrPr??dko????;
            const day = "Jutro"

            forecastCombine(temp, info, icon, day, windSpeed)
        }
        function combineTriggerDayAfterTomorrow(currentWeather) {
            const { pojutrze: { ikonka, opis, temperatura, wiatrKierunek, wiatrKierunekS??ownie, wiatrPr??dko????, wsch??dS??o??ca, zachmurzenie, zach??dS??o??ca } } = currentWeather.prognoza
            const temp = temperatura;
            const info = opis;
            const icon = ikonka;
            const windSpeed = wiatrPr??dko????;
            const day = "Pojutrze"

            forecastCombine(temp, info, icon, day, windSpeed)
        }
        function forecastCombine(temp, info, icon, day, windSpeed) {

            const liToday = document.createElement('div')
            liToday.innerHTML = `<p class='pList day'>${day}</p><p class='pList temp'>${temp}&#730</p>
                    <img class='pList' src='./ikonki/${icon}.png' width='100' heught='100'/><p class='pList'>${info}</p><p class='pList' id='pw'>Predko???? wiatru ${windSpeed}</p>`
            liToday.className = 'forecastList'
            liToday.style.listStyle = 'none'
            forecastDocument.appendChild(liToday)
        }
        //event.key/////key.up///d//dropdown//list////eventlistyner//elements/////
   