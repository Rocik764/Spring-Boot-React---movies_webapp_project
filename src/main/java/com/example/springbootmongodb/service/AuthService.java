package com.example.springbootmongodb.service;

import com.example.springbootmongodb.model.User;
import com.example.springbootmongodb.respository.UserRepository;
import net.bytebuddy.utility.RandomString;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.MailSender;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;
import java.io.UnsupportedEncodingException;

@Service
public class AuthService {

    private final UserRepository userRepository;
    private final JavaMailSender mailSender;

    public AuthService(UserRepository userRepository, JavaMailSender mailSender) {
        this.userRepository = userRepository;
        this.mailSender = mailSender;
    }

    public ResponseEntity<String> save(User user, String siteURL) throws UnsupportedEncodingException, MessagingException {
        System.out.println(user.getEmail());
        BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
        String encodedPassword = passwordEncoder.encode(user.getPassword());
        user.setPassword(encodedPassword);
        user.setRoles("USER");
        String randomCode = RandomString.make(64);
        user.setVerificationCode(randomCode);
        user.setEnabled(false);
        userRepository.save(user);
        sendVerificationEmail(user, siteURL);
        return ResponseEntity.ok(
                "Successfully registered, please check your email to verify your account. " +
                "If you didn't get the email, please click the button below to resend it ;" +
                siteURL + "/api/auth/resend/" + user.getEmail());
    }

    private void sendVerificationEmail(User user, String siteURL) throws MessagingException, UnsupportedEncodingException {
        createEmailVerificationMessage(user.getEmail(), siteURL, user);
    }

    public String resendVerificationEmail(String email, String siteURL) throws MessagingException, UnsupportedEncodingException {
        User user = userRepository.findByEmail(email);
        createEmailVerificationMessage(email, siteURL, user);
        return "Verification email has been resent.";
    }

    public boolean verify(String verificationCode) {
        User user = userRepository.findByVerificationCode(verificationCode);

        if (user == null || user.isEnabled()) {
            return false;
        }

        user.setVerificationCode(null);
        user.setEnabled(true);
        userRepository.save(user);

        return true;
    }

    private void createEmailVerificationMessage(String email, String siteURL, User user) throws MessagingException, UnsupportedEncodingException {
        String fromAddress = "rocik-spring-moviesapp@mail.com";
        String senderName = "Rocik764";
        String subject = "Email verification";
        String content = "Hi,<br>"
                + "Please click the link below to verify your account:<br>"
                + "<h3><a href=" + siteURL + "/api/auth/verify?code=" + user.getVerificationCode() + " target=\"_self\">VERIFY</a></h3>";

        MimeMessage message = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message);
        helper.setFrom(fromAddress, senderName);
        helper.setTo(email);
        helper.setSubject(subject);
        helper.setText(content, true);

        mailSender.send(message);
    }
}
