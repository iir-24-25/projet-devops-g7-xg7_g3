package com.bitkal.backend.security;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import javax.crypto.SecretKey;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@Component
public class JwtUtils {

    private static final Logger logger = LoggerFactory.getLogger(JwtUtils.class);

    @Value("${jwt.secret}")
    private String SECRET;

    private static final long EXPIRATION_TIME = 86400000; // 1 jour

    private SecretKey getSigningKey() {
        byte[] keyBytes = Decoders.BASE64.decode(SECRET);
        return Keys.hmacShaKeyFor(keyBytes);
    }

    public String generateToken(String email, Long id, String type, Boolean isLogin) {
        Map<String, Object> claims = new HashMap<>();
        claims.put("id", id);
        claims.put("type", type);
        claims.put("isLogin", isLogin);

        return Jwts.builder()
                .subject(email)
                .claims(claims) // Ajoute les claims supplémentaires
                .expiration(new Date(System.currentTimeMillis() + EXPIRATION_TIME))
                .signWith(getSigningKey())
                .compact();
    }

    public boolean validateToken(String token) {
    try {
        Claims claims = Jwts.parser()
            .verifyWith(getSigningKey())
            .build()
            .parseSignedClaims(token)
            .getPayload();
            
        // Additional validation
        if (claims.getExpiration().before(new Date())) {
            return false;
        }
        if (claims.get("type") == null || claims.get("id") == null) {
            return false;
        }
        return true;
    } catch (Exception e) {
        logger.warn("Invalid JWT token: " + e.getMessage());
        return false;
    }
}
    
    public String getEmailFromToken(String token) {
        return Jwts.parser()
                .verifyWith(getSigningKey())
                .build()
                .parseSignedClaims(token)
                .getPayload()
                .getSubject();
    }

    public Long getIdFromToken(String token) {
        return Jwts.parser()
                .verifyWith(getSigningKey())
                .build()
                .parseSignedClaims(token)
                .getPayload()
                .get("id", Long.class);
    }

    public String getTypeFromToken(String token) {
        return Jwts.parser()
                .verifyWith(getSigningKey())
                .build()
                .parseSignedClaims(token)
                .getPayload()
                .get("type", String.class);
    }

    public Boolean getIsLoginFromToken(String token) {
        return Jwts.parser()
                .verifyWith(getSigningKey())
                .build()
                .parseSignedClaims(token)
                .getPayload()
                .get("isLogin", Boolean.class);
    }
}
