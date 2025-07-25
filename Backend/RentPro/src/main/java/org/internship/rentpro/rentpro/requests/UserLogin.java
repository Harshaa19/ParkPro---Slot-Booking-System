package org.internship.rentpro.rentpro.requests;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserLogin {
    String email;
    String password;
}
