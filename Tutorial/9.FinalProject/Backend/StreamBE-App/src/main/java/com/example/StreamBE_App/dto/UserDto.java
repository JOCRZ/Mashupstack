package com.example.StreamBE_App.dto;

public class UserDto {
    private Long id;
    private String name;
    private String email;
    private String password;
    private Boolean role;
    private Boolean block_status;

    public UserDto() {}

    public UserDto(Long id, String name, String email, String password, Boolean role, Boolean block_status) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.password = password;
        this.role = role;
        this.block_status = block_status;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getPassword() { return password; }
    public void setPassword(String password) { this.password = password; }

    public Boolean getRole() { return role; }
    public void setRole(Boolean role) { this.role = role; }

    public Boolean getBlock_status() { return block_status; }
    public void setBlock_status(Boolean block_status) { this.block_status = block_status; }
}
