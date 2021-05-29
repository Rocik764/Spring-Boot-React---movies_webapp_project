package com.example.springbootmongodb.wrapper;

import com.example.springbootmongodb.model.Actor;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.validator.constraints.Length;
import org.springframework.validation.annotation.Validated;
import javax.validation.Valid;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.util.ArrayList;
import java.util.List;

@Validated
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class MovieWrapper {

    @NotNull
    @NotBlank
    @Length(min = 2, max = 255)
    private String title;

    @NotNull
    @NotBlank
    @Length(min = 2, max = 1024)
    private String description;

    @NotNull
    @NotBlank
    @Length(min = 2, max = 255)
    private String category;

    @Size(min = 1)
    private List<@Valid @NotBlank String> directorsList;

    @Size(min = 1)
    private List<@Valid Actor> actorsList = new ArrayList<>();
}
