/*
PROJECT NAME: SH_JS_CRUD
ARCHITECT:SJ
COMPANY:SJ TECHNOLOGIES(PVT.LTD)
VERSION:1.0
*/
window.addEventListener('load',function(){
	placeholder();
	//defining buttons to add a function when you click them
	let table  = document.getElementById("myTable");
	let button = document.querySelector(".add-new");
	let close  = document.querySelector(".close-btn");
	let add    = document.querySelector(".add-btn");
	let edit   = document.querySelector(".edit");
	let update = document.querySelector(".update-btn");
	let close_ic = document.querySelector(".close-icon");

	//this is the === add new === button function 
	button.addEventListener("click",() =>{
		div   = document.getElementById("fade");//loading the dark bacground div to add a class
		modal = document.getElementById("add");//loading the pop up form(modal)
		document.getElementById("modal_form").reset();//resting the form incase if someone had typed data in it
		document.getElementById("myAdd").style.display = "inline-block";
		document.getElementById("update").style.display = "none";//hiding the update button
		div.classList.add("wrapper");//adding class to make dark background 
		modal.classList.add("modal");//showing pop up modal
	});

	//this is the === close === button in that pop up
	close.addEventListener("click",()=>{
		modal.classList.remove("modal");//removing the pop up
		div.classList.remove("wrapper");//removing the dark background
	});

	//this is the === add === button in that pop up
	add.addEventListener("click", function add_row(e){
		e.preventDefault();//incase if the browser look at this as a submit button which it won't this will prevent the submit
		inputs  = document.querySelectorAll("input");//these are input feilds in that form. This is an array.
		var tableRef = table.getElementsByTagName('tbody')[0];//this will define the table that we need to append data.
		var row = tableRef.insertRow();//this will add a new row to the table body
		arr = [];
		marks = document.getElementById("marks").value;//getting the marks
		if(marks>75){      //finding which grade
			var grade = "A";
		}else if(65<=marks && marks<=75){
			var grade = "B";
		}else if(45<=marks && marks<=65){
			var grade = "C";
		}else if(35<=marks && marks<=45){
			var grade = "S";
		}else if(marks && marks<=35){
			var grade = "F";
		}
		for(i=0;i<inputs.length;i++){//creating an array with the data of input feilds user included.
			arr.push(inputs[i].value);
		}
		arr.push(grade);//adding the grade into the array because it's not in input feilds 
		for(j=0;j<4;j++){
			var cell = row.insertCell([j]).innerHTML= arr[j];//adding row columns and adding data from array in to them.
		}
		//adding the delete trash button and edit button
		myIcon = row.insertCell(4).innerHTML = "<a onclick='delete_row(this)' href='#'><i aria-hidden='true' class='fa fa-trash delete'></i> </a><a onclick='edit_row(this)' href='#'><i aria-hidden='true' class='fa fa-edit edit'></i></a>";
		// **************************** >>>>>>>>>>>>>>>>>>>>>>>>>>here(this) means what button you are clicking this info will send to the delete_row function.>> here(this) also the same.
		//notification
		document.getElementById("not_f").classList.add("notification");//this will create the notification.
		document.getElementById("notice").innerHTML = "Row Successfully Added";
		placeholder();
	});
	close_ic.addEventListener("click",()=>{
		noti_f = document.getElementById("not_f").classList.remove("notification");
	});

});
//add placeholder
function placeholder(){
	//let table  = document.getElementById("myTable");
	var tr_s = document.getElementById("tbody").querySelectorAll("tr");
	console.log(tr_s);
	//var tr_s  = tbody12.getElementsByTagName("tr");
	if(tr_s.length == 0){
		console.log("empty");
		var tbody = document.getElementById("tbody");
		var placeholder_row = tbody.insertRow();
		placeholder_row.insertCell(0).innerHTML = "<p style='color:red; font-size:20px;'>No data yet..!</p>";
		placeholder_row.colspan = 5;
	}else{
		for(var i=0;i<tr_s.length;i++){
			var placeholder = tr_s[i].querySelectorAll("p");
			if(placeholder.length != 0){
				tr_s[i].remove();
				//placeholder.remove();
			}
		}
	}
}
//delete
function delete_row(e){
	td = e.parentNode;//this will find which row this delete button belongs to.
	td.parentElement.remove();//this will remove the row
	document.getElementById("not_f").classList.add("notification");
	document.getElementById("notice").innerHTML = "Row Successfully Deleted";
	placeholder();
}
function edit_row(f){// f means the data you passed when you click the edit button
	this_td = f.parentNode;//this will get what <td> element that edit button belongs.
	this_tr = this_td.parentNode;//this will get what <tr>(what row) element that edit button belongs.
	mytd = this_tr.getElementsByTagName("td");//this will get all the <td> elements from the <tr> this edit button belongs
	document.getElementById("myAdd").style.display = "none";
	document.getElementById("update").style.display = "inline-block";//this will show the update button.
	
	len = mytd.length-1;
	myInputs = document.getElementsByTagName("input");//this will get the input feild of form with the data you wish to update.
	for(i=0;i<len;i++){
			if(myInputs[i] != undefined){
			myInputs[i].value = mytd[i].innerText;
		}
		div.classList.add("wrapper");
		modal.classList.add("modal");
	}
	//find the row for update function
	inputs   = document.querySelectorAll("input");
	my_tdArr = document.getElementsByTagName("td");
	var thisTr = get_row(inputs[0].value).parentElement;
	here_tds = thisTr.getElementsByTagName("td");
		
}
function get_row(name){// this will find which <tr>(row) you want to update which will run a loop to find name where is name has.
	for(v=0;v<my_tdArr.length;v++){
		if(my_tdArr[v].innerText == name){
			return my_tdArr[v];
		}
	}
}
function update_row(){//this will do final things to update the row.
	my_len = here_tds.length-1
		for(r=0;r<my_len-1;r++){
			text = inputs[r].value;
			here_tds[r].innerHTML = text;
		}
	var mark = inputs[2].value;
	if(mark>75){
			var grade = "A";
		}else if(65<=mark && mark<=75){
			var grade = "B";
		}else if(45<=mark && mark<=65){
			var grade = "C";
		}else if(35<=mark && mark<=45){
			var grade = "S";
		}else if(mark && mark<=35){
			var grade = "F";
		}
	here_tds[3].innerHTML = grade;
	document.getElementById("not_f").classList.add("notification");
	document.getElementById("notice").innerHTML = "Row Successfully Updated";
}
