window.addEventListener("load", () => {
  
  console.log("we are ready...")

  const userId = '5f8df6286300ad2691f37641'


  const $personalInformationTitle = document.getElementById('personalInformationTitle')
  const $conctactTome = document.getElementById('conctactTome')
  fillPersonalIformation('personal', userId, $personalInformationTitle, $conctactTome)
  
  const $listWorkExpertise = document.getElementById('listWorkExpertise')
  fillWorkExpertise('work', userId, $listWorkExpertise)

  const $listskills = document.getElementById('listskills')
  fillSkills('skills', userId, $listskills)

  const $listSocialNetworks = document.getElementById('listSocialNetworks')
  fillSocialNetworks('social', userId, $listSocialNetworks)

  const $goals = document.getElementById('goals')
  fillGoals('goals', userId, $goals)

  const $listDegrees = document.getElementById('listDegrees')
  fillDegrees('degrees', userId, $listDegrees)

  getKpis(userId) 

})

async function fillWorkExpertise(action, userId, docElement){ 
  
  let jsonData = await getDataFromURL(partURL(action), userId)

  const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"];
  
  let fillingIt = ''

  for(let data of jsonData){
   
    let dates = ( data.initialDate !== "undefined" && data.finalDate !== "undefined" )?`[${ monthNames[parseInt(data.initialDate.split('-')[1])] } - ${ data.initialDate.split('-')[0] }]–[${ monthNames[parseInt(data.finalDate.split('-')[1])] } - ${ data.finalDate.split('-')[0] }]`:''
   
    fillingIt += `
    <div class="list-group-item">
      <em>
        <strong>Company: ${ data.company }</strong></br>
        <strong>Job title: ${ data.title }</strong></br>
        <strong>Description</strong>
        <blockquote>
          ${ data.description }
          <footer>
            <!--month - year-->
            <b class="light-blue">${dates}</b><br/>
            <b>Tools:</b> ${data.tools} <br/>
            <b>Technologies:</b> ${data.technologies}<br/>            
          </footer>
        </blockquote>
      </em>
    </div>
      `
      
    /*fillingIt += `
    <div class="list-group-item">
      <em>
        <strong>Company: ${ data.company }</strong></br>
        <strong>Job title: ${ data.title }</strong></br>
        <strong>Description</strong>
        <blockquote>
          ${ data.description }
          <footer>
            <!--month - year-->
            <b class="light-blue">${dates}</b><br/>
          </footer>
        </blockquote>
      </em>
    </div>
      `*/
  }  
  docElement.innerHTML = fillingIt
}
 
async function fillPersonalIformation(action, userId, docElement, docElement2){

  let jsonData = await getDataFromURL(partURL(action), userId)

  let fillingIt = `					
          <b>${ jsonData.name + '</br>' + jsonData.lastName }</b></br>
          -${ jsonData.title }-
    `
  docElement.innerHTML = fillingIt

  fillingIt = `
  <em><b><i class="fab fa-whatsapp"></i> Phone:</b> <br><a href="tel:${ jsonData.lada + ' ' + jsonData.phone }">${ jsonData.lada + ' ' + jsonData.phone }</a></br>
      <b><i class="fas fa-feather-alt"></i> Email:</b> <br> <a href="mailto:${ jsonData.email }">${ jsonData.email }</a></br>
      <b><i class="far fa-address-book"></i> Location:</b> <br> <p>${ jsonData.address }<p>
  </em>
  `

  docElement2.innerHTML = fillingIt
}

async function fillSkills(action, userId, docElement){

  let jData = await getDataFromURL(partURL(action), userId)
  
  let fillingIt = ''

  for(let d of jData){
      let levelAndColor = await getLevelAndColorSkill(partURL('skillLevel') + d.skillLevel)
      
      fillingIt += `
      <div class="skills d-inline mb-2 ml-2">
        <span class="text-left font-weight-bold">${ d.title }</span> 
        <span class="level-skill small-text font-weight-light font-italic text-${levelAndColor.levelColor}">(${levelAndColor.title})</span>
      </div>
  `}
  
  docElement.innerHTML = fillingIt
}

async function fillGoals(action, userId, docElement){
  
  let jsonData = await getDataFromURL(partURL(action), userId)
  
  let fillingIt = ''
  for(let data of jsonData)
  fillingIt += `
                <em><b>Profile</b></em> <br>
								<p>${data.description}</p>`
  docElement.innerHTML = fillingIt
}

async function fillSocialNetworks(action, userId, docElement){
  
  let jsonData = await getDataFromURL(partURL(action), userId)
  let fillingIt = ''
  for(let data of jsonData)
    fillingIt = `
      <em> <i class="${ data.icon }"></i> ${ data.networkName }: <br>						
      <strong><a target="_blank" href="${ data.networkLink }">julio-melquiades-rodriguez-soberano-9097b6145</a></strong></em>
      `
  docElement.innerHTML = fillingIt
}

