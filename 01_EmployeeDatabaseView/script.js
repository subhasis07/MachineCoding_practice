(async function() {
    const data= await fetch ("./public/data.json");
    const res= await data.json();

    let employeeData= res;
    // console.log(employeeData);

    let selectedEmployeeId = employeeData.length > 0 ? employeeData[0].id : -1;
    let selectedEmployee = employeeData.length > 0 ? employeeData[0] : {};


    const employeeList= document.querySelector(".employees_list_names");
    const employeeInfo=document.querySelector(".employees_details_info");

    const createEmployee = document.querySelector(".createEmployee");
    const addEmployeeModal = document.querySelector(".add_employee");
    const addEmployeeForm=document.querySelector(".add_employee_modal");

    employeeList.addEventListener('click',(e)=>{
        //showing the selected employee
        if(e.target.tagName==="SPAN" && selectedEmployeeId !== e.target.id){
            selectedEmployeeId = parseInt(e.target.closest('[id]').id, 10);
            selectedEmployee=employeeData.find(
                (emp)=>emp.id===selectedEmployeeId
            )
        }
        
        //delete the selected employee
        if(e.target.tagName==='I'){
            const idToDelete = parseInt(e.target.closest('[id]').id, 10);
            employeeData=employeeData.filter((emp)=>emp.id!==idToDelete);

            if (selectedEmployeeId === idToDelete) {
                selectedEmployeeId = employeeData.length ? employeeData[0].id : -1;
                selectedEmployee = employeeData.length ? employeeData[0] : {};
            }
        }
        renderEmployeeList();
        renderSingleEmployee();
        
    })

    createEmployee.addEventListener('click',()=>{
        addEmployeeModal.style.display="flex";
    })

    addEmployeeModal.addEventListener('click',(e)=>{
        if(e.target.className===("add_employee")){
            addEmployeeModal.style.display="none";
        }
    });

    addEmployeeForm.addEventListener('submit',(e)=>{
        e.preventDefault();
        const formData= new FormData(addEmployeeForm);
        const inputValues= [...formData.entries()];
        let newEmpData={};
        inputValues.forEach((val)=>{
            newEmpData[val[0]]=val[1];
        })

        selectedEmployeeId=employeeData.length>0?employeeData[0].id:-1;
        const age=new Date().getFullYear() - parseInt(newEmpData.dob.slice(0, 4), 10);
        newEmpData.imageUrl =newEmpData.imageUrl || "https://cdn-icons-png.flaticon.com/512/0/93.png";
        employeeData.push(newEmpData);
        addEmployeeModal.style.display="none";
        renderEmployeeList();
        renderSingleEmployee();
        addEmployeeForm.reset();
        
    })


    
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

    // show employee details
    const renderSingleEmployee=()=>{
        if(selectedEmployeeId===-1){
            employeeInfo.innerHTML="";
            return;
        }

        employeeInfo.innerHTML=`
            <img src="${selectedEmployee.imageUrl}"/>
            <span>
                ${selectedEmployee.firstName} ${selectedEmployee.lastName} (${selectedEmployee.age})
            </span>
            <span>${selectedEmployee.email}</span>
            <span>${selectedEmployee.address}</span>
            <span>${selectedEmployee.contactNumber}</span>
            <span>${selectedEmployee.dob}</span>

        `
    }
    renderEmployeeList();
    renderSingleEmployee();
})()