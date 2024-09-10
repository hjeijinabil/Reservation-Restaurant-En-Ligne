package com.reservation.reservationEnLigne.Service;

import com.reservation.reservationEnLigne.Repository.EmployéeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class AdminService {

    @Autowired
    private EmployéeRepository employeeRepo;


}
