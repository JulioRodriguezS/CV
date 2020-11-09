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

  //const $recentPersonalDeploys = document.getElementById('recentPersonalDeploys')
})

async function fillWorkExpertise(action, userId, docElement){ 
  
  let jsonData = await getDataFromURL(partURL(action), userId)

  const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"];
  
  let fillingIt = ''

  for(data of jsonData){
   
    let dates = ( data.initialDate !== "undefined" && data.finalDate !== "undefined" )?`[${ monthNames[parseInt(data.initialDate.split('-')[1])] } - ${ data.initialDate.split('-')[0] }]–[${ monthNames[parseInt(data.finalDate.split('-')[1])] } - ${ data.finalDate.split('-')[0] }]`:''
   
    fillingIt += `
    <li class="list-group-item">
      <em>
        <strong>Company: ${ data.company }</strong></br>
        <strong>Job title: ${ data.title }</strong></br>
        <strong>Description</strong>
        <blockquote>
          ${ data.description }
          <footer>
            <!--month - year-->
            <b>${dates}</b><br/>
            <b>Tools:</b> ${data.tools} <br/>
            <b>Technologies:</b> ${data.technologies}<br/>            
          </footer>
        </blockquote>
      </em>
    </li>
      `
  }  
  docElement.innerHTML = fillingIt
}
 
async function fillPersonalIformation(action, userId, docElement, docElement2){

  let jsonData = await getDataFromURL(partURL(action), userId)

  let fillingIt = `
					<h4 class="name">${ jsonData.title }</h4>
          <h5 class="profession">${ jsonData.name + ' ' + jsonData.lastName }</h5>
    `
  docElement.innerHTML = fillingIt

  fillingIt = `
  <em><b>Cel Phone:</b> ${ jsonData.phone } <br>
      <b>Email:</b> <br> <span>${ jsonData.email }<span></em>
  `

  docElement2.innerHTML = fillingIt
}

async function fillSkills(action, userId, docElement){

  let jsonData = await getDataFromURL(partURL(action), userId)

  let fillingIt = ''

  for(data of jsonData){
      let levelAndColor = await getLevelAndColorSkill(partURL('skillLevel') + data.skillLevel)
      fillingIt += `
      <div class="skills d-inline mb-2 ml-2">
        <span class="text-left font-weight-bold">${ data.title }</span> 
        <span class="level-skill small-text font-weight-light font-italic text-${levelAndColor.levelColor}">(${levelAndColor.title})</span>
      </div>
  `}
  
  docElement.innerHTML = fillingIt
}

async function fillGoals(action, userId, docElement){
  
  let jsonData = await getDataFromURL(partURL(action), userId)
  
  let fillingIt = ''
  for(data of jsonData)
  fillingIt += `
                <em><b>Profile</b></em> <br>
								<p>${data.description}</p>`
  docElement.innerHTML = fillingIt
}

async function fillSocialNetworks(action, userId, docElement){
  
  let jsonData = await getDataFromURL(partURL(action), userId)
  let fillingIt = ''
  for(data of jsonData)
    fillingIt = `
      <em>${ data.networkName }: <br>						
      <strong><a target="_blank" href="${ data.networkLink }">julio-melquiades-rodriguez-soberano-9097b6145</a></strong></em>
      `
  docElement.innerHTML = fillingIt
}

async function fillDegrees(action, userId, docElement){
  
  let jsonData = await getDataFromURL(partURL(action), userId)
  
  const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"];

  let fillingIt = ''

  for(data of jsonData){
    let dates = ( data.initialDate !== "undefined" && data.finalDate !== "undefined" )?`[${ monthNames[parseInt(data.initialDate.split('-')[1])] } - ${ data.initialDate.split('-')[0] }]–[${ monthNames[parseInt(data.finalDate.split('-')[1])] } - ${ data.finalDate.split('-')[0] }]`:''
    fillingIt = `
    <li class="list-group-item">								
      <em>
        <b>Institution: ${ data.institutionName }</b>
        <blockquote>
        Carreer: ${ data.carrerTitle }
        <footer>
          <b>${ dates }</b>
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
  //v1
  return await $.ajax({
    "dataType": "json",
    "async": true,
    "crossDomain": true,
    "url": url,
    "method": "get",
    "headers": {'Content-Type':'application/json'}
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

  let partURL = 'https://peaceful-taiga-91600.herokuapp.com/'
  //let partURL = 'http://localhost:3003/'

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
  }
  return partURL
}
