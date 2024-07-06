window.addEventListener("load", ()=>{

	const mainAppEmbedPlaceholder = document.querySelector(".main-app-embed-placeholder")

	if(!mainAppEmbedPlaceholder)
		throw new Error("Can't find placeholder element");

	createEmbedElement(mainAppEmbedPlaceholder)

})

const custumizingPlaceholder = (placeholder) => {


}

const createEmbedElement = (placeholder)=>{
	//  <embed type="text/html" src="snippet.html" width="500" height="200"> 
	const embed = document.createElement("embed")
	embed.type = "text/html"
	embed.src = "http://localhost:3000/embed"
	embed.width = 400
	embed.height = 400
	placeholder.append(embed)
}