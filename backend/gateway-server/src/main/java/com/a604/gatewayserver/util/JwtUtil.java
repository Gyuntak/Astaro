package com.a604.gatewayserver.util;


import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.apache.http.HttpHeaders;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpCookie;
import org.springframework.http.server.reactive.ServerHttpRequest;
import org.springframework.stereotype.Component;
import org.springframework.util.MultiValueMap;

import javax.annotation.PostConstruct;
import javax.crypto.SecretKey;
import java.nio.charset.StandardCharsets;
import java.util.Base64;
import java.util.Date;

@Component
public class JwtUtil {

    @Value("${jwt.secret}")
    private String secret;
    private SecretKey secretKey;
    private final static String TOKEN_PREFIX = "Bearer ";



    @PostConstruct
    public void init() {
        var secret = Base64.getEncoder().encodeToString(this.secret.getBytes());
        this.secretKey = Keys.hmacShaKeyFor(secret.getBytes(StandardCharsets.UTF_8));
    }

    // 토큰 추출
    public String getAccessTokenFromHttpHeader(ServerHttpRequest request) {
        String authHeader = request.getHeaders().getOrEmpty(HttpHeaders.AUTHORIZATION).get(0);
        if(authHeader.isEmpty()){
            return null;
        }
        if (authHeader.startsWith(TOKEN_PREFIX)) {
            return authHeader.substring(TOKEN_PREFIX.length());
        }
        return null;
    }

    // 권한 추출
    private String getRole(String token) {
        return "";
    }


    // 유효성 검사
    public boolean isValidToken(Claims claims){

        System.out.println(claims.getExpiration().toString());
        System.out.println(!claims.getExpiration().before(new Date()));


        return claims.getExpiration().before(new Date());
    }

    // 복호화
    public Claims getClaims(String token) {
        return Jwts.parserBuilder().setSigningKey(secretKey).build().parseClaimsJws(token).getBody();
    }


    // 토큰 추출
    public String getAccessToken(ServerHttpRequest request) {

        final MultiValueMap<String, HttpCookie> cookies = request.getCookies();

        if(cookies.isEmpty()) return null;

        return cookies.getFirst("accessToken").getValue();

    }




}

