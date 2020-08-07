window.addEventListener("load",()=>{
  console.log("ready")
  SetPercentSkills()
})

const btn_pdf_download = document.getElementById("download_pdf")
btn_pdf_download.addEventListener("click", (e)=>{DownloadPdf(e)})

function DownloadPdf(e){  
  e.preventDefault()
  alert(`funcion pendiente`)
}  

function SetPercentSkills(){
  const percent_skills = document.getElementById("skills")
  //console.log(percent_skills)
}