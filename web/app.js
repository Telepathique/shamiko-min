window.onload = function(){
  const date = new Date()
const day = date.getDate()

const resolutionsRequestListener = function(){
const resolutionsDATA = JSON.parse(this.responseText)
const statusElement = document.getElementById("status")
if(resolutionsDATA.length == day){
statusElement.innerHTML = "yes"
}else{
statusElement.outerHTML = "no"
}}

const resolutionsRequest = new XMLHttpRequest()
resolutionsRequest.addEventListener("load", resolutionsRequestListener)
resolutionsRequest.open("get", "/resolution-data")
resolutionsRequest.send()
}