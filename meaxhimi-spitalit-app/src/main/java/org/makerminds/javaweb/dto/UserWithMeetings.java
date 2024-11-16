package org.makerminds.javaweb.dto;

import java.util.List;
import org.makerminds.javaweb.Entity.Takimet;
import org.makerminds.javaweb.response.UserResponse;
import lombok.Data;

@Data
public class UserWithMeetings {
    private UserResponse user;
    private List<Takimet> meetings;
}