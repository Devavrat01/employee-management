package com.Assignment.Backend.service;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import org.springframework.stereotype.Service;

import java.security.Key;
import java.util.Date;

@Service
public class JWTService {
    private static final Key SECRET_KEY = Keys.secretKeyFor(SignatureAlgorithm.HS256);

    public static String generateToken(String username) {
        long now = System.currentTimeMillis();
        long expirationMillis = 1000 * 60 * 60; // 1 hour

        return Jwts.builder()
                .setSubject(username)
                .setIssuer("AssignmentApp")
                .setIssuedAt(new Date(now))
                .setExpiration(new Date(now + expirationMillis))
                .signWith(SECRET_KEY)
                .compact();
    }


//    public static String generateToken() {
//        return "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6Ik5hdmluIiwiaWF0IjoxNTE2MjM5MDIyLCJleHAiOjE1MTYyNDAyNH0.SVkl_u2Ev7ThYMAcSosUv5n1IN40e4kD87SO4Gnz8IQ";
//    }
}