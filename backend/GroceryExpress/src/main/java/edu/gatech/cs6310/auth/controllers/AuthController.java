package edu.gatech.cs6310.auth.controllers;


import java.util.List;
import java.util.stream.Collectors;

import javax.validation.Valid;

import edu.gatech.cs6310.repository.CustomerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import edu.gatech.cs6310.auth.models.ERole;
import edu.gatech.cs6310.auth.models.User;

import edu.gatech.cs6310.payload.request.LoginRequest;
import edu.gatech.cs6310.payload.request.SignupRequest;
import edu.gatech.cs6310.payload.response.JwtResponse;
import edu.gatech.cs6310.payload.response.MessageResponse;
import edu.gatech.cs6310.repository.UserRepository;
import edu.gatech.cs6310.security.jwt.JwtUtils;
import edu.gatech.cs6310.security.services.UserDetailsImpl;


@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/auth")
public class AuthController {
    @Autowired
    AuthenticationManager authenticationManager;


    private CustomerRepository customerRepository;

    @Autowired
    UserRepository userRepository;

    @Autowired
    PasswordEncoder encoder;

    @Autowired
    JwtUtils jwtUtils;

    @PostMapping("/signin")
    public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginRequest loginRequest) {

        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginRequest.getUsername(), loginRequest.getPassword()));

        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwt = jwtUtils.generateJwtToken(authentication);

        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
        List<String> roles = userDetails.getAuthorities().stream()
                .map(item -> item.getAuthority())
                .collect(Collectors.toList());

        return ResponseEntity.ok(new JwtResponse(jwt,
                userDetails.getId(),
                userDetails.getUsername(),
                userDetails.getEmail(),
                roles));
    }



    @PostMapping("/signup")
    public ResponseEntity<?> registerUser(@Valid @RequestBody SignupRequest signUpRequest) {
        System.out.println(signUpRequest.toString());
        if (userRepository.existsByUsername(signUpRequest.getUsername())) {
            return ResponseEntity
                    .badRequest()
                    .body(new MessageResponse("Error: Username is already taken!"));
        }

        if (userRepository.existsByEmail(signUpRequest.getEmail())) {
            return ResponseEntity
                    .badRequest()
                    .body(new MessageResponse("Error: Email is already in use!"));
        }

        System.out.println("Role is :" + signUpRequest.getRole());

        if (signUpRequest.getRole() == null) {
            return ResponseEntity.ok(new MessageResponse("It looks like something is off!"));
        }

        String roleName;

        switch (signUpRequest.getRole()) {
            case "admin":
                roleName = ERole.ROLE_ADMIN.name();
                break;
            case "storemanager":
                roleName = ERole.ROLE_STOREMANAGER.name();
                break;
            case "pilot":
                roleName = ERole.ROLE_PILOT.name();
                break;
            default:
                roleName = ERole.ROLE_USER.name();
        }
        // Create new user's account
        User user = User.builder()
                .username(signUpRequest.getUsername())
                .email(signUpRequest.getEmail())
                .password(encoder.encode(signUpRequest.getPassword()))
                .build();
        user.setRole(roleName);
        userRepository.save(user);



        return ResponseEntity.ok(new MessageResponse("User registered successfully!"));
    }
}
