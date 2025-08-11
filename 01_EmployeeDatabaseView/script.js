(async function() {
    const data= await fetch ("./public/data.json");
    const res= await data.json();

    const employeeData= res;
    // console.log(employeeData);

    let selectedEmployee= employeeData[0];
    let selectedEmployeeId=employeeData[0].id;

    const employeeList= document.querySelector(".employees_list_names");
    const employeeInfo=document.querySelector(".employees_details_info");

    //showing employee list
    const renderEmployeeList=()=>{
        employeeList.innerHTML="";
        employeeData.forEach((emp) => {
            const employee=document.createElement("span");
            employee.classList.add("employees_list_items");
            if(selectedEmployeeId===emp.id){
                employee.classList.add("selected");
                selectedEmployee=emp;
            }
            employee.setAttribute("id",emp.id);
            employee.innerHTML=`${emp.firstName} ${emp.lastName} <i class="employeeDelete">❌</i>`
            employeeList.append(employee);
        });
    }
    renderEmployeeList();
})()