async function fillDegrees(action, userId, docElement){
  
  let jsonData = await getDataFromURL(partURL(action), userId)
  
  const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"];

  let fillingIt = ''

  for(let data of jsonData){
    let dates = ( data.initialDate !== "undefined" && data.finalDate !== "undefined" )?`[${ monthNames[parseInt(data.initialDate.split('-')[1])] } - ${ data.initialDate.split('-')[0] }]–[${ monthNames[parseInt(data.finalDate.split('-')[1])] } - ${ data.finalDate.split('-')[0] }]`:''
    fillingIt = `
    <li class="list-group-item">								
      <em>
        <b>Institution: ${ data.institutionName }</b>
        <blockquote>
        Carreer: ${ data.carrerTitle }
        <footer>
          <b class="light-blue">${ dates }</b>
        </footer>
        </blockquote>
      </em>								
    </li>
      `
  }
    
  docElement.innerHTML = fillingIt
}

let  getDataFromURL = async (partUrl,userId) => {
  const url = partUrl + userId  

  return await $.ajax({
    "dataType": "json",
    "async": true,
    "crossDomain": true,
    "url": url,
    "method": "get",
    "headers": {'Content-Type':'application/json'}
  })  
}
let postDataToDB = async (url, data) => {
  const stringidata = JSON.stringify(data)
  console.log('sending...', stringidata)
  $.ajax({
    "async": true,
    "crossDomain": true,
    "url": url,
    "method": "post",
    "headers": {
      "Content-Type": "application/json"
    },
    "data": stringidata
  }).done(function (response) {
    console.log('response...',response)
  })
}
let  getLevelAndColorSkill = async (url) => {
  return await $.ajax({
    "dataType": "json",
    "async": true,
    "crossDomain": true,
    "url": url,
    "method": "get",
    "headers": {'Content-Type':'application/json'}
  })
}

function partURL(option){
  let isProduction = true
  let partURL = isProduction ? 'https://peaceful-taiga-91600.herokuapp.com/' : 'http://localhost:3003/'

  switch(option){
    case 'skills':
      partURL += 'skills/'
      break
    case 'work':
      partURL += 'work-experience/'
      break
    case 'degrees':
      partURL += 'degrees/'
      break
    case 'hobbies':
      partURL += 'hobbies/'
      break
    case 'courses':
      partURL += 'courses/'
      break
    case 'personal':
      partURL += 'user/'
      break
    case 'social':
      partURL += 'social-network/'
      break
    case 'goals':
      partURL += 'goals/'
      break  
    case 'skillLevel':
      partURL += 'skills/levels/'
      break  
    case 'personalDeploys':
      partURL += 'personal-deploys/'
      break
    case 'kpis':
      partURL += 'kpis/add/'
      break
  }
  return partURL
}

document.getElementById('printAsPDF').addEventListener('click',(e)=>{
  e.preventDefault()
  var printContents = document.getElementById("backDocument").innerHTML;
  var originalContents = document.body.innerHTML;
  document.body.innerHTML = printContents;
  window.print();
  document.body.innerHTML = originalContents;
})

let getKpis = async (userId) => {

  let kpis = {}
  
  let data = await $.ajax({
    "dataType": "json",
    "async": true,
    "crossDomain": true,
    "url": 'https://ipapi.co/json/',
    "method": "get",
    "headers": {'Content-Type':'application/json'}
  }) 
  
  kpis.userId = userId
  kpis.ip=data.ip
  kpis.version=data.version
  kpis.city=data.city
  kpis.region=data.region
  kpis.region_code=data.region_code
  kpis.country=data.country
  kpis.country_name=data.country_name
  kpis.country_code=data.country_code
  kpis.country_code_iso3=data.country_code_iso3
  kpis.country_capital=data.country_capital
  kpis.country_tld=data.country_tld
  kpis.continent_code=data.continent_code
  kpis.in_eu=data.in_eu
  kpis.postal=data.postal
  kpis.latitude=data.latitude
  kpis.longitude=data.longitude
  kpis.timezone=data.timezone
  kpis.utc_offset=data.utc_offset
  kpis.country_calling_code=data.country_calling_code
  kpis.currency=data.currency
  kpis.currency_name=data.currency_name
  kpis.languages=data.languages
  kpis.country_area=data.country_area
  kpis.country_population=data.country_population
  kpis.asn=data.asn
  kpis.org=data.org
  kpis.Vendor=navigator.vendor
  kpis.Cookies=navigator.cookieEnabled
  kpis.Language=navigator.language
  kpis.Platform=navigator.platform
  kpis.UserAgent=navigator.userAgent
  
  postDataToDB(partURL("kpis"), kpis)
}
