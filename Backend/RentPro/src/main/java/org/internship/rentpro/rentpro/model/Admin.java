package org.internship.rentpro.rentpro.model;

import jakarta.persistence.*;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
@EqualsAndHashCode
@Table(name="admin")
public class Admin {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(name = "admin_email")
    private String email;
    @Column(name = "admin_password")
    private String password;
    @Column(name = "role")
    private String role;

}
