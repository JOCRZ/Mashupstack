package com.example.classworkapp.dto;

public class UserDto {
   
    private String mob;
    private String password;
    private String fullname;
   
    public UserDto(String mob, String password, String fullname) {
        super();
        this.mob = mob;
        this.password = password;
        this.fullname = fullname;
    }

    public String getMob() {
        return mob;
    }

    public void setMob(String mob) {
        this.mob = mob;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getFullname() {
        return fullname;
    }

    public void setFullname(String fullname) {
        this.fullname = fullname;
    }
   
}