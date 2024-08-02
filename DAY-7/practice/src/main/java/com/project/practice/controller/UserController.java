package com.project.practice.controller;

import com.project.practice.model.Login;
import com.project.practice.service.LoginService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/users")
@CrossOrigin(origins = "http://localhost:3000")

public class UserController {

    @Autowired
    private LoginService loginService;

    @GetMapping
    public List<Login> getAllUsers() {
        return loginService.getAllLogins();
    }

    @DeleteMapping("/{id}")
    public void deleteUser(@PathVariable Long id) {
        loginService.deleteLogin(id);
    }
}
