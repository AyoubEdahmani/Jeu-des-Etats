var el = null
var vrai = null
var conReponse=0
var rustrue=0
var rusfalse=0
var numQues=1
var numvrai=null
if(localStorage.getItem("mieuxScF")==null){
    localStorage.setItem("mieuxScF",0)
}
var xml = new XMLHttpRequest
var imgFlag = document.querySelector("#flag")
var pays = document.getElementsByClassName("pays")
function remplFun(data, tabledeja, choise, choise2) {
    var numcol = (Math.random() * data.length).toFixed(0);

    while (!(tabledeja.includes(numcol))) {
        let ruslta = data[numcol]
        flag.src = ruslta.flags.png
        tabledeja.push(numcol)
        choise.push(numcol)
        numvrai=numcol
        vrai = data[numcol].name.common
        console.log(vrai);
        choise.push(parseInt(numcol) + parseInt((Math.random() * data.length).toFixed(0)) - parseInt(numcol))
        choise.push(parseInt(numcol) + parseInt((Math.random() * data.length).toFixed(0)) - parseInt(numcol))
        for (let i = 0; i < 3; i++) {
            var numcol2 = (Math.random() * 2).toFixed(0)
            while (choise2.includes(numcol2)) {
                numcol2 = (Math.random() * 2).toFixed(0)
            }

            choise2.push(numcol2)
        }
        for (let i = 0; i < 3; i++) {

            pays[i].innerHTML = data[choise[choise2[i]]].name.common;
        }
    }
    for (let i = 0; i < pays.length; i++) {
        pays[i].addEventListener("dragstart", function () {
            this.style.opacity = 0.5
            el = this

        })
        pays[i].addEventListener("dragend", function () {
            this.style.opacity = 1
            el = null
        })
    }
    dropPlace.addEventListener("dragover", function (e) {
        e.preventDefault()
        this.classList.add("overdarg")
    })
    dropPlace.addEventListener("dragleave", function () {
        this.classList.remove("overdarg")
    })
    dropPlace.addEventListener("drop", function () {
        if (dropPlace.innerHTML == "")
            dropPlace.append(el)
        else {
            var oldP = dropPlace.children[0]
            let oldV = el.innerHTML
            el.innerHTML = oldP.innerHTML
            oldP.innerHTML = oldV

        }
    })
    document.querySelector("#numQues").innerHTML=`numéro de question :${numQues} `
    document.querySelector("#rustrue").innerHTML=`réponses correctes :${rustrue} `
    document.querySelector("#rusfalse").innerHTML=`mauvaises réponses :${rusfalse} `
    document.querySelector("#conReponse").innerHTML=`Bonnes réponses consécutives :${conReponse} ( meilleur résultat pour vous :${localStorage.getItem('mieuxScF')}) `
}
xml.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
        document.querySelector("#reload").onclick=function(){
            location.reload()
        }
        var data = JSON.parse(this.responseText);
        var dropPlace = document.querySelector("#dropPlace")
        var dejaf = []
        var choise = []
        var choise2 = []

        var validebtn = document.querySelector("#validebtn")
        document.body.onload=remplFun(data, dejaf, choise, choise2)
        validebtn.addEventListener("click", function () {


            if (dropPlace.innerHTML == "") {
                dropPlace.classList.add("vide")
            }
            else {
                var details=document.createElement('button')
                details.setAttribute('id','detail')
                details.setAttribute('class','mb-2 btn btn-success ')
                details.innerText="Details"
                let aff = document.createElement("div")
                aff.setAttribute('class','divdetails ')
                
                aff.id = "aff";
    
                  details.addEventListener("click",function(){
                    let currencies = []
                    for (let i in data[numvrai].currencies)
                        currencies.push( data[numvrai].currencies[i].name)
                    let languages = []
                    for (let i in  data[numvrai].languages)
                        languages.push( data[numvrai].languages[i])
                    aff.innerHTML = `
      
            <img src="${data[numvrai].flags.png}" style="border:1px solid black" alt="${data[numvrai].flags.alt}">
            <h1>${data[numvrai].name.common}</h1>
            <div class="info">
            <table class="table  table-borderless table-striped">
            <tr>
            <td>
            <h3>name official</h3>
            </td>
            <td>
            <h3>${data[numvrai].name.official}</h3>
            
            </td>
            </tr>
            <tr>
                <td>
                    <h3>capital</h3>
                </td>
                <td>
                    <h3>${data[numvrai].capital.join()}</h3>
                    
                </td>
            </tr>
            <tr>
                <td>
                    <h3>Country name codes </h3>
                </td>
                <td>
                    <h3>${data[numvrai].cca3}</h3>
      
                    </td>
                    </tr>
            <tr>
                <td>
                    <h3>population </h3>
                </td>
                <td>
                    <h3>${data[numvrai].population}</h3>
      
                    </td>
                    </tr>
            <tr>
            <td>
            <h3>maps </h3>
                </td>
                <td>
                    <h3>
                    <a href="${data[numvrai].maps.googleMaps}">${data[numvrai].name.common} in google maps
                        <img src="" width="20px">
                        </a>
                        </h3>
      
                        </td>
            </tr>
            <tr>
            <td>
                    <h3>coat Of Arms</h3>
                </td>
                <td>
                    <img src="${data[numvrai].coatOfArms.png}" width="150px" alt="">
                    
                </td>
            </tr>
            <tr>
            <td>
                    <h3>continents</h3>
                </td>
                <td>
                    <h3>${data[numvrai].continents.join()}</h3>
                    </td>
                </tr>
                <tr>
                <td>
                    <h3>currencies</h3>
                </td>
                <td>
                    <h3>${currencies.join()}</h3>
                    
                </td>
            </tr>
            <tr>
                <td>
                    <h3>languages</h3>
                </td>
                <td>
                <h3>${languages.join()}</h3>
                </td>
                </tr>
                <tr>
                <td>
                    <h3> top-level domain(tld) </h3>
                    </td>
                    <td>
                    <h3>${data[numvrai].tld.join("/")}</h3>
                    
                    </td>
                    </tr>
                    </table>
                    </div>
                    
                    `
                    aff.classList.toggle('divdetails')
                    document.querySelector(".container").append(aff)
                
            
                  })  
                        
                  
                  
                
                document.querySelector(".container").append(details)
                this.style.display="none"
                dropPlace.classList.remove("vide")
                var btnsuivts = document.querySelectorAll("#btnsuivt")
                btnsuivts.forEach(element => {
                    element.remove()
                })
                for (let i = 0; i < pays.length; i++) {
                    pays[i].draggable = 0
                }

                var btnsuivt = document.createElement("button")
                btnsuivt.setAttribute('class', "btn btn-success")
                btnsuivt.innerText = "Suivant"
                btnsuivt.id = "btnsuivt"
                btnsuivt.addEventListener("click", function () {
                    console.log(dejaf);
                    choise=[]
                    choise2=[]
                    document.querySelectorAll("#detail").forEach(e=>{
                        e.remove()
                    })
                    document.querySelectorAll("#aff").forEach(e=>{
                        e.remove()
                    })

                    remplFun(data, dejaf, choise, choise2)
                    document.querySelector("#conPays").append(document.querySelector("#dropPlace .pays"))
                    this.remove()
                    validebtn.style.display="block"
                    for (let i = 0; i < pays.length; i++) {
                        pays[i].draggable = 1
                    }
                    document.querySelectorAll(".false,.vrai").forEach(e=>{
                        e.classList.remove("false")
                        e.classList.remove("vrai")
                    })
                    
                })
                
                var ch = dropPlace.children[0].innerHTML
                
                validebtn.after(btnsuivt)
                if (ch == vrai) {
                    dropPlace.classList.add("vrai")
                    dropPlace.classList.remove("false")
                    rustrue++
                    conReponse++
                    numQues++
                    
                }
                else {
                    dropPlace.classList.remove("vrai")
                    dropPlace.classList.add("false")
                    if(conReponse>localStorage.getItem("mieuxScF")){
                        localStorage.setItem("mieuxScF",conReponse)
                    }
                    conReponse=0
                    numQues++
                    rusfalse++
                    for (let i = 0; i < pays.length; i++) {
                        if (pays[i].innerHTML == vrai) {
                            pays[i].classList.add("vrai")
                        }
                    }


                }

            }
        })
    }
}

xml.open("get", "https://restcountries.com/v3.1/all")
xml.send()