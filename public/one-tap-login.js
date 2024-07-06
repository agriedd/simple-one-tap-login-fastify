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
	const callback = placeholder.getAttribute("data-callback")
	const src = encodeURI(`http://localhost:3000/embed?callback=${callback}`)

	const embed = document.createElement("iframe")
	embed.type = "text/html"
	embed.src = src
	embed.width = 400
	embed.height = 400
	placeholder.append(embed)
}