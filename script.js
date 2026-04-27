async function fetchData(){

try{

const response = await fetch(
'https://fedskillstest.coalitiontechnologies.workers.dev',
{
headers:{
Authorization:
'Basic Y29hbGl0aW9uOnNraWxscy10ZXN0'
}
}
);

const data = await response.json();

const patient = data.find(
p => p.name === "Jessica Taylor"
);

console.log(patient);

/* Profile */

document.getElementById(
"profilePic"
).src=
patient.profile_picture;


document.getElementById(
"patientName"
).textContent=patient.name;

document.getElementById(
"age"
).textContent=
"Age: " + patient.age;

document.getElementById(
"gender"
).textContent=
"Gender: " + patient.gender;

/* Vitals */

document.getElementById(
"heartRate"
).textContent=
patient.diagnosis_history[0]
.heart_rate.value;

document.getElementById(
"respiratoryRate"
).textContent=
patient.diagnosis_history[0]
.respiratory_rate.value;


/* Graph code INSIDE function */

let months=[];
let systolic=[];
let diastolic=[];

patient.diagnosis_history.forEach(
item=>{

months.push(item.month);

systolic.push(
item.blood_pressure
.systolic.value
);

diastolic.push(
item.blood_pressure
.diastolic.value
);

}
);

new Chart(
document.getElementById("bpChart"),
{
type:'line',

data:{
labels:months,

datasets:[
{
label:'Systolic',
data:systolic
},
{
label:'Diastolic',
data:diastolic
}
]
}

}
);

let list =
document.getElementById(
"diagnosisList"
);

patient.diagnostic_list.forEach(
item => {

let li =
document.createElement("li");

li.textContent =
item.name + " - " +
item.status;

list.appendChild(li);

}
);
let labs=
document.getElementById(
"labs"
);

patient.lab_results.forEach(
item=>{

let li=
document.createElement("li");

li.textContent=item;

labs.appendChild(li);

}
);

}
catch(error){
console.log(error);
}

}

fetchData();