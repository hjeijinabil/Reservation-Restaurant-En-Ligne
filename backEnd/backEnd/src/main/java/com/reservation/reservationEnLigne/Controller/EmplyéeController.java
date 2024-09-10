package com.reservation.reservationEnLigne.Controller;

import com.reservation.reservationEnLigne.Entity.Employée;
import com.reservation.reservationEnLigne.Service.EmployéeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/employees")
public class EmplyéeController {
    @Autowired
    private EmployéeService employeeService;

    @GetMapping
    public List<Employée> getAllEmployees() {
        return employeeService.getAllEmployees();
    }

    @PostMapping
    public Employée createEmployee(@RequestBody Employée employee) {
        return employeeService.saveEmployee(employee);
    }

    @GetMapping("/{id}")
    public Employée getEmployeeById(@PathVariable Long id) {
        return employeeService.getEmployeeById(id);
    }
    @PutMapping("/{id}")
    public Employée updateEmployee(@PathVariable Long id, @RequestBody Employée employee) {
        // Fetch the existing employee by ID
        Employée existingEmployee = employeeService.getEmployeeById(id);
        if (existingEmployee != null)
            // Update the existing employee's details
            existingEmployee.setFirstName(employee.getFirstName());
            existingEmployee.setLastName(employee.getLastName());
            existingEmployee.setStreetAddress(employee.getStreetAddress());
            existingEmployee.setMobileNumber(employee.getMobileNumber());
            existingEmployee.setEmail(employee.getEmail());
            // Save the updated employee
            return employeeService.saveEmployee(existingEmployee);

    }
    @DeleteMapping("/{id}")
    public void deleteEmployee(@PathVariable Long id) {
        employeeService.deleteEmployee(id);
    }
}
