import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-all-emp',
  standalone: true,
  imports: [HttpClientModule,CommonModule,FormsModule],
  templateUrl: './view-all-emp.component.html',
  styleUrl: './view-all-emp.component.css'
})
export class ViewAllEmpComponent {
  public employeeList: any;

  public selectedEmployee={
    id:"",
    firstName:"",
    lastName:"",
    email:"",
    departmentId:"",
    roleId:"",
  }



  constructor(private http: HttpClient) {
    this.loadEmployeTable();
  }

  loadEmployeTable() {
    this.http.get("http://localhost:8080/emp-controller/get-all").subscribe(res => {
      this.employeeList = res;
      console.log(res);
    })
  }

  deleteEmploye(employee: any) {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-danger"
      },
      buttonsStyling: false
    });
    swalWithBootstrapButtons.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, cancel!",
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {

        this.http.delete(`http://localhost:8080/emp-controller/delete-by-id/${employee.id}`, { responseType: 'text' }).subscribe(res => {
          this.loadEmployeTable()
          swalWithBootstrapButtons.fire({
            title: "Deleted!",
            text: "Your file has been deleted.",
            icon: "success"
          });
          console.log(res);

        })
        console.log(employee);


      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire({
          title: "Cancelled",
          text: "Your imaginary file is safe :)",
          icon: "error"
        });
      }
    });
  }

  edit(employee: any) {
    this.selectedEmployee=employee
  
  }
  updateEmployee() {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-danger"
      },
      buttonsStyling: false
    });
    swalWithBootstrapButtons.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, update it!",
      cancelButtonText: "No, cancel!",
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {

        this.http.put(`http://localhost:8080/emp-controller/update`,this.selectedEmployee).subscribe(res => {
          this.loadEmployeTable();
          console.log(res);
        
          swalWithBootstrapButtons.fire({
            title: "Updated!",
            text: "Your employee data has been updated.",
            icon: "success"
          });
         

        })
       


      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire({
          title: "Cancelled",
          text: "Your imaginary file is safe :)",
          icon: "error"
        });
      }
    });
    
    
  }

}
