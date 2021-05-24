package com.example.springbootmongodb.model;


public class Rate {

    private int rate;
    private User user;

    public Rate(int rate, User user) {
        this.rate = rate;
        this.user = user;
    }

    public int getRate() {
        return rate;
    }

    public void setRate(int rate) {
        this.rate = rate;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }
}
