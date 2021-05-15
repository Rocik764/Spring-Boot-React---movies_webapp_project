package com.example.springbootmongodb.googleapi;

import com.example.springbootmongodb.googleapi.GeoCoding;
import com.example.springbootmongodb.model.LatLon;
import org.springframework.core.env.Environment;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

@RestController
@RequestMapping("api/test")
public class TestController {

    private static final String GEOCODING_URI = "https://maps.googleapis.com/maps/api/geocode/json";
    private final Environment env;

    public TestController(Environment env) {
        this.env = env;
    }

    @GetMapping("distance")
    public double distance(@RequestBody LatLon latlon) {

        final int R = 6371; // Radius of the earth

        double latDistance = Math.toRadians(latlon.getLat2() - latlon.getLat1());
        double lonDistance = Math.toRadians(latlon.getLon2() - latlon.getLon1());
        double a = Math.sin(latDistance / 2) * Math.sin(latDistance / 2)
                + Math.cos(Math.toRadians(latlon.getLat1())) * Math.cos(Math.toRadians(latlon.getLat2()))
                * Math.sin(lonDistance / 2) * Math.sin(lonDistance / 2);
        double c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        double distance = R * c * 1000; // convert to meters

        double height = 0.0 - 0.0;

        distance = Math.pow(distance, 2) + Math.pow(height, 2);

        return Math.sqrt(distance);
    }

    @GetMapping("/getGeoCoding")
    public ResponseEntity<GeoCoding> getGeoCodingForLoc(@RequestParam(value = "address", defaultValue="silicon+valley") String address) {
        RestTemplate restTemplate = new RestTemplate();
        UriComponentsBuilder builder = UriComponentsBuilder.fromUriString(GEOCODING_URI).queryParam("address", address)
                .queryParam("key", env.getProperty("apiKey"));


        GeoCoding geoCoding = restTemplate.getForObject(builder.toUriString(), GeoCoding.class);

        return ResponseEntity.ok(geoCoding);
    }
}
