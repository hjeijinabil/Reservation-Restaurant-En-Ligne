package com.reservation.reservationEnLigne.Service;


import com.reservation.reservationEnLigne.Entity.Employée;
import com.reservation.reservationEnLigne.Repository.EmployéeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EmployéeService {
    @Autowired
    private EmployéeRepository employeeRepository;

    public List<Employée> getAllEmployees() {
        return employeeRepository.findAll();
    }

    public Employée saveEmployee(Employée employee) {
        return employeeRepository.save(employee);
    }

    public Employée getEmployeeById(Long id) {
        return employeeRepository.findById(id).orElse(null);
    }

    public void deleteEmployee(Long id) {
        employeeRepository.deleteById(id);
    }
}
