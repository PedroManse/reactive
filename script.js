window.addEventListener("load", ()=>{
	const [setPoint, getPoint] = ReactiveElement(
		0,
		$("#pointCounter"),
		point=>cE("p", `Points: ${point}`),
	).getInfo(Info.Setter, Info.LastSet);

	$("#btn").addEventListener("click", ()=>{
		setPoint(getPoint()+1);
	});

	$("#btn2").addEventListener("click", ()=>{
		setPoint(getPoint()+2);
	});

	$("#btn3").addEventListener("click", ()=>{
		setPoint(getPoint()-1);
	});

});

